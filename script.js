/**
 * Presentation Interactive Logic
 * Handles:
 * 1. Bilingual switching (FR / AR) with RTL/LTR
 * 2. Character-by-character typing animation with blinking IDE cursor
 * 3. In-card live HTML preview with smooth toggle
 * 4. Clipboard code copying
 */

// Presentation text dictionary matching the original slide deck exactly
const translations = {
  fr: {
    siteBadge: "Présentation Web",
    docTitle: "Présentation sur HTML — Hanane azouz",
    
    // Page 1
    heroTitle: "Présentation sur HTML",
    heroAuthor: "Hanane azouz",
    
    // Page 2
    section1Title: "C’est quoi HTML ?",
    section1P1: "HTML signifie HyperText Markup Language. C’est le langage utilisé pour créer et structurer les pages web. Avec HTML, on peut ajouter :",
    section1List1: "Des titres",
    section1List2: "Des paragraphes",
    section1List3: "Des images",
    section1List4: "Des liens",
    section1List5: "Des listes",
    section1List6: "Des tableaux",
    
    // Page 3
    section2Title: "À quoi sert HTML ?",
    section2P1: "HTML permet de définir la structure d’une page web",
    section2P2: "Par exemple :.",
    section2List1: "Le titre de la page",
    section2List2: "le contenu",
    section2List3: "les images",
    section2List4: "Les liens",
    section2List5: "Les différentes sections",
    section2Summary: "HTML = Structure de la page web",
    
    // Page 4
    section3Title: "Structure d’une page HTML:",
    section3P1: "Structure d’une page HTML:",
    
    // Page 5
    section4Title: "Les balises HTML:",
    section4P1: "HTML utilise des balises pour organiser le contenu.",
    section4P2: "Quelques exemples :",
    section4Desc1: "titre principal",
    section4Desc2: "paragraphe",
    section4Desc3: "image",
    section4Desc4: "lien",
    section4Desc5: "liste",
    section4Desc6: "tableau",
    
    // Page 6
    section5Title: "Exemple simple:",
    section5P1: "Ce code permet d’afficher un titre, un paragraphe et un lien.",
    
    // Page 7
    section6Title: "HTML, CSS et JavaScript:",
    section6P1: "Pour créer un site web complet, on utilise souvent trois technologies",
    tech1Role: "structure",
    tech2Role: "design et couleurs",
    tech3Role: "interactions et fonctionnalités",
    houseTitle: "On peut les comparer à une maison :",
    house1: "HTML = structure",
    house2: "CSS = décoration",
    house3: "JavaScript = fonctionnement",
    
    // Page 8
    section7Title: "Les avantages de HTML:",
    section7List1: "Facile à apprendre",
    section7List2: "Gratuit et accessible",
    section7List3: "Compatible avec les navigateurs web",
    section7List4: "Utilisé dans la création des sites web",
    section7List5: "Fonctionne avec CSS et JavaScript",
    
    // Page 9
    section8Title: "Conclusion:",
    section8P1: "HTML est un langage essentiel dans le développement web.",
    section8P2: "Il permet de structurer le contenu d’une page web et constitue généralement la première étape pour apprendre le développement web.",
    
    // Page 10
    section9Title: "Merci pour votre attention !",
    
    // UI strings
    previewBtn: "Aperçu",
    codeBtn: "Code",
    copyBtn: "Copier",
    copiedBtn: "Copié !",
    previewLiveBanner: "Rendu dans le navigateur",
    footerText: "Hanane azouz • Présentation sur HTML"
  },
  ar: {
    siteBadge: "عرض تقديمي للويب",
    docTitle: "عرض تقديمي حول HTML — حنان عزوز",
    
    // Page 1
    heroTitle: "عرض تقديمي حول HTML",
    heroAuthor: "حنان عزوز",
    
    // Page 2
    section1Title: "ما هو HTML؟",
    section1P1: "HTML تعني HyperText Markup Language. إنها اللغة المستخدمة لإنشاء وهيكلة صفحات الويب. باستخدام HTML، يمكننا إضافة:",
    section1List1: "عناوين",
    section1List2: "فقرات",
    section1List3: "صور",
    section1List4: "روابط",
    section1List5: "قوائم",
    section1List6: "جداول",
    
    // Page 3
    section2Title: "ما فائدة HTML؟",
    section2P1: "يتيح HTML تحديد بنية وهيكل صفحة الويب",
    section2P2: "على سبيل المثال:.",
    section2List1: "عنوان الصفحة",
    section2List2: "المحتوى",
    section2List3: "الصور",
    section2List4: "الروابط",
    section2List5: "الأقسام المختلفة",
    section2Summary: "HTML = بنية صفحة الويب",
    
    // Page 4
    section3Title: "بنية صفحة HTML:",
    section3P1: "بنية صفحة HTML:",
    
    // Page 5
    section4Title: "وسوم HTML:",
    section4P1: "يستخدم HTML وسوماً لتنظيم المحتوى.",
    section4P2: "بعض الأمثلة :",
    section4Desc1: "العنوان الرئيسي",
    section4Desc2: "فقرة",
    section4Desc3: "صورة",
    section4Desc4: "رابط",
    section4Desc5: "قائمة",
    section4Desc6: "جدول",
    
    // Page 6
    section5Title: "مثال بسيط:",
    section5P1: "يتيح هذا الكود عرض عنوان، وفقرة، ورابط.",
    
    // Page 7
    section6Title: "HTML وCSS وJavaScript:",
    section6P1: "لإنشاء موقع ويب كامل، غالباً ما نستخدم ثلاث تقنيات",
    tech1Role: "البنية والهيكل",
    tech2Role: "التصميم والألوان",
    tech3Role: "التفاعلات والوظائف",
    houseTitle: "يمكننا تشبيهها بمنزل :",
    house1: "HTML = الهيكل والأساس",
    house2: "CSS = الديكور والمظهر",
    house3: "JavaScript = التشغيل والمرافق",
    
    // Page 8
    section7Title: "مزايا HTML:",
    section7List1: "سهل التعلّم",
    section7List2: "مجاني ومتاح للجميع",
    section7List3: "متوافق مع جميع متصفحات الويب",
    section7List4: "مستخدم في إنشاء مواقع الويب",
    section7List5: "يعمل بتوافق مع CSS وJavaScript",
    
    // Page 9
    section8Title: "خاتمة:",
    section8P1: "HTML لغة أساسية وجوهرية في تطوير الويب.",
    section8P2: "فهو يتيح هيكلة محتوى صفحة الويب، ويمثل عموماً الخطوة الأولى لتعلم تطوير الويب.",
    
    // Page 10
    section9Title: "شكراً لحسن انتباهكم !",
    
    // UI strings
    previewBtn: "معاينة",
    codeBtn: "الكود",
    copyBtn: "نسخ",
    copiedBtn: "تم النسخ !",
    previewLiveBanner: "معاينة داخل المتصفح",
    footerText: "حنان عزوز • عرض تقديمي حول HTML"
  }
};

