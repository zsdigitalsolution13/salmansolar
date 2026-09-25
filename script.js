document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  mobileMenu.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

const billRange = document.querySelector('#bill-range');
const billOutput = document.querySelector('#bill-output');
const systemRange = document.querySelector('#system-range');
const systemCopy = document.querySelector('#system-copy');
const calcWhatsApp = document.querySelector('#calc-whatsapp');
const usageInputs = document.querySelectorAll('input[name="usage"]');

const currency = new Intl.NumberFormat('en-PK');

function getSuggestion(bill, usage) {
  let suggestion;
  if (bill <= 20000) suggestion = ['3–5 kW', 'A focused starting point for lower monthly consumption.'];
  else if (bill <= 45000) suggestion = ['5–8 kW', 'A practical starting point for a medium-sized property.'];
  else if (bill <= 80000) suggestion = ['8–12 kW', 'A stronger range for higher daytime use and larger loads.'];
  else if (bill <= 130000) suggestion = ['12–20 kW', 'A commercial-scale conversation for substantial energy use.'];
  else suggestion = ['20 kW+', 'A custom assessment is recommended for this level of consumption.'];

  const context = usage === 'Home' ? 'home' : usage === 'Shop' ? 'shop' : 'business';
  suggestion[1] = suggestion[1].replace('property', context);
  return suggestion;
}

function updateCalculator() {
  if (!billRange) return;
  const bill = Number(billRange.value);
  const usage = document.querySelector('input[name="usage"]:checked')?.value || 'Home';
  const [range, copy] = getSuggestion(bill, usage);
  billOutput.textContent = `Rs. ${currency.format(bill)}`;
  systemRange.textContent = range;
  systemCopy.textContent = copy;

  const rangeValues = [...range.matchAll(/\d+/g)].map((match) => Number(match[0]));
  const guideKw = rangeValues.length ? Math.max(...rangeValues) : 5;
  const panelCount = Math.ceil((guideKw * 1000) / 585);
  const generation = Math.round(guideKw * 4.2);
  const gauge = document.querySelector('#solar-gauge');
  const gaugeValue = document.querySelector('#gauge-value');
  const calcPanels = document.querySelector('#calc-panels');
  const calcGeneration = document.querySelector('#calc-generation');
  gauge?.style.setProperty('--gauge', `${Math.min(100, (guideKw / 20) * 100)}%`);
  if (gaugeValue) gaugeValue.textContent = guideKw;
  if (calcPanels) calcPanels.textContent = panelCount;
  if (calcGeneration) calcGeneration.textContent = `${generation} units`;
}

billRange?.addEventListener('input', updateCalculator);
usageInputs.forEach((input) => input.addEventListener('change', updateCalculator));
updateCalculator();

calcWhatsApp?.addEventListener('click', () => {
  const bill = Number(billRange.value);
  const usage = document.querySelector('input[name="usage"]:checked')?.value || 'Home';
  const range = systemRange.textContent;
  const text = `Assalam-o-Alaikum, I need solar for my ${usage.toLowerCase()}. My monthly bill is around Rs. ${currency.format(bill)}. The website suggested starting from ${range}. Please guide me about current stock and price.`;
  window.open(`https://wa.me/923006122109?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

const quoteForm = document.querySelector('#quote-form');
quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;

  const name = document.querySelector('#name').value.trim();
  const phone = document.querySelector('#phone').value.trim();
  const interest = document.querySelector('#interest').value;
  const bill = document.querySelector('#monthly-bill').value.trim() || 'Not provided';
  const message = document.querySelector('#message').value.trim() || 'Please share current stock and rate.';

  const text = `Assalam-o-Alaikum Salman Solar Energy,\n\nName: ${name}\nPhone: ${phone}\nInterested in: ${interest}\nApprox. bill: ${bill}\nRequirement: ${message}`;
  window.open(`https://wa.me/923006122109?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

// Salman Solar Care: direct fault reporting and customer-review access.
const careReportForm = document.querySelector('#care-report');
careReportForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!careReportForm.reportValidity()) return;

  const name = document.querySelector('#care-name').value.trim();
  const phone = document.querySelector('#care-phone').value.trim();
  const system = document.querySelector('#care-system').value;
  const problem = document.querySelector('#care-problem').value.trim();
  const text = `Assalam-o-Alaikum Salman Solar Energy,\n\nSALMAN SOLAR CARE — PROBLEM REPORT\nName: ${name}\nPhone: ${phone}\nSystem area: ${system}\nProblem: ${problem}\n\nPlease review my issue. I can attach fault photos in this chat.`;
  window.open(`https://wa.me/923006122109?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

const careReviewForm = document.querySelector('#care-review');
careReviewForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!careReviewForm.reportValidity()) return;

  const name = document.querySelector('#review-name').value.trim();
  const rating = Number(document.querySelector('#review-rating').value);
  const review = document.querySelector('#review-message').value.trim();
  const stars = `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`;
  const text = `Assalam-o-Alaikum Salman Solar Energy,\n\nCUSTOMER REVIEW\nName: ${name}\nRating: ${stars} (${rating}/5)\nReview: ${review}`;
  window.open(`https://wa.me/923006122109?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

const catalogTabs = document.querySelectorAll('.catalog-tab');
const catalogCollections = document.querySelectorAll('.catalog-collection');

catalogTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;
    catalogTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    catalogCollections.forEach((collection) => {
      const active = collection.dataset.collection === target;
      collection.classList.toggle('active', active);
      collection.hidden = !active;
    });
  });
});

