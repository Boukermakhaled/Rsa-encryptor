 // Translations object
    const translations = {
      en: {
        rsaTitle: "RSA Encryption",
        labelP: "Enter prime number P:",
        labelQ: "Enter prime number Q:",
        labelE: "Enter public exponent E:",
        labelMessage: "Enter message to encrypt (numeric):",
        encryptBtn: "Encrypt Message",
        encryptedTitle: "Encrypted Message",
        decryptionTitle: "RSA Decryption",
        labelD: "Enter private exponent D:",
        labelNdecrypt: "Enter modulus N:",
        labelEncryptedInput: "Enter encrypted message to decrypt:",
        decryptBtn: "Decrypt Message",
        decryptedTitle: "Decrypted Message",
        alertInvalidInput: "Please enter valid prime numbers, exponent, and numeric message.",
        alertNotCoprime: "Public exponent E must be coprime to (P-1)*(Q-1).",
        alertNoModInverse: "Could not find modular inverse for the given E and phi.",
        alertValidD: "Please enter a valid private exponent D.",
        alertValidN: "Please enter a valid modulus N.",
        alertEnterEncrypted: "Please enter the encrypted message to decrypt.",
        tooltipContent: `
          <strong>RSA Encryption and Decryption Guide:</strong>
          <ul>
            <li>Enter two prime numbers P and Q.</li>
            <li>Enter a public exponent E coprime to (P-1)*(Q-1).</li>
            <li>Enter your numeric message to encrypt and click "Encrypt Message".</li>
            <li>The encrypted message will appear below.</li>
            <li>For decryption, provide the private exponent D and modulus N (usually P*Q).</li>
            <li>Enter the encrypted message and click "Decrypt Message" to get the original message.</li>
            <li>Use the language selector to switch between English and Arabic.</li>
            <li>Toggle dark mode using the moon icon.</li>
          </ul>
        `,
        navbarBrand: "RSA Tool",
        navLinks: ["Home", "About", "Tutorial", "Contact"],
        footerLinks: ["Privacy Policy", "Terms of Service", "GitHub", "Documentation"],
        copyright: "© 2023 RSA Encryption Tool. All rights reserved.",
        aboutAlert: "This is an RSA encryption/decryption tool. It demonstrates how RSA algorithm works for educational purposes.",
        tutorialAlert: "Tutorial: 1) Enter two prime numbers 2) Enter public exponent 3) Enter message 4) Click encrypt 5) For decryption, use the private key",
        contactAlert: "Contact us at: support@rsatool.example.com for any questions or feedback."
      },
      ar: {
        rsaTitle: "تشفير وفك تشفير RSA",
        labelP: "أدخل العدد الأولي P:",
        labelQ: "أدخل العدد الأولي Q:",
        labelE: "أدخل الأس العام E:",
        labelMessage: "أدخل الرسالة للتشفير (رقم):",
        encryptBtn: "تشفير الرسالة",
        encryptedTitle: "الرسالة المشفرة",
        decryptionTitle: "فك تشفير RSA",
        labelD: "أدخل الأس الخاص D:",
        labelNdecrypt: "أدخل الموديلاس N:",
        labelEncryptedInput: "أدخل الرسالة المشفرة لفك التشفير:",
        decryptBtn: "فك تشفير الرسالة",
        decryptedTitle: "الرسالة المفكوكة",
        alertInvalidInput: "يرجى إدخال أعداد أولية صحيحة، وأس وعددي صالح.",
        alertNotCoprime: "يجب أن يكون الأس العام E نسبياً أولياً مع (P-1)*(Q-1).",
        alertNoModInverse: "تعذر إيجاد المقلوب الضربي لـ E و phi.",
        alertValidD: "يرجى إدخال الأس الخاص D صالح.",
        alertValidN: "يرجى إدخال الموديلاس N صالح.",
        alertEnterEncrypted: "يرجى إدخال الرسالة المشفرة لفك التشفير.",
        tooltipContent: `
          <strong>دليل تشفير وفك تشفير RSA:</strong>
          <ul>
            <li>أدخل عددين أوليين P و Q.</li>
            <li>أدخل الأس العام E نسبي أولي مع (P-1)*(Q-1).</li>
            <li>أدخل رسالتك الرقمية للتشفير واضغط على "تشفير الرسالة".</li>
            <li>ستظهر الرسالة المشفرة أدناه.</li>
            <li>لفك التشفير، أدخل الأس الخاص D والموديلاس N (عادة P*Q).</li>
            <li>أدخل الرسالة المشفرة واضغط على "فك تشفير الرسالة" للحصول على الرسالة الأصلية.</li>
            <li>استخدم محدد اللغة للتبديل بين الإنجليزية والعربية.</li>
            <li>قم بتفعيل وضع الظلام باستخدام أيقونة القمر.</li>
          </ul>
        `,
        navbarBrand: "أداة RSA",
        navLinks: ["الرئيسية", "حول", "الشرح", "اتصل بنا"],
        footerLinks: ["سياسة الخصوصية", "شروط الخدمة", "جيت هاب", "التوثيق"],
        copyright: "© 2023 أداة تشفير RSA. جميع الحقوق محفوظة.",
        aboutAlert: "هذه أداة لتشفير وفك تشفير RSA. تشرح كيفية عمل خوارزمية RSA لأغراض تعليمية.",
        tutorialAlert: "الشرح: 1) أدخل عددين أوليين 2) أدخل الأس العام 3) أدخل الرسالة 4) اضغط تشفير 5) لفك التشفير استخدم المفتاح الخاص",
        contactAlert: "اتصل بنا على: HEX_Team_Support@gmail.com لأي استفسارات أو ملاحظات."
      }
    };

    // Elements cache
    const elements = {
      title: document.getElementById('title'),
      labelP: document.getElementById('labelP'),
      labelQ: document.getElementById('labelQ'),
      labelE: document.getElementById('labelE'),
      labelMessage: document.getElementById('labelMessage'),
      encryptBtn: document.getElementById('encryptBtn'),
      encryptedTitle: document.getElementById('encryptedTitle'),
      decryptionTitle: document.getElementById('decryptionTitle'),
      labelD: document.getElementById('labelD'),
      labelNdecrypt: document.getElementById('labelNdecrypt'),
      labelEncryptedInput: document.getElementById('labelEncryptedInput'),
      decryptBtn: document.getElementById('decryptBtn'),
      decryptedTitle: document.getElementById('decryptedTitle'),
      tooltiptext: document.getElementById('tooltiptext'),
      navbarBrand: document.querySelector('.navbar-brand'),
      navbarLinks: document.querySelectorAll('.navbar-link'),
      footerLinks: document.querySelectorAll('.footer-link'),
      copyright: document.querySelector('.copyright'),
      backToTop: document.getElementById('backToTop'),
      aboutLink: document.getElementById('aboutLink'),
      tutorialLink: document.getElementById('tutorialLink'),
      contactLink: document.getElementById('contactLink')
    };

    function applyLanguage(lang) {
      const t = translations[lang];
      elements.title.textContent = t.rsaTitle;
      elements.labelP.textContent = t.labelP;
      elements.labelQ.textContent = t.labelQ;
      elements.labelE.textContent = t.labelE;
      elements.labelMessage.textContent = t.labelMessage;
      elements.encryptBtn.textContent = t.encryptBtn;
      elements.encryptedTitle.textContent = t.encryptedTitle;
      elements.decryptionTitle.textContent = t.decryptionTitle;
      elements.labelD.textContent = t.labelD;
      elements.labelNdecrypt.textContent = t.labelNdecrypt;
      elements.labelEncryptedInput.textContent = t.labelEncryptedInput;
      elements.decryptBtn.textContent = t.decryptBtn;
      elements.decryptedTitle.textContent = t.decryptedTitle;
      elements.tooltiptext.innerHTML = t.tooltipContent;
      
      // Update navbar and footer
      elements.navbarBrand.textContent = t.navbarBrand;
      elements.navbarLinks.forEach((link, index) => {
        link.textContent = t.navLinks[index];
      });
      elements.footerLinks.forEach((link, index) => {
        link.textContent = t.footerLinks[index];
      });
      elements.copyright.textContent = t.copyright;
    }

    // Dark mode toggle and persistence
    const darkModeToggle = document.getElementById('darkModeToggle');
    function setDarkMode(enabled) {
      if (enabled) {
        document.body.classList.add('dark');
        darkModeToggle.textContent = '☀️';
      } else {
        document.body.classList.remove('dark');
        darkModeToggle.textContent = '🌙';
      }
      localStorage.setItem('darkMode', enabled ? 'on' : 'off');
    }
    // Initialize dark mode from localStorage
    const storedDarkMode = localStorage.getItem('darkMode');
    setDarkMode(storedDarkMode === 'on');

    darkModeToggle.addEventListener('click', () => {
      setDarkMode(!document.body.classList.contains('dark'));
    });

    // Language selector
    const languageSelector = document.getElementById('languageSelector');
    // apply saved language or default to English
    let savedLang = localStorage.getItem('language');
    if (!savedLang) savedLang = 'en';
    languageSelector.value = savedLang;
    applyLanguage(savedLang);

    languageSelector.addEventListener('change', () => {
      const lang = languageSelector.value;
      localStorage.setItem('language', lang);
      applyLanguage(lang);
      if (lang === 'ar') {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
      }
    });

    // Initialize document direction for saved lang
    if (savedLang === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    }

    // Progress bar functionality
    window.onscroll = function() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById("progressBar").style.width = scrolled + "%";
      
      // Show or hide back to top button
      if (winScroll > 300) {
        elements.backToTop.style.display = "flex";
      } else {
        elements.backToTop.style.display = "none";
      }
    };

    // Back to top button functionality
    elements.backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Nav links functionality
    elements.aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = languageSelector.value;
      alert(translations[lang].aboutAlert);
    });

    elements.tutorialLink.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = languageSelector.value;
      alert(translations[lang].tutorialAlert);
    });

    elements.contactLink.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = languageSelector.value;
      alert(translations[lang].contactAlert);
    });

    function gcd(a, b) {
      while (b !== 0) {
          [a, b] = [b, a % b];
      }
      return a;
    }

    function modInverse(a, m) {
      a = a % m;
      for (let x = 1; x < m; x++) {
          if ((a * x) % m === 1) {
              return x;
          }
      }
      return null;
    }

    function encrypt(message, e, n) {
      let m = BigInt(message);
      let c = (m ** BigInt(e)) % BigInt(n);
      return c.toString();
    }

    function decrypt(encrypted, d, n) {
      try {
        let c = BigInt(encrypted);
        let m = (c ** BigInt(d)) % BigInt(n);
        return m.toString();
      } catch (error) {
        return translations[languageSelector.value].alertEnterEncrypted; 
      }
    }

    function alertMsg(message) {
      alert(message);
    }

    document.getElementById('encryptBtn').addEventListener('click', () => {
      const lang = languageSelector.value;
      const p = parseInt(document.getElementById('p').value);
      const q = parseInt(document.getElementById('q').value);
      const e = parseInt(document.getElementById('e').value);
      const message = parseInt(document.getElementById('message').value);

      if (isNaN(p) || isNaN(q) || p <= 1 || q <= 1 || isNaN(e) || e <= 1 || isNaN(message)) {
          alertMsg(translations[lang].alertInvalidInput);
          return;
      }

      const n = p * q;
      const phi = (p - 1) * (q - 1);

      if (gcd(e, phi) !== 1) {
          alertMsg(translations[lang].alertNotCoprime);
          return;
      }

      const d = modInverse(e, phi);
      if (d === null) {
          alertMsg(translations[lang].alertNoModInverse);
          return;
      }

      const encrypted = encrypt(message, e, n);
      document.getElementById('encryptedMessage').textContent = encrypted;
      document.getElementById('decryptedMessage').textContent = '';
      document.getElementById('encryptedInput').value = '';
      document.getElementById('d').value = d;
      document.getElementById('n_decrypt').value = n; // Set n for decryption
    });

    document.getElementById('decryptBtn').addEventListener('click', () => {
      const lang = languageSelector.value;
      const d = parseInt(document.getElementById('d').value);
      const n = parseInt(document.getElementById('n_decrypt').value);
      const encrypted = document.getElementById('encryptedInput').value;

      if (isNaN(d) || d <= 0) {
          alertMsg(translations[lang].alertValidD);
          return;
      }
      if (isNaN(n) || n <= 0) {
          alertMsg(translations[lang].alertValidN);
          return;
      }
      if (!encrypted) {
          alertMsg(translations[lang].alertEnterEncrypted);
          return;
      }

      const decrypted = decrypt(encrypted, d, n);
      document.getElementById('decryptedMessage').textContent = decrypted;
    });
     // Custom Alert Functionality
    const customAlert = document.getElementById('customAlert');
    const alertTitle = document.getElementById('alertTitle');
    const alertMessage = document.getElementById('alertMessage');
    const alertOkBtn = document.getElementById('alertOkBtn');

    function showAlert(title, message) {
      alertTitle.textContent = title;
      alertMessage.textContent = message;
      customAlert.classList.add('show');
      
      // Set focus for accessibility
      alertOkBtn.focus();
    }

    function hideAlert() {
      customAlert.classList.remove('show');
    }

    // Close alert when clicking OK
    alertOkBtn.addEventListener('click', hideAlert);

    // Close alert when clicking outside
    customAlert.addEventListener('click', (e) => {
      if (e.target === customAlert) {
        hideAlert();
      }
    });

    // Close alert with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && customAlert.classList.contains('show')) {
        hideAlert();
      }
    });

    // Replace standard alert with custom alert
    function alertMsg(title, message) {
      showAlert(title, message);
    }

    // Nav links functionality with custom alerts
    elements.aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = languageSelector.value;
      const title = lang === 'en' ? 'RSA (Rivest-Shamir-Adleman) is a public-key cryptosystem used for secure data transmission.' : 'RSA هو نظام تشفير بالمفتاح العام يُستخدم لحماية البيانات. ';
      alertMsg(title, translations[lang].aboutAlert);
    });