// Exact code snippets associated strictly with the presentation topics
const codeSnippets = {
  'code-structure': `<!DOCTYPE html>
<html>
<head>
  <title>Ma page</title>
</head>
<body>
  <h1>Bonjour</h1>
  <p>Bienvenue sur ma page web.</p>
</body>
</html>`,

  'code-balises': `<h1>Mon titre</h1>
<p>Un paragraphe avec un <a href="#">lien</a>.</p>
<ul>
  <li>Premier élément</li>
  <li>Deuxième élément</li>
</ul>
<table border="1">
  <tr><th>Balise</th><th>Usage</th></tr>
  <tr><td>&lt;h1&gt;</td><td>Titre</td></tr>
</table>`,

  'code-example': `<h1>Mon site web</h1>
<p>Bienvenue sur mon site.</p>
<a href="https://example.com">Visiter le site</a>`
};

let currentLang = 'fr';
const typingStates = {};

/**
 * Highlighting function to convert raw HTML code to colored syntax tokens
 */
function highlightHTML(source) {
  let escaped = source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Highlight DOCTYPE
  escaped = escaped.replace(/(&lt;!DOCTYPE [^&]+&gt;)/gi, '<span class="token-doctype">$1</span>');

  // Highlight tags and attributes
  escaped = escaped.replace(/(&lt;\/?)([a-zA-Z0-9\-]+)(.*?)(&gt;)/g, (match, open, tagName, attrs, close) => {
    const highlightedAttrs = attrs.replace(/([a-zA-Z\-:]+)=(".*?"|'.*?'|[^>\s]+)/g, '<span class="token-attr">$1</span>=<span class="token-val">$2</span>');
    return `${open}<span class="token-tag">${tagName}</span>${highlightedAttrs}${close}`;
  });

  return escaped;
}

