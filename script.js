function mod(n, m) {
    return ((n % m) + m) % m;
  }

  function modInverse(a, m) {
    a = mod(a, m);
    if (a === 0) return null;
    let m0 = m, x0 = 0, x1 = 1;
    while (a > 1) {
      if (m === 0) return null;
      let q = Math.floor(a / m);
      [a, m] = [m, a % m];
      [x0, x1] = [x1 - q * x0, x0];
    }
    if (x1 < 0) x1 += m0;
    return x1;
  }

  function legendreSymbol(a, p) {
    const ls = modExp(a, (p - 1) / 2, p);
    if (ls === 0) return 0;
    return ls === 1 ? 1 : -1;
  }

  function modExp(base, exp, modv) {
    let result = 1;
    let b = mod(base, modv);
    let e = exp;
    while (e > 0) {
      if(e & 1) result = mod(result * b, modv);
      b = mod(b * b, modv);
      e = e >> 1;
    }
    return result;
  }

  function modSqrt(n, p) {
    n = mod(n, p);
    if (p === 2) return n;
    if (legendreSymbol(n, p) !== 1) return null;
    if (p % 4 === 3) {
      return modExp(n, (p + 1) / 4, p);
    }
    let q = p - 1;
    let s = 0;
    while ((q & 1) === 0) {
      q >>= 1;
      s++;
    }
    let z = 2;
    while (legendreSymbol(z, p) !== -1) {
      z++;
      if (z === p) return null;
    }
    let m = s;
    let c = modExp(z, q, p);
    let t = modExp(n, q, p);
    let r = modExp(n, (q + 1) / 2, p);
    while (true) {
      if (t === 0) return 0;
      if (t === 1) return r;
      let i = 1;
      let t2i = modExp(t, 2, p);
      while (t2i !== 1) {
        t2i = modExp(t2i, 2, p);
        i++;
        if (i === m) return null;
      }
      let b = modExp(c, 1 << (m - i - 1), p);
      m = i;
      c = modExp(b, 2, p);
      t = mod(t * c, p);
      r = mod(r * b, p);
    }
  }

  class EllipticCurve {
    constructor(a, b, p) {
      this.a = a;
      this.b = b;
      this.p = p;
      this.infinity = null;
    }
    isInfinity(P) {
      return P === null;
    }
    isOnCurve(P) {
      if (this.isInfinity(P)) return true;
      const {x, y} = P;
      return mod(y*y - (x*x*x + this.a*x + this.b), this.p) === 0;
    }
    pointNeg(P) {
      if (this.isInfinity(P)) return P;
      return { x: P.x, y: mod(-P.y, this.p) };
    }
    pointAdd(P, Q) {
      if (this.isInfinity(P)) return Q;
      if (this.isInfinity(Q)) return P;
      const p = this.p;
      if (P.x === Q.x && mod(P.y + Q.y, p) === 0) return this.infinity;
      let m;
      if (P.x === Q.x && P.y === Q.y) {
        const den = modInverse(2 * P.y, p);
        if (den === null) return this.infinity;
        m = mod((3 * P.x * P.x + this.a) * den, p);
      } else {
        const den = modInverse(mod(Q.x - P.x, p), p);
        if (den === null) return this.infinity;
        m = mod((Q.y - P.y) * den, p);
      }
      const rx = mod(m * m - P.x - Q.x, p);
      const ry = mod(m * (P.x - rx) - P.y, p);
      return { x: rx, y: ry };
    }
    scalarMult(k, P) {
      let Q = this.infinity;
      let N = P;
      let kk = k;
      while (kk > 0) {
        if ((kk & 1) === 1) Q = this.pointAdd(Q, N);
        N = this.pointAdd(N, N);
        kk >>= 1;
      }
      return Q;
    }
  }

  function parsePoint(str) {
    const parts = str.split(',').map(s => s.trim());
    if(parts.length !== 2) return null;
    const x = Number(parts[0]);
    const y = Number(parts[1]);
    if (isNaN(x) || isNaN(y)) return null;
    return {x, y};
  }

  function pointToString(P) {
    if (P === null) return "Point at Infinity (∞)";
    return `(${P.x}, ${P.y})`;
  }

  function messageToPoint(msg, curve) {
    if (!msg || msg.length === 0) return null;
    let base = 0;
    for(let i=0; i<msg.length; i++) {
      base += msg.charCodeAt(i);
    }
    base = mod(base, curve.p);
    for(let x = base; x < base + 100; x++) {
      const xx = mod(x, curve.p);
      const rhs = mod(xx*xx*xx + curve.a*xx + curve.b, curve.p);
      const y = modSqrt(rhs, curve.p);
      if (y !== null) return {x: xx, y};
    }
    return null;
  }

  const curveAInput = document.getElementById('curveA');
  const curveBInput = document.getElementById('curveB');
  const curvePInput = document.getElementById('curveP');
  const generatorInput = document.getElementById('generatorG');
  const privateNInput = document.getElementById('privateN');
  const computePublicKeyBtn = document.getElementById('computePublicKeyBtn');
  const publicKeyOutput = document.getElementById('publicKeyOutput');
  const messageTextInput = document.getElementById('messageText');
  const messageMInput = document.getElementById('messageM');
  const convertMsgBtn = document.getElementById('convertMsgBtn');
  const kInput = document.getElementById('kValue');
  const publicKeyInput = document.getElementById('publicKeyInput');
  const encryptBtn = document.getElementById('encryptBtn');
  const encryptionOutput = document.getElementById('encryptionOutput');
  const decryptBtn = document.getElementById('decryptBtn');
  const decryptionOutput = document.getElementById('decryptionOutput');

  let curve = null;
  let G = null;
  let n = null;
  let Pu = null;
  let k = null;
  let M = null;
  let C1 = null;
  let C2 = null;

  computePublicKeyBtn.addEventListener('click', () => {
    publicKeyOutput.textContent = "Computing...";
    try {
      const a = Number(curveAInput.value);
      const b = Number(curveBInput.value);
      const p = Number(curvePInput.value);
      if (!Number.isInteger(a) || !Number.isInteger(b) || !Number.isInteger(p)) {
        publicKeyOutput.textContent = "Please enter valid integers for a, b, and p.";
        return;
      }
      if (p <= 2) {
        publicKeyOutput.textContent = "p must be a prime number larger than 2.";
        return;
      }
      curve = new EllipticCurve(a, b, p);

      const gPoint = parsePoint(generatorInput.value);
      if (!gPoint) {
        publicKeyOutput.textContent = "Generator point G format is invalid.";
        return;
      }
      if (!curve.isOnCurve(gPoint)) {
        publicKeyOutput.textContent = "Generator point G is not on the curve.";
        return;
      }
      G = gPoint;

      const privN = Number(privateNInput.value);
      if (!Number.isInteger(privN) || privN <= 0 || privN >= (p-1)) {
        publicKeyOutput.textContent = "Private key n must be an integer between 1 and p-2.";
        return;
      }
      n = privN;

      Pu = curve.scalarMult(n, G);
      if (!Pu || !curve.isOnCurve(Pu)) {
        publicKeyOutput.textContent = "Error computing public key Pu = n * G.";
        return;
      }
      publicKeyOutput.textContent = `Public Key Pu = ${pointToString(Pu)}`;
      publicKeyInput.value = `${Pu.x},${Pu.y}`;

      encryptionOutput.textContent = "Encrypted message will appear here";
      decryptionOutput.textContent = "Decrypted message will appear here";
    } catch (err) {
      publicKeyOutput.textContent = "Error: " + err.message;
      console.error(err);
    }
  });

  convertMsgBtn.addEventListener('click', () => {
    if (!curve) {
      alert("Please compute curve parameters first.");
      return;
    }
    const msg = messageTextInput.value;
    const pt = messageToPoint(msg, curve);
    if (pt === null) {
      messageMInput.value = "";
      alert("Could not find a point to represent the message on the curve.");
      return;
    }
    messageMInput.value = `${pt.x},${pt.y}`;
  });

  encryptBtn.addEventListener('click', () => {
    if (!curve || !G || Pu === null) {
      encryptionOutput.textContent = "Please compute the public key first.";
      return;
    }
    const mPoint = parsePoint(messageMInput.value);
    if (!mPoint || !curve.isOnCurve(mPoint)) {
      encryptionOutput.textContent = "Message M is not a valid point on the curve.";
      return;
    }
    M = mPoint;
    const kVal = Number(kInput.value);
    if (!Number.isInteger(kVal) || kVal <= 0 || kVal >= curve.p) {
      encryptionOutput.textContent = "k must be an integer between 1 and p-1.";
      return;
    }
    k = kVal;

    C1 = curve.scalarMult(k, G);
    if (!C1 || !curve.isOnCurve(C1)) {
      encryptionOutput.textContent = "Error computing c1 = kG.";
      return;
    }
    const kPu = curve.scalarMult(k, Pu);
    if (!kPu || !curve.isOnCurve(kPu)) {
      encryptionOutput.textContent = "Error computing kPu.";
      return;
    }
    C2 = curve.pointAdd(M, kPu);
    if (!C2 || !curve.isOnCurve(C2)) {
      encryptionOutput.textContent = "Error computing c2 = M + kPu.";
      return;
    }

    encryptionOutput.textContent = `Encrypted message:\nc1 = ${pointToString(C1)}\nc2 = ${pointToString(C2)}`;
    decryptionOutput.textContent = "Decrypted message will appear here";
  });

  decryptBtn.addEventListener('click', () => {
    if (!curve || !n) {
      decryptionOutput.textContent = "Please enter curve parameters and compute public key first.";
      return;
    }
    if (!C1 || !C2) {
      decryptionOutput.textContent = "Please encrypt a message first.";
      return;
    }

    const nC1 = curve.scalarMult(n, C1);
    if (!nC1 || !curve.isOnCurve(nC1)) {
      decryptionOutput.textContent = "Error computing n * c1.";
      return;
    }
    const neg_nC1 = curve.pointNeg(nC1);
    const decryptedM = curve.pointAdd(C2, neg_nC1);
    if (!decryptedM || !curve.isOnCurve(decryptedM)) {
      decryptionOutput.textContent = "Error during decryption.";
      return;
    }

    decryptionOutput.textContent = `Decrypted message point:\nM = ${pointToString(decryptedM)}`;
  });