const productDialog = document.querySelector('#product-dialog');
const productDialogClose = document.querySelector('#product-dialog-close');
const modalProductImage = document.querySelector('#modal-product-image');
const modalProductThumbs = [
  document.querySelector('#modal-product-thumb-1'),
  document.querySelector('#modal-product-thumb-2')
];
const productGalleryButtons = document.querySelectorAll('.product-gallery-thumb');
const modalProductCategory = document.querySelector('#modal-product-category');
const modalProductName = document.querySelector('#modal-product-name');
const modalProductDescription = document.querySelector('#modal-product-description');
const modalProductPrice = document.querySelector('#modal-product-price');
const modalProductWhatsApp = document.querySelector('#modal-product-whatsapp');
let activeProductImages = [];
let activeProductImageIndex = 0;

const categoryLabels = {
  panels: 'Solar panel details',
  inverters: 'Solar inverter details',
  batteries: 'Battery & storage details',
  accessories: 'Solar accessory details'
};

function closeProductDialog() {
  productDialog?.close();
  document.body.classList.remove('modal-open');
}

function showProductImage(index) {
  const selected = activeProductImages[index];
  if (!selected || !modalProductImage) return;
  activeProductImageIndex = index;
  modalProductImage.src = selected.src;
  modalProductImage.alt = selected.alt;
  productGalleryButtons.forEach((button, buttonIndex) => {
    const active = buttonIndex === index;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

productGalleryButtons.forEach((button) => {
  button.addEventListener('click', () => showProductImage(Number(button.dataset.galleryIndex)));
});

modalProductImage?.addEventListener('click', () => {
  if (activeProductImages.length < 2) return;
  showProductImage((activeProductImageIndex + 1) % activeProductImages.length);
});

document.querySelectorAll('.catalog-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    if (!productDialog?.showModal) return;
    event.preventDefault();

    const images = [...card.querySelectorAll('.product-image img')];
    const name = card.querySelector('h3')?.textContent.trim() || 'Solar product';
    const price = card.querySelector('.product-info strong')?.textContent.trim() || 'Ask for price';
    const category = card.dataset.category || 'accessories';

    activeProductImages = images.map((image) => ({ src: image.src, alt: image.alt || name }));
    modalProductThumbs.forEach((thumb, index) => {
      const image = activeProductImages[index];
      if (!thumb || !image) return;
      thumb.src = image.src;
      thumb.alt = image.alt;
    });
    showProductImage(0);
    modalProductCategory.textContent = categoryLabels[category] || 'Product details';
    modalProductName.textContent = name;
    modalProductDescription.textContent = card.dataset.description || 'Contact our team for specifications, compatibility, warranty and current availability.';
    modalProductPrice.textContent = price;
    modalProductWhatsApp.href = card.href;

    productDialog.showModal();
    document.body.classList.add('modal-open');
    productDialogClose.focus();
  });
});

productDialogClose?.addEventListener('click', closeProductDialog);
productDialog?.addEventListener('click', (event) => {
  if (event.target === productDialog) closeProductDialog();
});
productDialog?.addEventListener('close', () => document.body.classList.remove('modal-open'));

// Professional navigation and product mega-menu.
const navDropdown = document.querySelector('.nav-dropdown');
const navDropdownToggle = document.querySelector('.nav-dropdown-toggle');

