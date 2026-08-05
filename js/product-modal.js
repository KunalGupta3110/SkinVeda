// Product Data
const productDatabase = {
  'Herbal Hair Strength Shampoo': {
    category: 'Hair Care',
    images: ['assets/images/herbal-hair-strength-shampoo.jpeg', 'assets/images/pure-aloe-vera-shampoo.jpeg', 'assets/images/handmade-soap.jpeg'],
    description: 'A handcrafted Ayurvedic shampoo enriched with over 30 natural herbs to help strengthen hair, reduce hair fall and nourish the scalp naturally. This premium blend combines traditional wisdom with modern hair care science, delivering visible results with every wash.',
    ingredients: ['Amla', 'Shikakai', 'Bhringraj', 'Hibiscus', 'Jatamasi', 'Neem'],
    benefits: ['Reduces Hair Fall', 'Strengthens Hair', 'Nourishes Scalp', 'Adds Shine', 'Promotes Growth', 'Chemical Free']
  },
  'Pure Aloe Vera Shampoo': {
    category: 'Hair Care',
    images: ['assets/images/pure-aloe-vera-shampoo.jpeg', 'assets/images/herbal-hair-strength-shampoo.jpeg', 'assets/images/handmade-soap.jpeg'],
    description: 'A gentle Aloe Vera shampoo that deeply hydrates, softens and nourishes hair while supporting healthy growth. Infused with pure aloe vera extract and natural botanical oils, perfect for daily use.',
    ingredients: ['Aloe Vera', 'Coconut Oil', 'Vitamin E', 'Jojoba Oil', 'Shea Butter'],
    benefits: ['Deep Hydration', 'Softens Hair', 'Reduces Frizz', 'Promotes Shine', 'Scalp Healing', 'Daily Care']
  },
  'Herbal Soap': {
    category: 'Handmade Soaps',
    images: ['assets/images/herbal-soap.jpeg', 'assets/images/grape-shape-soap.jpeg', 'assets/images/handmade-soap.jpeg'],
    description: 'Handmade herbal soap enriched with Neem, Aloe Vera and Coconut Oil for gentle everyday cleansing. This traditional Ayurvedic formulation combines nature\'s most powerful botanicals.',
    ingredients: ['Neem', 'Aloe Vera', 'Coconut Oil', 'Tulsi', 'Turmeric', 'Sesame Oil'],
    benefits: ['Gentle Cleansing', 'Antibacterial', 'Nourishing', 'Natural Glow', 'Skin Soothing', 'Eco-Friendly']
  },
  'Grape Shape Soap': {
    category: 'Handmade Soaps',
    images: ['assets/images/grape-shape-soap.jpeg', 'assets/images/herbal-soap.jpeg', 'assets/images/handmade-soap.jpeg'],
    description: 'A refreshing handmade soap designed to cleanse, moisturise and leave skin feeling fresh and soft. With its beautiful natural fragrance.',
    ingredients: ['Botanical Extracts', 'Grape Seed Oil', 'Coconut Oil', 'Glycerin', 'Rose Water'],
    benefits: ['Moisturising', 'Refreshing', 'Antioxidant Rich', 'Gentle Formula', 'Natural Scent', 'Skin Brightening']
  },
  'Handmade Soap': {
    category: 'Handmade Soaps',
    images: ['assets/images/handmade-soap.jpeg', 'assets/images/herbal-soap.jpeg', 'assets/images/grape-shape-soap.jpeg'],
    description: 'A handcrafted natural soap inspired by Ayurvedic care for clean, healthy and refreshed skin. Suitable for all skin types.',
    ingredients: ['Ayurvedic Herbs', 'Coconut Oil', 'Sesame Oil', 'Honey', 'Shea Butter', 'Essential Oils'],
    benefits: ['Daily Cleansing', 'Balancing', 'Moisturising', 'Natural Care', 'All Skin Types', 'Aromatherapy']
  },
  'Ubtan': {
    category: 'Skincare',
    images: ['assets/ubtan.png', 'assets/images/herbal-soap.jpeg', 'assets/images/handmade-soap.jpeg'],
    description: 'A luxurious Ayurvedic ubtan that gently exfoliates, brightens, and nourishes the skin with time-honoured botanicals and natural powders.',
    ingredients: ['Turmeric', 'Sandalwood', 'Gram Flour', 'Multani Mitti', 'Rose Petals', 'Almond Powder'],
    benefits: ['Gentle Exfoliation', 'Brightens Skin', 'Reduces Dullness', 'Anti-Aging', 'Natural Glow', 'Even Tone']
  },
  'Kesar Chandan Soap': {
    category: 'Handmade Soaps',
    images: ['assets/images/kesarchandan.png', 'assets/images/herbal-soap.jpeg', 'assets/images/handmade-soap.jpeg'],
    description: 'A luxurious handmade soap enriched with saffron (Kesar) and sandalwood (Chandan), offering deep nourishment, natural glow, and skin brightening benefits.',
    ingredients: ['Saffron', 'Sandalwood', 'Coconut Oil', 'Shea Butter', 'Rose Water', 'Turmeric'],
    benefits: ['Brightens Skin', 'Anti-Aging', 'Soothing', 'Radiance Boost', 'Even Tone', 'Luxury Care']
  },
  'Neem Soap': {
    category: 'Handmade Soaps',
    images: ['assets/images/neem.png', 'assets/images/herbal-soap.jpeg', 'assets/images/handmade-soap.jpeg'],
    description: 'A powerful handmade soap infused with neem extract, specifically formulated to cleanse deeply, purify the skin, and combat common skin concerns.',
    ingredients: ['Neem Extract', 'Neem Oil', 'Turmeric', 'Tea Tree Oil', 'Coconut Oil', 'Aloe Vera'],
    benefits: ['Deep Cleansing', 'Purifying', 'Antibacterial', 'Acne Control', 'Anti-Inflammatory', 'Clear Skin']
  }
};