elements.tutorialLink.addEventListener('click', (e) => {
  e.preventDefault();
  const lang = languageSelector.value;

  Swal.fire({
    title: lang === 'en' ? 'Tutorial' : 'الشرح',
    html: `
      <div style="margin: 0 auto; max-width: 400px;">
        <video controls style="width:100%; border-radius: 8px;">
          <source src="RSA Cryptosystem in Under 60 Seconds.mp4" type="video/mp4">
        </video>
      </div>
    `,
    showConfirmButton: true,
    confirmButtonText: lang === 'en' ? 'Close' : 'إغلاق',
    confirmButtonColor: '#3085d6',
    width: 'auto', // يتكيف مع المحتوى
    padding: '20px',
    backdrop: 'rgba(0,0,0,0.7)',
    customClass: {
      popup: 'custom-swal-popup', // يمكنك إضافة تنسيقات إضافية هنا
    }
  });
});


    elements.contactLink.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = languageSelector.value;
      const title = lang === 'en' ? 'Contact : HEX_Team_Support@gmail.com ' : 'HEX_Team_Support@gmail.com  : اتصل بنا  ';
      alertMsg(title, translations[lang].contactAlert);
    });

    // Update all existing alerts to use the new system
    function alertMsg(message) {
      showAlert('', message);
    }