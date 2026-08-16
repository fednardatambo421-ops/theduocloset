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