// DOM Elements
const modal = document.getElementById('productModal');
const backdrop = document.getElementById('productBackdrop');
const closeBtn = document.getElementById('modalClose');
const productCards = document.querySelectorAll('.product-card');

function switchImage(imagePath, index) {
  document.getElementById('modalMainImage').src = imagePath;

  const thumbs = document.querySelectorAll('.modal-thumb');
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

// Initialize Modal
function initializeModal(productName) {
  const product = productDatabase[productName];
  if (!product) return;

  // Set images
  document.getElementById('modalMainImage').src = product.images[0];
  const gallery = document.getElementById('modalGallery');
  gallery.innerHTML = '';

  product.images.forEach((image, index) => {
    const thumb = document.createElement('div');
    thumb.className = `modal-thumb ${index === 0 ? 'active' : ''}`;
    thumb.innerHTML = `<img src="${image}" alt="${productName} view ${index + 1}" />`;
    thumb.addEventListener('click', () => switchImage(image, index));
    gallery.appendChild(thumb);
  });

  // Set details
  document.getElementById('modalProductName').textContent = productName;
  document.getElementById('modalCategory').textContent = product.category;
  document.getElementById('modalDescription').textContent = product.description;

  // Set ingredients
  const ingredientsContainer = document.getElementById('modalIngredients');
  ingredientsContainer.innerHTML = '';
  product.ingredients.forEach((ing) => {
    const chip = document.createElement('div');
    chip.className = 'ingredient-chip';
    chip.textContent = ing;
    ingredientsContainer.appendChild(chip);
  });

  // Set benefits
  const benefitsContainer = document.getElementById('modalBenefits');
  benefitsContainer.innerHTML = '';
  product.benefits.forEach((benefit) => {
    const item = document.createElement('div');
    item.className = 'benefit-item';
    item.textContent = benefit;
    benefitsContainer.appendChild(item);
  });

  // Set WhatsApp button
  document.getElementById('modalWhatsAppBtn').onclick = () => {
    const message = `Hi SkinVeda, I'm interested in ${productName}. Please provide more details and pricing.`;
    const url = `https://wa.me/919355293311?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };
}

function openModal(productName) {
  initializeModal(productName);
  modal.classList.add('active');
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

// Event Listeners
productCards.forEach((card) => {
  card.addEventListener('click', () => {
    const productName = card.querySelector('h3').textContent;
    openModal(productName);
  });
});

closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

modal.addEventListener('click', (e) => {
  e.stopPropagation();
});
