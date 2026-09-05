(() => {
  // Ícones (Lucide)
  if (window.lucide) lucide.createIcons();

  const header = document.getElementById('siteHeader');
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.getElementById('menuToggle');
  const topBtn = document.getElementById('topBtn');
  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('.nav-links a')];

  // Menu mobile
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
  });

  links.forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  // Header, botão de topo e destaque automático do menu
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
    topBtn.classList.toggle('show', window.scrollY > 500);

    const marker = window.scrollY + header.offsetHeight + 36;
    let current = sections[0]?.id || 'inicio';
    sections.forEach(section => {
      if (marker >= section.offsetTop) current = section.id;
    });
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Scroll reveal
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Galeria / lightbox (com suporte a teclado)
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let lastFocused = null;

  const openLightbox = (item) => {
    lastFocused = document.activeElement;
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector('img').alt;
    lightboxCaption.textContent = item.querySelector('.gallery-caption')?.textContent || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.getElementById('lightboxClose').focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightboxImage.src = '';
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });

  // Formulário → WhatsApp
  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const tipoPedido = document.getElementById('tipoPedido').value;
    const mensagem = document.getElementById('mensagem').value.trim();
    const text =
      `Olá, Farmácia Silva Paço!%0A%0A` +
      `Nome: ${nome}%0A` +
      `Telefone: ${telefone}%0A` +
      `Tipo de pedido: ${tipoPedido}%0A` +
      `Mensagem: ${mensagem}`;
    window.open(`https://wa.me/244935827474?text=${text}`, '_blank', 'noopener');
  });

  // Ano do rodapé
  document.getElementById('year').textContent = new Date().getFullYear();
})();
