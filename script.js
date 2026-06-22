// ========== 1. زر الوضع الليلي + صوت المطر ==========
const btn = document.getElementById('themeBtn');
const rainSound = new Audio('rain.mp3');
rainSound.loop = true;
rainSound.volume = 0.2;

btn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if(document.body.classList.contains('dark')) {
    btn.textContent = '☀️ الوضع النهاري';
    rainSound.play().catch(() => {});
  } else {
    btn.textContent = '🌙 الوضع الليلي';
    rainSound.pause();
    rainSound.currentTime = 0;
  }
});

// ========== 2. صوت الطقطقة للكتابة ==========
const typeSound = new Audio('type.mp3');
typeSound.volume = 0.15; // صوت خفيف

function playTypeSound() {
  typeSound.currentTime = 0;
  typeSound.play().catch(() => {});
}

// ========== 3. تايب رايتر العنوان h1 ==========
const h1 = document.querySelector('h1');
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

// ========== 4. تايب رايتر الكروت مع السكرول + سرعة مختلفة ==========
const cardTexts = [
  {text: "أنا بلقاسم طريفي، مبرمج مبتدئ من الشلف، الجزائر. أحب البرمجة والقراءة وبناء مشاريع مفيدة 💻", speed: 30}, // سريع
  {text: "", speed: 50}, // الكرت الثاني قائمة فاضي
  {text: "قريباً... أول مشروع لي على GitHub 🚀", speed: 70}, // بطيء
  {text: "اضغط للمزيد وخلينا نتواصل 📧", speed: 45} // وسط
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
      const index = Array.from(document.querySelectorAll('.cards.card')).indexOf(entry.target);
      if(span && cardTexts[index].text &&!span.classList.contains('typed')) {
        span.classList.add('typed');
        setTimeout(() => typeCardText(span, cardTexts[index].text, cardTexts[index].speed), 300);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.cards.card').forEach(card => {
  observer.observe(card);
});

// ========== 5. المطر البصري ==========
function createRain() {
  const rain = document.getElementById('rain');
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

// ========== 6. البوب اب + عداد الزيارات ==========
const popupData = {
 0: {title: "معلومات شخصية", text: "أنا بلقاسم طريفي من الشلف، الجزائر. مبرمج مبتدئ أحب أتعلم كل يوم وأبني مشاريع تفيد الناس 💻"},
 1: {title: "هواياتي", text: "أحب القراءة والكتابة، ودراسة العلوم الإسلامية، والبرمجة. وأكيد استكشاف ثقافات مختلفة 🌍"},
 2: {title: "مشاريعي", text: "لسه في البداية لكن عندي شغف كبير. قريباً بتلاقي مشاريعي على GitHub 🚀"},
 3: {title: "تواصل معي", text: "اضغط على أيقونات السوشيال فوق أو استخدم الفورم تحت. أرد عليك بأسرع وقت 📧"}
};

document.querySelectorAll('.cards.card').forEach((card, index) => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const titleEl = document.getElementById('popup-title');
    const textEl = document.getElementById('popup-text');
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
document.getElementById('popup').addEventListener('click', (e) => {
  if(e.target.id === 'popup') closePopup();
});

fetch('https://api.countapi.xyz/hit/trifibelkacem.github.io/visits')
.then(res => res.json())
.then(data => {
    document.getElementById('visits').textContent = data.value;
  });

// ========== 7. تشغيل الكل لما الصفحة تحمل ==========
window.onload = () => {
  typeWriter();
  createRain();
};