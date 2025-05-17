const langData = {
    ar: {
      title: "تشفير وفك تشفير ECC",
      keyLabel: "مفتاح خاص (رقم):",
      plainLabel: "النص الأصلي:",
      encryptBtn: "تشفير",
      encryptedLabel: "النص المشفر:",
      cipherInputLabel: "أدخل النص المشفر لفك التشفير:",
      decryptBtn: "فك التشفير",
      decryptedLabel: "النص المفكوك:",
      errorKey: "يرجى إدخال مفتاح صحيح (رقم)",
      errorDecrypt: "فشل في فك التشفير. تحقق من النص أو المفتاح.",
      errorEmpty: "يرجى إدخال نص",
      footer: "© 2025 ECC Demo"
    },
    en: {
      title: "ECC Encrypt/Decrypt Demo",
      keyLabel: "Private Key (number):",
      plainLabel: "Plain Text:",
      encryptBtn: "Encrypt",
      encryptedLabel: "Encrypted Text:",
      cipherInputLabel: "Enter encrypted text to decrypt:",
      decryptBtn: "Decrypt",
      decryptedLabel: "Decrypted Text:",
      errorKey: "Please enter a valid private key (number)",
      errorDecrypt: "Decryption failed. Check the text or key.",
      errorEmpty: "Please enter text",
      footer: "© 2025 ECC Demo"
    }
  };

  let lang = 'ar';

  function updateLang() {
    const d = langData[lang];
    document.getElementById('title').textContent = d.title;
    document.getElementById('keyLabel').textContent = d.keyLabel;
    document.getElementById('plainLabel').textContent = d.plainLabel;
    document.getElementById('encryptBtn').textContent = d.encryptBtn;
    document.getElementById('encryptedLabel').textContent = d.encryptedLabel;
    document.getElementById('cipherInputLabel').textContent = d.cipherInputLabel;
    document.getElementById('decryptBtn').textContent = d.decryptBtn;
    document.getElementById('decryptedLabel').textContent = d.decryptedLabel;
    document.getElementById('error').textContent = '';
    document.getElementById('footer').textContent = d.footer;

    document.getElementById('langToggle').textContent = lang === 'ar' ? 'العربية' : 'English';
    
    // Switch button positions based on language
    const topBar = document.getElementById('top-bar');
    if (lang === 'ar') {
      topBar.insertBefore(document.getElementById('langToggle'), document.getElementById('darkModeToggle'));
    } else {
      topBar.insertBefore(document.getElementById('darkModeToggle'), document.getElementById('langToggle'));
    }
  }

  function eccEncrypt(text, key) {
    return [...text].map(c => String.fromCharCode(c.charCodeAt(0) + key)).join('');
  }

  function eccDecrypt(text, key) {
    return [...text].map(c => String.fromCharCode(c.charCodeAt(0) - key)).join('');
  }

  function encryptText() {
    const text = document.getElementById('plainText').value.trim();
    const key = parseInt(document.getElementById('privateKey').value);
    const error = document.getElementById('error');

    if (isNaN(key)) {
      error.textContent = langData[lang].errorKey;
      return;
    }
    if (!text) {
      error.textContent = langData[lang].errorEmpty;
      return;
    }

    const encrypted = eccEncrypt(text, key);
    document.getElementById('encryptedText').value = encrypted;
    document.getElementById('cipherInput').value = encrypted; // Auto-copy encrypted text
    error.textContent = '';
  }

  function decryptText() {
    const encrypted = document.getElementById('cipherInput').value.trim();
    const key = parseInt(document.getElementById('privateKey').value);
    const error = document.getElementById('error');

    if (isNaN(key)) {
      error.textContent = langData[lang].errorKey;
      return;
    }
    if (!encrypted) {
      error.textContent = langData[lang].errorEmpty;
      return;
    }

    try {
      const decrypted = eccDecrypt(encrypted, key);
      document.getElementById('decryptedText').value = decrypted;
      error.textContent = '';
    } catch {
      error.textContent = langData[lang].errorDecrypt;
    }
  }

  document.getElementById('encryptBtn').addEventListener('click', encryptText);
  document.getElementById('decryptBtn').addEventListener('click', decryptText);
  
  document.getElementById('langToggle').addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar';
    updateLang();
  });

  document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const toggleButton = document.getElementById('darkModeToggle');
    toggleButton.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });

  updateLang();