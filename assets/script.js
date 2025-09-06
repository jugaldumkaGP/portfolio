// Mobile nav toggle
const btn = document.querySelector('.nav-toggle');
const list = document.querySelector('#nav-menu');
if (btn && list) {
  btn.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}

// Year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