/**
 * Starts character-by-character typing animation with vertical blinking cursor
 */
function startTypingAnimation(targetId) {
  if (typingStates[targetId]?.started) return;

  const codeEl = document.getElementById(targetId);
  const fullText = codeSnippets[targetId];
  if (!codeEl || !fullText) return;

  typingStates[targetId] = {
    started: true,
    completed: false,
    intervalId: null
  };

  let charIndex = 0;
  // Snappy typing: 1-2 characters per tick for smooth completion in ~1.4s
  const step = fullText.length > 140 ? 2 : 1;
  const tickDelay = 14;

  codeEl.innerHTML = '';

  typingStates[targetId].intervalId = setInterval(() => {
    charIndex += step;
    if (charIndex >= fullText.length) {
      charIndex = fullText.length;
      codeEl.innerHTML = highlightHTML(fullText);
      typingStates[targetId].completed = true;
      clearInterval(typingStates[targetId].intervalId);
      return;
    }
    const currentSlice = fullText.slice(0, charIndex);
    codeEl.innerHTML = highlightHTML(currentSlice);
  }, tickDelay);
}

/**
 * Immediately completes typing if user wants to copy or preview
 */
function completeTypingImmediately(targetId) {
  const codeEl = document.getElementById(targetId);
  const fullText = codeSnippets[targetId];
  if (!codeEl || !fullText) return;

  if (typingStates[targetId]?.intervalId) {
    clearInterval(typingStates[targetId].intervalId);
  }
  codeEl.innerHTML = highlightHTML(fullText);
  typingStates[targetId] = { started: true, completed: true };
}

/**
 * Generates an isolated HTML document string for the live preview iframe
 */
