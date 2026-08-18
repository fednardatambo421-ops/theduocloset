const hero = document.querySelector('.hero');
const stage = document.querySelector('.product-stage');
const copy = document.querySelector('.hero-copy');
const cta = document.querySelector('.magnetic');

window.addEventListener('pointermove', (event) => {
  const x = event.clientX / window.innerWidth - .5;
  const y = event.clientY / window.innerHeight - .5;
  stage.style.transform = `translateY(calc(-47% + ${y * -10}px)) rotate(${x * 1.4}deg)`;
  hero.style.setProperty('--pointer-x', `${x * 12}px`);
  hero.style.setProperty('--pointer-y', `${y * 12}px`);
});

cta.addEventListener('pointermove', (event) => {
  const rect = cta.getBoundingClientRect();
  cta.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .14}px, ${(event.clientY - rect.top - rect.height / 2) * .18}px)`;
});
cta.addEventListener('pointerleave', () => cta.style.transform = 'translate(0,0)');

document.querySelector('.sound').addEventListener('click', (event) => {
  event.currentTarget.classList.toggle('is-muted');
  event.currentTarget.lastChild.nodeValue = event.currentTarget.classList.contains('is-muted') ? ' Sound off' : ' Sound on';
});

const craft = document.querySelector('.craft');
const craftShoe = document.querySelector('.craft-product img');
const pillars = [...document.querySelectorAll('.pillar')];

window.addEventListener('scroll', () => {
  const rect = craft.getBoundingClientRect();
  const distance = Math.max(0, Math.min(1, -rect.top / (craft.offsetHeight - window.innerHeight)));
  craftShoe.style.transform = `scale(${.88 + distance * .2}) rotateY(${distance * 360}deg) rotateZ(${distance * -4}deg)`;
  craftShoe.style.filter = `drop-shadow(0 ${40 - distance * 13}px ${30 + distance * 10}px rgba(0,0,0,.82)) brightness(${.86 + distance * .25})`;
  pillars.forEach((pillar, index) => pillar.classList.toggle('active', Math.min(2, Math.floor(distance * 3)) === index));
}, { passive: true });

document.querySelectorAll('[data-card]').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    card.querySelector('.card-media img').style.transform = `rotate(${x * 7 - 8}deg) translate(${x * 12}px, ${y * 8}px) scale(1.25)`;
  });
  card.addEventListener('pointerleave', () => card.querySelector('.card-media img').style.transform = '');
});

const bag = [];
const cart = document.querySelector('.cart');
const backdrop = document.querySelector('.cart-backdrop');
const cartItems = document.querySelector('.cart-items');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');
const bagCount = document.querySelector('.bag-toggle span');
const checkoutButton = document.querySelector('.checkout-button');
const money = (value) => `KES ${value.toLocaleString('en-KE')}`;

function renderBag() {
  const total = bag.reduce((sum, item) => sum + item.price, 0);
  bagCount.textContent = bag.length;
  cartTotal.textContent = money(total);
  cartEmpty.hidden = bag.length > 0;
  cartItems.innerHTML = bag.map((item) => `<div class="cart-item"><div class="cart-thumb"></div><div><p>${item.name}</p><span>${money(item.price)}</span></div></div>`).join('');
  checkoutButton.disabled = bag.length === 0;
}
function setCart(open) { cart.classList.toggle('open', open); backdrop.classList.toggle('open', open); cart.setAttribute('aria-hidden', String(!open)); }
document.querySelector('.bag-toggle').addEventListener('click', () => setCart(true));
document.querySelector('.cart-close').addEventListener('click', () => setCart(false));
backdrop.addEventListener('click', () => setCart(false));
document.querySelectorAll('.bag-button').forEach((button) => button.addEventListener('click', () => {
  bag.push({ name: button.dataset.product, price: Number(button.dataset.price) });
  renderBag(); setCart(true);
}));
document.querySelector('.checkout-button').addEventListener('click', () => {
  setCart(false);
  const total = bag.reduce((sum, item) => sum + item.price, 0);
  document.querySelector('.checkout-summary').textContent = `${bag.length} piece${bag.length > 1 ? 's' : ''} selected — ${money(total)}.`;
  document.querySelector('.checkout').classList.add('open');
  document.querySelector('.checkout').setAttribute('aria-hidden', 'false');
});
document.querySelector('.checkout-close').addEventListener('click', () => document.querySelector('.checkout').classList.remove('open'));
document.querySelector('.checkout-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const total = bag.reduce((sum, item) => sum + item.price, 0);
  const order = `TDC-${Math.floor(100000 + Math.random() * 900000)}`;
  document.querySelector('.checkout').classList.remove('open');
  document.querySelector('.receipt-message').textContent = `Thank you, ${data.get('name')}. Your order has been reserved and our concierge will confirm delivery.`;
  document.querySelector('.receipt-details').innerHTML = `<div><span>Order</span><strong>${order}</strong></div><div><span>Items</span><strong>${bag.length}</strong></div><div><span>Total</span><strong>${money(total)}</strong></div><div><span>Delivery</span><strong>${data.get('address')}</strong></div>`;
  document.querySelector('.receipt').classList.add('open');
  document.querySelector('.receipt').setAttribute('aria-hidden', 'false');
  bag.length = 0; renderBag(); event.currentTarget.reset();
});
document.querySelector('.receipt-close').addEventListener('click', () => document.querySelector('.receipt').classList.remove('open'));

document.querySelectorAll('.quick-add').forEach((button, index) => button.addEventListener('click', () => {
  const choices = [{ name: 'Midnight Gold', price: 24500 }, { name: 'Obsidian One', price: 21800 }, { name: 'Onyx Edition', price: 29000 }];
  bag.push(choices[index]); renderBag(); setCart(true);
}));
document.querySelectorAll('.heart').forEach((button) => button.addEventListener('click', () => { const saved = button.classList.toggle('saved'); button.textContent = saved ? '♥' : '♡'; }));
const filterButton = document.querySelector('.filter-button');
const filterOptions = document.querySelector('.filter-options');
filterButton.addEventListener('click', () => { const open = filterOptions.hidden; filterOptions.hidden = !open; filterButton.setAttribute('aria-expanded', String(open)); });
document.querySelectorAll('.filter-options button').forEach((button) => button.addEventListener('click', () => { filterButton.firstChild.nodeValue = `${button.textContent} `; filterOptions.hidden = true; filterButton.setAttribute('aria-expanded', 'false'); }));

const menu = document.querySelector('.site-menu');
const menuButton = document.querySelector('.menu');
const setMenu = (open) => { menu.classList.toggle('open', open); menu.setAttribute('aria-hidden', String(!open)); menuButton.setAttribute('aria-expanded', String(open)); };
menuButton.addEventListener('click', () => setMenu(true));
document.querySelector('.menu-close').addEventListener('click', () => setMenu(false));
document.querySelectorAll('.site-menu a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

const ticketModal = document.querySelector('.ticket-modal');
const setTicket = (open) => { ticketModal.classList.toggle('open', open); ticketModal.setAttribute('aria-hidden', String(!open)); };
document.querySelector('.ticket-float').addEventListener('click', () => setTicket(true));
document.querySelector('.ticket-close').addEventListener('click', () => setTicket(false));
document.querySelector('.ticket-form').addEventListener('submit', (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const name = form.get('ticket-name'); const message = form.get('ticket-message'); const reference = `TDC-${Math.floor(10000 + Math.random() * 90000)}`; document.querySelector('.ticket-success').hidden = false; document.querySelector('.ticket-success').textContent = `Thank you, ${name}. Ticket ${reference} is ready. Use WhatsApp below for an immediate response.`; document.querySelector('.whatsapp-float').href = `https://wa.me/254715067628?text=${encodeURIComponent(`Hello The Duo Closet, I have ticket ${reference}. Name: ${name}. Request: ${message}`)}`; event.currentTarget.reset(); });
