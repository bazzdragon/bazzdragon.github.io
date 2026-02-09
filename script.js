(function () {
  'use strict';

  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  const hamburgerOverlay = document.getElementById('hamburger-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxImageEl = document.getElementById('lightbox-image');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let sidebarOpen = true;

  // Add your project image URLs here. Each project can have multiple images for the carousel.
  const projectImages = {
    adventures: ['aol1.png', 'aol2.png', 'aol3.png'],
    hellslayer: [],
    'pc-part-shop': ['näyttis.png', 'koti.png'],
    portfolio: [],
    'defend-exe': [],
    list: [],
    battants: []
  };

  const projectIndex = { adventures: 0, hellslayer: 0, 'pc-part-shop': 0, portfolio: 0, 'defend-exe': 0, list: 0, battants: 0 };

  let currentLightboxProject = null;

  // Download file URLs: set each to your .zip or .pptx (or other) file path. Empty = link does nothing.
  const downloadUrls = {
    adventuresProject: 'adventures_of_lobo.zip',
    adventuresGame: 'adventures_of_lobo.zip',
    adventuresGdd: '',
    hellslayerProject: '',
    hellslayerGame: '',
    hellslayerGdd: '',
    pcPartShopProject: 'GPU_shop_website.xd',
    pcPartShopFile: 'GPU_shop_website.xd',
    portfolioProject: '',
    portfolioFile: '',
    defendExeProject: '',
    defendExeGame: '',
    defendExeGdd: '',
    listProject: '',
    listGame: '',
    listGdd: '',
    battantsProject: '',
    battantsGame: '',
    battantsGdd: ''
  };

  // Map data-download attribute values (kebab-case) to downloadUrls keys (camelCase)
  function downloadKeyFromAttr(attr) {
    if (!attr) return null;
    return attr.split('-').map(function (part, i) {
      return i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1);
    }).join('');
  }

  document.querySelectorAll('[data-download]').forEach(function (link) {
    const key = downloadKeyFromAttr(link.getAttribute('data-download'));
    const url = key && downloadUrls[key];
    if (url) {
      link.href = url;
      link.setAttribute('download', '');
    } else {
      link.addEventListener('click', function (e) {
        if (link.getAttribute('href') === '#') e.preventDefault();
      });
    }
  });

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
    document.body.classList.toggle('sidebar-collapsed', !sidebarOpen);
    sidebar.classList.toggle('collapsed', !sidebarOpen);
    hamburgerOverlay.hidden = sidebarOpen;
  }

  function openSidebar() {
    if (!sidebarOpen) toggleSidebar();
  }

  hamburger.addEventListener('click', toggleSidebar);
  hamburgerOverlay.addEventListener('click', openSidebar);

  function setActiveSection(id) {
    const hash = id || (window.location.hash && window.location.hash.slice(1)) || 'about';
    const sectionId = hash;

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      const linkId = href && href.startsWith('#') ? href.slice(1) : '';
      link.classList.toggle('active', linkId === sectionId);
    });

    sections.forEach(function (section) {
      section.classList.toggle('active', section.id === sectionId);
    });

    if (!sidebarOpen && window.innerWidth <= 768) {
      toggleSidebar();
    }
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const id = href.slice(1);
        setActiveSection(id);
        history.replaceState(null, '', '#' + id);
      }
    });
  });

  window.addEventListener('hashchange', function () {
    setActiveSection();
  });

  if (window.location.hash) {
    setActiveSection();
  } else {
    setActiveSection('about');
  }

  function getProjectImageCount(projectKey) {
    return Math.max(1, (projectImages[projectKey] || []).length);
  }

  function showProjectImage(projectKey, index) {
    const images = projectImages[projectKey] || [];
    const count = getProjectImageCount(projectKey);
    const i = ((index % count) + count) % count;
    projectIndex[projectKey] = i;

    const block = document.querySelector('.project-block[data-project="' + projectKey + '"]');
    if (!block) return;
    const el = block.querySelector('.project-image');
    if (!el) return;

    if (images[i]) {
      el.innerHTML = '';
      const img = document.createElement('img');
      img.src = images[i];
      img.alt = 'Project image ' + (i + 1);
      el.appendChild(img);
    } else {
      el.innerHTML = '<span>project image</span>';
    }

    if (lightboxImageEl && lightbox.getAttribute('aria-hidden') === 'false' && (!currentLightboxProject || currentLightboxProject === projectKey)) {
      lightboxImageEl.innerHTML = '';
      if (images[i]) {
        const img = document.createElement('img');
        img.src = images[i];
        img.alt = 'Project image ' + (i + 1);
        lightboxImageEl.appendChild(img);
      } else {
        lightboxImageEl.innerHTML = '<span>project image</span>';
      }
    }
  }

  function openLightbox(projectKey) {
    if (!lightbox) return;
    currentLightboxProject = projectKey;
    const images = projectImages[projectKey] || [];
    const i = projectIndex[projectKey] || 0;
    lightboxImageEl.innerHTML = '';
    if (images[i]) {
      const img = document.createElement('img');
      img.src = images[i];
      img.alt = 'Project image ' + (i + 1);
      lightboxImageEl.appendChild(img);
    } else {
      lightboxImageEl.innerHTML = '<span>project image</span>';
    }
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentLightboxProject = null;
  }

  document.querySelectorAll('.project-block').forEach(function (block) {
    const projectKey = block.getAttribute('data-project');
    if (!projectKey) return;

    const prevBtn = block.querySelector('.carousel-prev');
    const nextBtn = block.querySelector('.carousel-next');
    const imageEl = block.querySelector('.project-image');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        showProjectImage(projectKey, projectIndex[projectKey] - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        showProjectImage(projectKey, projectIndex[projectKey] + 1);
      });
    }
    if (imageEl) {
      imageEl.addEventListener('click', function () {
        openLightbox(projectKey);
      });
    }
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!currentLightboxProject) return;
      showProjectImage(currentLightboxProject, projectIndex[currentLightboxProject] - 1);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!currentLightboxProject) return;
      showProjectImage(currentLightboxProject, projectIndex[currentLightboxProject] + 1);
    });
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.getAttribute('aria-hidden') === 'false') {
      closeLightbox();
    }
  });

  // Skill stars: render from data-level (1–5). Filled = level, rest empty.
  document.querySelectorAll('.skill-stars[data-level]').forEach(function (el) {
    var level = Math.min(5, Math.max(0, parseInt(el.getAttribute('data-level'), 10) || 0));
    var html = '';
    for (var i = 0; i < 5; i++) {
      html += '<span class="star' + (i < level ? ' filled' : '') + '" aria-hidden="true">' + (i < level ? '\u2605' : '\u2606') + '</span>';
    }
    el.innerHTML = html;
    el.setAttribute('aria-label', level + ' out of 5');
  });

  Object.keys(projectIndex).forEach(function (key) {
    showProjectImage(key, 0);
  });
})();