function getPreviewDocument(codeId, lang) {
  const rawCode = codeSnippets[codeId] || '';
  const isAr = lang === 'ar';

  // Extract body content if full HTML document
  let bodyContent = rawCode;
  const bodyMatch = rawCode.match(/<body>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    bodyContent = bodyMatch[1].trim();
  }

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${isAr ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 16px 20px;
      color: #1f2328;
      background-color: #ffffff;
      line-height: 1.55;
    }
    h1 {
      font-size: 1.35rem;
      margin: 0 0 10px 0;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      font-weight: 700;
    }
    p {
      margin: 0 0 10px 0;
      font-size: 0.95rem;
      color: #334155;
    }
    a {
      color: #2563eb;
      text-decoration: underline;
      cursor: pointer;
    }
    a:hover {
      color: #1d4ed8;
    }
    ul {
      margin: 0 0 12px 0;
      padding-inline-start: 22px;
      font-size: 0.95rem;
      color: #334155;
    }
    li {
      margin-bottom: 4px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      max-width: 320px;
      margin-top: 8px;
      font-size: 0.9rem;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 12px;
      text-align: inherit;
    }
    th {
      background-color: #f1f5f9;
      font-weight: 600;
      color: #1e293b;
    }
  </style>
</head>
<body>
  ${bodyContent}
</body>
</html>`;
}

/**
 * Initializes viewport intersection observer to start typing animations when card scrolls into view
 */
function initTypingObserver() {
  const codeCards = document.querySelectorAll('.code-card');
  if (!window.IntersectionObserver) {
    Object.keys(codeSnippets).forEach(id => completeTypingImmediately(id));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const codeEl = entry.target.querySelector('.code-text-target');
        if (codeEl && codeEl.id) {
          startTypingAnimation(codeEl.id);
          observer.unobserve(entry.target);
        }
      }
    });
  }, {
    threshold: 0.25
  });

  codeCards.forEach(card => observer.observe(card));
}

/**
 * In-card live preview toggle functionality
 */
function initPreviewButtons() {
  document.querySelectorAll('.preview-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const card = btn.closest('.code-card');
      if (!card || !targetId) return;

      completeTypingImmediately(targetId);

      const codeBody = card.querySelector('.code-body');
      const previewPane = card.querySelector('.code-preview-pane');
      const iframe = previewPane ? previewPane.querySelector('.preview-iframe') : null;
      const isCurrentlyPreview = btn.classList.contains('active');
      const dict = translations[currentLang];
      const previewText = btn.querySelector('.preview-text');
      const previewIcon = btn.querySelector('.preview-icon');

      if (isCurrentlyPreview) {
        // Toggle back to Code
        btn.classList.remove('active');
        if (previewText) previewText.textContent = dict.previewBtn;
        if (previewIcon) {
          previewIcon.innerHTML = `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`;
        }

        if (previewPane && codeBody) {
          previewPane.style.opacity = '0';
          setTimeout(() => {
            previewPane.style.display = 'none';
            codeBody.style.display = 'block';
            codeBody.style.opacity = '1';
          }, 150);
        }
      } else {
        // Toggle to Preview
        btn.classList.add('active');
        if (previewText) previewText.textContent = dict.codeBtn;
        if (previewIcon) {
          previewIcon.innerHTML = `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`;
        }

        if (iframe) {
          iframe.srcdoc = getPreviewDocument(targetId, currentLang);
        }

        if (codeBody && previewPane) {
          codeBody.style.opacity = '0';
          setTimeout(() => {
            codeBody.style.display = 'none';
            previewPane.style.display = 'block';
            previewPane.style.opacity = '1';
          }, 150);
        }
      }
    });
  });
}

/**
 * Copy code implementation with instant feedback
 */
function initCopyButtons() {
  document.querySelectorAll('.copy-button').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-target');
      completeTypingImmediately(targetId);
      const codeText = codeSnippets[targetId] || '';

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(codeText);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = codeText;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        const dict = translations[currentLang];
        btn.classList.add('copied');
        const textSpan = btn.querySelector('.copy-text');
        if (textSpan) {
          textSpan.textContent = dict.copiedBtn;
        }

        setTimeout(() => {
          btn.classList.remove('copied');
          if (textSpan) {
            textSpan.textContent = dict.copyBtn;
          }
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code: ', err);
      }
    });
  });
}

/**
 * Bilingual switcher handler
 */
function applyLanguage(lang) {
  currentLang = lang;
  const isAr = lang === 'ar';

  document.documentElement.lang = isAr ? 'ar' : 'fr';
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';

  const toggle = document.getElementById('language-toggle');
  if (toggle) {
    toggle.checked = isAr;
  }

  const frLabel = document.getElementById('lang-fr-label');
  const arLabel = document.getElementById('lang-ar-label');
  if (frLabel && arLabel) {
    frLabel.classList.toggle('active', !isAr);
    arLabel.classList.toggle('active', isAr);
  }

  const dict = translations[lang];
  if (dict) {
    document.title = dict.docTitle;
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    // Update Preview buttons based on their current active state
    document.querySelectorAll('.preview-button').forEach(btn => {
      const isPreview = btn.classList.contains('active');
      const textSpan = btn.querySelector('.preview-text');
      if (textSpan) {
        textSpan.textContent = isPreview ? dict.codeBtn : dict.previewBtn;
      }
      // Refresh active iframes for RTL/LTR update
      if (isPreview) {
        const targetId = btn.getAttribute('data-target');
        const card = btn.closest('.code-card');
        const iframe = card?.querySelector('.preview-iframe');
        if (iframe && targetId) {
          iframe.srcdoc = getPreviewDocument(targetId, lang);
        }
      }
    });

    // Update Copy buttons
    document.querySelectorAll('.copy-button').forEach(btn => {
      if (!btn.classList.contains('copied')) {
        const textSpan = btn.querySelector('.copy-text');
        if (textSpan) {
          textSpan.textContent = dict.copyBtn;
        }
      }
    });
  }

  try {
    localStorage.setItem('preferred_language', lang);
  } catch (e) {
    // Graceful fallback
  }
}

// Initial setup on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  let savedLang = 'fr';
  try {
    savedLang = localStorage.getItem('preferred_language') || 'fr';
  } catch (e) {
    savedLang = 'fr';
  }

  applyLanguage(savedLang);
  initTypingObserver();
  initPreviewButtons();
  initCopyButtons();

  const toggle = document.getElementById('language-toggle');
  if (toggle) {
    toggle.addEventListener('change', (e) => {
      const newLang = e.target.checked ? 'ar' : 'fr';
      applyLanguage(newLang);
    });
  }
});

// Automatic Service Worker registration for offline caching on GitHub Pages
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => {
        reg.update().catch(() => {});
      })
      .catch((err) => {
        console.warn('[SW] ServiceWorker registration failed:', err);
      });
  });
}
