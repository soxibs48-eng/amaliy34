/**
 * NOVA ARCHITECTS — 34-Amaliy Ish
 * Interaktiv JavaScript Moduli
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initProjectsSlider();
  initOfficeSlider();
  initCounters();
  initContactForm();
  initMobileMenu();
});

// 1. Tungi / Kunduzgi Rejim
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('nova-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('nova-theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  if (theme === 'dark') {
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  } else {
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
}

// 2. Loyihalar Slayderi
const projectsData = [
  {
    tag: "Turar-joy & Minoralar // 2026",
    title: "Nova Aurora Tower",
    desc: "Tokio markazida 64 qavatli, tebranishlarga qarshi gipoid parametrik fasadli va vertikal bog'larga ega ekologik osmono'par bino.",
    location: "Tokio, Yaponiya",
    area: "85,000 m²",
    height: "280 metr",
    status: "Yakunlangan",
    img: "assets/project-tower.jpg"
  },
  {
    tag: "Madaniy & Jamoat Fazosi // 2025",
    title: "Sfera Zamonaviy San'at Muzeyi",
    desc: "Tabiiy yorug'likni 100% qaytaruvchi shaffof polimer gumbaz va monolit travertin toshlaridan yaratilgan fazoviy me'moriy ansambl.",
    location: "San-Fransisko, AQSH",
    area: "42,000 m²",
    height: "38 metr",
    status: "Foydalanishda",
    img: "assets/project-museum.jpg"
  },
  {
    tag: "Biznes & Shaharsozlik // 2026",
    title: "Apex Horizon Korporativ Markazi",
    desc: "Kam uglerodli, to'liq quyosh energiyasida ishlovchi va aqlli bioklimatik shamollatish tizimiga ega xalqaro moliya shtab-kvartirasi.",
    location: "London, Buyuk Britaniya",
    area: "110,000 m²",
    height: "195 metr",
    status: "Qurilish yakunida",
    img: "assets/project-facade.jpg"
  }
];

let currentProjectIdx = 0;

function initProjectsSlider() {
  const prevBtn = document.getElementById('projectPrevBtn');
  const nextBtn = document.getElementById('projectNextBtn');
  if (!prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', () => {
    currentProjectIdx = (currentProjectIdx - 1 + projectsData.length) % projectsData.length;
    renderProject(currentProjectIdx);
  });

  nextBtn.addEventListener('click', () => {
    currentProjectIdx = (currentProjectIdx + 1) % projectsData.length;
    renderProject(currentProjectIdx);
  });
}

function renderProject(idx) {
  const p = projectsData[idx];
  document.getElementById('projectTag').textContent = p.tag;
  document.getElementById('projectTitle').textContent = p.title;
  document.getElementById('projectDesc').textContent = p.desc;
  document.getElementById('projectLocation').textContent = p.location;
  document.getElementById('projectArea').textContent = p.area;
  document.getElementById('projectHeight').textContent = p.height;
  document.getElementById('projectStatus').textContent = p.status;
  document.getElementById('projectImage').src = p.img;
}

// 3. San-Fransisko Ofisi Slayderi
function initOfficeSlider() {
  const officePrev = document.getElementById('officePrevBtn');
  const officeNext = document.getElementById('officeNextBtn');
  const officeImg = document.getElementById('officeImg');
  if (!officePrev || !officeNext || !officeImg) return;

  const officeImages = [
    "assets/office-interior.jpg",
    "assets/greenhouse.jpg"
  ];
  let officeIdx = 0;

  officePrev.addEventListener('click', () => {
    officeIdx = (officeIdx - 1 + officeImages.length) % officeImages.length;
    officeImg.src = officeImages[officeIdx];
  });

  officeNext.addEventListener('click', () => {
    officeIdx = (officeIdx + 1) % officeImages.length;
    officeImg.src = officeImages[officeIdx];
  });
}

// 4. Metrikalar Hisoblagichi
function initCounters() {
  const counters = document.querySelectorAll('.highlight-metric[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        let start = 0;
        const duration = 1500;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(start) + suffix;
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// 5. Konsultatsiya Formasi
function initContactForm() {
  const form = document.getElementById('novaContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    alert(`Rahmat, hurmatli ${name}! So'rovingiz qabul qilindi. NOVA Architects me'moriy jamoasi 24 soat ichida siz bilan bog'lanadi.`);
    form.reset();
  });
}

// 6. Mobil menyu
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    if (nav.style.display === 'flex') {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '84px';
      nav.style.left = '0';
      nav.style.width = '100%';
      nav.style.background = 'var(--color-surface)';
      nav.style.padding = '24px';
      nav.style.borderBottom = '1px solid var(--color-border)';
    }
  });
}

