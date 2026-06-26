// ========== 1. زر الوضع الليلي + صوت المطر ==========
const btn = document.getElementById('themeBtn');
const rainSound = new Audio('rain.mp3');
rainSound.loop = true;
rainSound.volume = 0.2;

// يتذكر الوضع الليلي
if(localStorage.getItem('dark') === 'true') {
  document.body.classList.add('dark');
  btn.textContent = '☀️ الوضع النهاري';
}

btn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if(document.body.classList.contains('dark')) {
    btn.textContent = '☀️ الوضع النهاري';
    localStorage.setItem('dark', 'true');
    rainSound.play().catch(() => {});
  } else {
    btn.textContent = '🌙 الوضع الليلي';
    localStorage.setItem('dark', 'false');
    rainSound.pause();
    rainSound.currentTime = 0;
  }
});

// ========== 2. صوت الطقطقة ==========
const typeSound = new Audio('type.mp3');
typeSound.volume = 0.15;

function playTypeSound() {
  typeSound.currentTime = 0;
  typeSound.play().catch(() => {});
}

// ========== 3. تايب رايتر العنوان h1 ==========
const h1 = document.querySelector('.hero h1');
if(h1) {
  const nameText = h1.textContent;
  h1.textContent = '';
  let i = 0;
  function typeWriter() {
    if(i < nameText.length) {
      h1.textContent += nameText.charAt(i);
      playTypeSound();
      i++;
      setTimeout(typeWriter, 80);
    }
  }
  window.onload = () => typeWriter();
}

// ========== 4. تايب رايتر الكروت ==========
const cardTexts = [
  {text: "البرمجة للمبتدئين. تشمل البرمجة والقراءة وبناء مشاريع مفيدة 💻", speed: 30},
  {text: "", speed: 50},
  {text: "قريباً... أول مشروع لي على GitHub 🚀", speed: 70},
  {text: "اضغط للمزيد وخلينا نتواصل 📧", speed: 45}
];

function typeCardText(element, text, speed) {
  let j = 0;
  element.textContent = '';
  function typing() {
    if(j < text.length) {
      element.textContent += text.charAt(j);
      playTypeSound();
      j++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const span = entry.target.querySelector('.type-text');
      const index = Array.from(document.querySelectorAll('.card')).indexOf(entry.target);
      if(span && cardTexts[index].text &&!span.classList.contains('typed')) {
        span.classList.add('typed');
        setTimeout(() => typeCardText(span, cardTexts[index].text, cardTexts[index].speed), 300);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.card').forEach(card => {
  observer.observe(card);
});

// ========== 5. المطر البصري 50 قطرة بس ==========
function createRain() {
  if(!document.body.classList.contains('dark')) return;
  const rain = document.getElementById('rain');
  rain.innerHTML = '';
  for(let i=0; i<50; i++) {
    const drop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = 0.5 + Math.random() * 0.5 + 's';
    drop.style.opacity = Math.random();
    rain.appendChild(drop);
  }
}

btn.addEventListener('click', () => {
  setTimeout(createRain, 100);
});

// ========== 6. البوب اب ==========
const popupData = {
 0: {title: "معلومات شخصية", text: "البرمجة للمبتدئين، تبني مواقع وتطبيقات تخدم الناس وتنشر كل يوم شي جديد."},
 1: {title: "هواياتي", text: "مجال القراءة والكتابة، ودراسة العلوم الإسلامية، والبرمجة. وأكيد استكشاف ثقافات مختلفة 🌍"},
 2: {title: "مشاريعي", text: "لسه في البداية لكن يوجد شغف كبير. قريباً مشاريع على GitHub 🚀"},
 3: {title: "تواصل معنا", text: "اضغط على أيقونات السوشيال فوق أو استخدم الفورم تحت. أرد عليك بأسرع وقت 📧"}
};

document.querySelectorAll('.card').forEach((card, index) => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const titleEl = document.getElementById('popup-title');
    const textEl = document.getElementById('popup-text');
    if(!titleEl) return;
    titleEl.textContent = popupData[index].title;
    textEl.textContent = '';
    document.getElementById('popup').style.display = 'flex';
    let k = 0;
    function typePopup() {
      if(k < popupData[index].text.length) {
        textEl.textContent += popupData[index].text.charAt(k);
        playTypeSound();
        k++;
        setTimeout(typePopup, 40);
      }
    }
    typePopup();
  });
});

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}
document.getElementById('popup')?.addEventListener('click', (e) => {
  if(e.target.id === 'popup') closePopup();
});
// ===== حركة الفوتر عند السكرول =====
const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });

const footer = document.querySelector('footer');
if(footer) footerObserver.observe(footer);