navDropdownToggle?.addEventListener('click', () => {
  const open = navDropdown.classList.toggle('open');
  navDropdownToggle.setAttribute('aria-expanded', String(open));
});

document.addEventListener('click', (event) => {
  if (navDropdown && !navDropdown.contains(event.target)) {
    navDropdown.classList.remove('open');
    navDropdownToggle?.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    navDropdown?.classList.remove('open');
    navDropdownToggle?.setAttribute('aria-expanded', 'false');
    document.querySelectorAll('.site-search-form').forEach((form) => form.classList.remove('results-open'));
  }
});

// Category shortcuts in the desktop mega-menu and mobile navigation.
document.querySelectorAll('[data-open-collection]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = link.dataset.openCollection;
    document.querySelector(`.catalog-tab[data-target="${target}"]`)?.click();
    navDropdown?.classList.remove('open');
    navDropdownToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Search every catalog item by product, brand, category or displayed price.
const searchableCards = [...document.querySelectorAll('.catalog-card')].map((card) => {
  const name = card.querySelector('h3')?.textContent.trim() || 'Solar product';
  const price = card.querySelector('.product-info strong')?.textContent.trim() || '';
  const category = card.dataset.category || '';
  return {
    card,
    name,
    price,
    category,
    image: card.querySelector('.product-image-primary')?.src || card.querySelector('.product-image img')?.src || '',
    searchText: `${name} ${price} ${category}`.toLowerCase()
  };
});

const searchCategoryLabels = {
  panels: 'Solar Panel',
  inverters: 'Inverter',
  batteries: 'Battery',
  accessories: 'Accessory'
};

function closeMobileNavigation() {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open menu');
  mobileMenu?.classList.remove('open');
  document.body.classList.remove('menu-open');
}

function openSearchResult(item, form) {
  document.querySelector(`.catalog-tab[data-target="${item.category}"]`)?.click();
  form.classList.remove('results-open');
  closeMobileNavigation();
  item.card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  window.setTimeout(() => item.card.click(), 260);
}

document.querySelectorAll('[data-site-search]').forEach((form) => {
  const input = form.querySelector('input[type="search"]');
  const resultsBox = form.querySelector('.site-search-results');
  let currentResults = [];

  function renderResults() {
    const query = input.value.trim().toLowerCase();
    form.classList.toggle('has-value', Boolean(query));
    resultsBox.replaceChildren();

    if (!query) {
      form.classList.remove('results-open');
      currentResults = [];
      return;
    }

    currentResults = searchableCards.filter((item) => item.searchText.includes(query)).slice(0, 8);
    form.classList.add('results-open');

    if (!currentResults.length) {
      const empty = document.createElement('p');
      empty.className = 'search-empty';
      empty.textContent = 'No matching product found. Try a brand, model, category or price.';
      resultsBox.append(empty);
      return;
    }

    currentResults.forEach((item) => {
      const button = document.createElement('button');
      button.className = 'search-result-item';
      button.type = 'button';
      button.setAttribute('role', 'option');
      button.innerHTML = `<img src="${item.image}" alt=""><span><strong>${item.name}</strong><small>${searchCategoryLabels[item.category] || 'Solar Product'}</small></span><b>${item.price}</b>`;
      button.addEventListener('click', () => openSearchResult(item, form));
      resultsBox.append(button);
    });
  }

  input.addEventListener('input', renderResults);
  input.addEventListener('focus', () => {
    if (input.value.trim()) renderResults();
  });
  form.addEventListener('reset', () => {
    window.setTimeout(() => {
      form.classList.remove('has-value', 'results-open');
      resultsBox.replaceChildren();
    }, 0);
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (currentResults[0]) openSearchResult(currentResults[0], form);
  });
});

document.addEventListener('click', (event) => {
  document.querySelectorAll('.site-search-form').forEach((form) => {
    if (!form.contains(event.target)) form.classList.remove('results-open');
  });
});

// AI-assisted solar requirement parser. It runs locally and provides an indicative starting point.
const aiForm = document.querySelector('#ai-input-form');
const aiQuestion = document.querySelector('#ai-question');
const aiConversation = document.querySelector('#ai-conversation');
const aiWhatsAppResult = document.querySelector('#ai-whatsapp-result');
const aiLiveDashboard = document.querySelector('#ai-live-dashboard');
const aiAnalysisState = document.querySelector('#ai-analysis-state');
const aiMetricSystem = document.querySelector('#ai-metric-system');
const aiMetricPanels = document.querySelector('#ai-metric-panels');
const aiMetricGeneration = document.querySelector('#ai-metric-generation');
const aiMetricBackup = document.querySelector('#ai-metric-backup');
let lastAIRecommendation = 'Please guide me about a suitable solar system.';

function nearestSystemSize(value) {
  const sizes = [3, 5, 6, 8, 10, 12, 15, 20, 25, 30];
  return sizes.find((size) => size >= value) || Math.ceil(value / 5) * 5;
}

function parseBill(text) {
  const lower = text.toLowerCase();
  const billMatch = lower.match(/(?:bill|rs\.?|pkr)[^\d]{0,16}([\d,.]+)\s*(k)?/i);
  if (billMatch) {
    const amount = Number(billMatch[1].replace(/,/g, ''));
    return billMatch[2] ? amount * 1000 : amount;
  }
  const values = [...lower.matchAll(/\b(\d[\d,]{3,})\b/g)].map((match) => Number(match[1].replace(/,/g, '')));
  return values.length ? Math.max(...values) : 50000;
}

function parseACCount(text) {
  const lower = text.toLowerCase();
  const numeric = lower.match(/(\d+)\s*(?:ac|acs|air conditioner)/);
  if (numeric) return Number(numeric[1]);
  const words = { one: 1, aik: 1, ek: 1, two: 2, do: 2, three: 3, teen: 3, four: 4, char: 4 };
  for (const [word, count] of Object.entries(words)) {
    if (new RegExp(`\\b${word}\\s+(?:ac|acs|air conditioner)`).test(lower)) return count;
  }
  return 0;
}

function getAIRecommendation(text) {
  const lower = text.toLowerCase();
  const bill = parseBill(text);
  const acCount = parseACCount(text);
  const needsBackup = /backup|battery|raat|night|load.?shedding|bijli band/.test(lower);
  const property = /shop|dukan|dukkan/.test(lower) ? 'shop' : /business|commercial|factory|office/.test(lower) ? 'business' : 'home';
  const explicitSize = lower.match(/(\d+(?:\.\d+)?)\s*kw/);

  let baseSize;
  if (bill <= 20000) baseSize = 3;
  else if (bill <= 45000) baseSize = 5;
  else if (bill <= 75000) baseSize = 8;
  else if (bill <= 110000) baseSize = 10;
  else if (bill <= 160000) baseSize = 15;
  else baseSize = 20;

  const loadSize = acCount ? 3 + acCount * 1.8 : 0;
  const requestedSize = explicitSize ? Number(explicitSize[1]) : Math.max(baseSize, loadSize);
  const systemSize = nearestSystemSize(requestedSize);
  const panelWattage = 585;
  const panels = Math.ceil((systemSize * 1000) / panelWattage);
  const battery = !needsBackup ? 'Optional — daytime solar focus' : systemSize <= 6 ? '5.12 kWh lithium starting point' : systemSize <= 10 ? '10.24 kWh lithium starting point' : '15 kWh+ storage after load assessment';
  const dailyGeneration = Math.round(systemSize * 4.2);
  const inverter = `${systemSize} kW class hybrid inverter`;

  const summary = `${property.charAt(0).toUpperCase() + property.slice(1)} · Approx. bill Rs. ${currency.format(bill)}${acCount ? ` · ${acCount} AC${acCount > 1 ? 's' : ''}` : ''}${needsBackup ? ' · Backup required' : ''}`;
  const whatsapp = `Assalam-o-Alaikum Salman Solar Energy, the website AI advisor suggested:\n${summary}\nSystem: ${systemSize} kW\nPanels: around ${panels} × ${panelWattage}W\nInverter: ${inverter}\nBattery: ${battery}\nEstimated daytime generation: about ${dailyGeneration} units/day.\nPlease verify my load and share current stock and final price.`;

  return { bill, property, acCount, needsBackup, systemSize, panels, panelWattage, battery, inverter, dailyGeneration, summary, whatsapp };
}

function addAIMessage(role, text, className = '') {
  const message = document.createElement('div');
  message.className = `ai-message ${role} ${className}`.trim();
  const badge = document.createElement('span');
  badge.textContent = role === 'user' ? 'YOU' : 'AI';
  const content = document.createElement('p');
  content.textContent = text;
  message.append(badge, content);
  aiConversation.append(message);
  aiConversation.scrollTop = aiConversation.scrollHeight;
  return { message, content };
}

function runAIAdvisor(prompt) {
  const cleanPrompt = prompt.trim();
  if (!cleanPrompt || !aiConversation) return;
  addAIMessage('user', cleanPrompt);
  aiQuestion.value = '';
  aiLiveDashboard?.classList.remove('has-result');
  aiLiveDashboard?.classList.add('analyzing');
  if (aiAnalysisState) aiAnalysisState.textContent = 'Analysing bill, load and backup';
  [aiMetricSystem, aiMetricPanels, aiMetricGeneration, aiMetricBackup].forEach((metric) => {
    if (metric) metric.textContent = '•••';
  });
  const typing = addAIMessage('assistant', '•••', 'typing').message;

  window.setTimeout(() => {
    typing.remove();
    const result = getAIRecommendation(cleanPrompt);
    const response = `Recommended starting point: ${result.systemSize} kW with around ${result.panels} × ${result.panelWattage}W panels and a ${result.inverter}. Battery: ${result.battery}. Expected daytime generation is approximately ${result.dailyGeneration} units per day.`;
    addAIMessage('assistant', response, 'recommendation');
    aiLiveDashboard?.classList.remove('analyzing');
    aiLiveDashboard?.classList.add('has-result');
    if (aiAnalysisState) aiAnalysisState.textContent = `${result.property.charAt(0).toUpperCase() + result.property.slice(1)} recommendation ready`;
    if (aiMetricSystem) aiMetricSystem.textContent = `${result.systemSize} kW`;
    if (aiMetricPanels) aiMetricPanels.textContent = `${result.panels} × ${result.panelWattage}W`;
    if (aiMetricGeneration) aiMetricGeneration.textContent = `${result.dailyGeneration} units/day`;
    if (aiMetricBackup) aiMetricBackup.textContent = result.needsBackup ? 'Battery required' : 'Daytime focus';
    lastAIRecommendation = result.whatsapp;
    aiWhatsAppResult.href = `https://wa.me/923006122109?text=${encodeURIComponent(lastAIRecommendation)}`;
  }, 650);
}

aiForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  runAIAdvisor(aiQuestion.value);
});

