// زر الوضع الليلي + صوت المطر
const btn = document.getElementById('themeBtn');
const rainSound = new Audio('rain.mp3');
rainSound.loop = true;
rainSound.volume = 0.2; // صوت خفيف 20%

btn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  if(document.body.classList.contains('dark')) {
    btn.textContent = '☀️ الوضع النهاري';
    rainSound.play(); // شغل المطر
  } else {
    btn.textContent = '🌙 الوضع الليلي';
    rainSound.pause(); // وقف المطر
    rainSound.currentTime = 0;
  }
});

// كتابة الاسم حرف
const h1 = document.querySelector('h1');
const text = h1.textContent;
h1.textContent = '';

let i = 0;
function typeWriter() {
  if(i < text.length) {
    h1.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}

// المطر البصري
function createRain() {
  const rain = document.createElement('div');
  rain.className = 'rain';
  document.body.appendChild(rain);

  function makeDrop() {
    const drop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = 0.5 + Math.random() * 0.5 + 's';
    drop.style.opacity = Math.random();
    rain.appendChild(drop);
    setTimeout(() => drop.remove(), 1000);
  }
  setInterval(makeDrop, 50);
}

window.onload = () => {
  typeWriter();
  createRain();
};