aiQuestion?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    aiForm?.requestSubmit();
  }
});

document.querySelectorAll('[data-ai-prompt]').forEach((button) => {
  button.addEventListener('click', () => runAIAdvisor(button.dataset.aiPrompt));
});

// Subtle scroll motion and a compact sticky header state.
const revealTargets = document.querySelectorAll('.section-head, .solar-tech-rail, .category-showcase-card, .catalog, .premium-service-card, .solar-care-head, .care-process article, .care-access-card, .estimate-intro, .calculator-card, .why-heading, .steps article, .project-filters, .project-card, .stats-grid article, .testimonial-viewport, .faq-intro, .faq-item, .branch-list article, .quote-copy, .quote-form, .ai-advisor-intro, .ai-advisor-card, .buy-now-copy, .buy-now-actions, .social-connect-inner');
revealTargets.forEach((element, index) => {
  element.classList.add('reveal');
  element.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`);
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -45px' });
  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add('reveal-visible'));
}

const professionalHeader = document.querySelector('.professional-header');
function updateHeaderState() {
  professionalHeader?.classList.toggle('header-scrolled', window.scrollY > 80);
}
window.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();

// Premium hero depth: subtle pointer tilt plus lightweight scroll parallax.
const frontBanner = document.querySelector('.front-banner');
const frontBannerMedia = document.querySelector('.front-banner-media');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (frontBanner && frontBannerMedia && !reduceMotion) {
  frontBanner.addEventListener('pointermove', (event) => {
    if (window.innerWidth < 900) return;
    const rect = frontBanner.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    frontBannerMedia.style.transform = `perspective(1200px) rotateX(${(-y * 2.2).toFixed(2)}deg) rotateY(${(x * 2.5).toFixed(2)}deg) translateY(${Math.max(-8, rect.top * -0.025).toFixed(1)}px)`;
  });
  frontBanner.addEventListener('pointerleave', () => {
    frontBannerMedia.style.transform = '';
  });
}

// Project gallery filtering.
const projectFilterButtons = document.querySelectorAll('[data-project-filter]');
const projectCards = document.querySelectorAll('[data-project-category]');
projectFilterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.projectFilter;
    projectFilterButtons.forEach((item) => item.classList.toggle('active', item === button));
    projectCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.projectCategory === filter;
      card.classList.toggle('filtered-out', !show);
      if (show) {
        card.animate?.([{ opacity: 0, transform: 'scale(.96)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 320, easing: 'ease-out' });
      }
    });
  });
});

// Scroll-triggered statistics counters.
const counterElements = document.querySelectorAll('[data-counter]');
function animateCounter(element) {
  const target = Number(element.dataset.counter);
  const decimals = Number(element.dataset.decimals || 0);
  const suffix = element.dataset.suffix || '';
  const pad = Number(element.dataset.pad || 0);
  const start = performance.now();
  const duration = 1250;

  function frame(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    let display = decimals ? value.toFixed(decimals) : String(Math.round(value));
    if (pad) display = display.padStart(pad, '0');
    element.textContent = `${display}${suffix}`;
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

if ('IntersectionObserver' in window && !reduceMotion) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.45 });
  counterElements.forEach((counter) => counterObserver.observe(counter));
} else {
  counterElements.forEach((counter) => {
    const value = Number(counter.dataset.counter);
    const decimals = Number(counter.dataset.decimals || 0);
    const suffix = counter.dataset.suffix || '';
    const pad = Number(counter.dataset.pad || 0);
    let display = decimals ? value.toFixed(decimals) : String(value);
    if (pad) display = display.padStart(pad, '0');
    counter.textContent = `${display}${suffix}`;
  });
}

// Testimonials carousel with controls, dots and gentle auto-advance.
const testimonialTrack = document.querySelector('#testimonial-track');
const testimonialSlides = testimonialTrack ? [...testimonialTrack.children] : [];
const testimonialDots = [...document.querySelectorAll('[data-testimonial-slide]')];
const testimonialViewport = document.querySelector('.testimonial-viewport');
let testimonialIndex = 0;
let testimonialTimer;

function showTestimonial(index) {
  if (!testimonialTrack || !testimonialSlides.length) return;
  testimonialIndex = (index + testimonialSlides.length) % testimonialSlides.length;
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
  testimonialSlides.forEach((slide, slideIndex) => slide.setAttribute('aria-hidden', String(slideIndex !== testimonialIndex)));
  testimonialDots.forEach((dot, dotIndex) => {
    const active = dotIndex === testimonialIndex;
    dot.classList.toggle('active', active);
    dot.setAttribute('aria-current', active ? 'true' : 'false');
  });
}

function startTestimonialTimer() {
  window.clearInterval(testimonialTimer);
  if (!reduceMotion && !document.hidden) testimonialTimer = window.setInterval(() => showTestimonial(testimonialIndex + 1), 6000);
}

document.querySelector('#testimonial-prev')?.addEventListener('click', () => { showTestimonial(testimonialIndex - 1); startTestimonialTimer(); });
document.querySelector('#testimonial-next')?.addEventListener('click', () => { showTestimonial(testimonialIndex + 1); startTestimonialTimer(); });
testimonialDots.forEach((dot) => dot.addEventListener('click', () => { showTestimonial(Number(dot.dataset.testimonialSlide)); startTestimonialTimer(); }));
if (testimonialViewport) {
  testimonialViewport.addEventListener('mouseenter', () => window.clearInterval(testimonialTimer));
  testimonialViewport.addEventListener('mouseleave', startTestimonialTimer);
  testimonialViewport.addEventListener('focusin', () => window.clearInterval(testimonialTimer));
  testimonialViewport.addEventListener('focusout', (event) => {
    if (!testimonialViewport.contains(event.relatedTarget)) startTestimonialTimer();
  });
  let touchStartX = 0;
  testimonialViewport.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
  testimonialViewport.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) < 48) return;
    showTestimonial(testimonialIndex + (distance < 0 ? 1 : -1));
    startTestimonialTimer();
  }, { passive: true });
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) window.clearInterval(testimonialTimer);
  else startTestimonialTimer();
});
showTestimonial(0);
startTestimonialTimer();

// Smooth, accessible FAQ accordion.
document.querySelectorAll('.faq-item > button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const willOpen = !item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      openItem.classList.remove('open');
      openItem.querySelector('button')?.setAttribute('aria-expanded', 'false');
    });
    item.classList.toggle('open', willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
  });
});

// Active navigation state follows the current section.
const sectionLinks = [...document.querySelectorAll('.professional-nav > a[href^="#"], .mobile-nav-links a[href^="#"]')];
const linkedSections = [...new Set(sectionLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean))];
if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id || 'top';
      sectionLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    });
  }, { rootMargin: '-35% 0px -55%', threshold: 0 });
  linkedSections.forEach((section) => navObserver.observe(section));
}

document.querySelector('#year').textContent = new Date().getFullYear();
