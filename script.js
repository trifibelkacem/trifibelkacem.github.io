// زر الوضع الليلي + صوت المطر
const btn = document.getElementById('themeBtn');
const rainSound = new Audio('rain.mp3');
rainSound.loop = true;
rainSound.volume = 0.2; // صوت خفيف 20%

btn.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if(document.body.classList.contains('dark')) {
    btn.textContent = '☀️ الوضع النهاري';
    rainSound.play().catch(() => {}); // شغل المطر - catch عشان ما يطلع خطأ
  } else {
    btn.textContent = '🌙 الوضع الليلي';
    rainSound.pause();
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

// المطر البصري - نستخدم #rain اللي في HTML
function createRain() {
  const rain = document.getElementById('rain'); // بدل createElement

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

const popupData = {
 0: {title: "معلومات شخصية", text: "أنا بلقاسم طريفي من الشلف، الجزائر. مبرمج مبتدئ أحب أتعلم كل يوم وأبني مشاريع تفيد الناس 💻"},
 1: {title: "هواياتي", text: "أحب القراءة والكتابة، ودراسة العلوم الإسلامية، والبرمجة. وأكيد استكشاف ثقافات مختلفة 🌍"},
 2: {title: "مشاريعي", text: "لسه في البداية لكن عندي شغف كبير. قريباً بتلاقي مشاريعي على GitHub 🚀"},
 3: {title: "تواصل معي", text: "اضغط على أيقونات السوشيال فوق أو استخدم الفورم تحت. أرد عليك بأسرع وقت 📧"}
};

// لما تضغط على الكرت - مع تايب رايتر
document.querySelectorAll('.cards .card').forEach((card, index) => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const titleEl = document.getElementById('popup-title');
    const textEl = document.getElementById('popup-text');

    titleEl.textContent = popupData[index].title;
    textEl.textContent = ''; // نفرغ النص أول

    document.getElementById('popup').style.display = 'flex';

    // تايب رايتر للنص
    const text = popupData[index].text;
    let i = 0;
    function typePopup() {
      if(i < text.length) {
        textEl.textContent += text.charAt(i);
        i++;
        setTimeout(typePopup, 40); // 40ms = سرعة الكتابة
      }
    }
    typePopup();
  });
});

// إغلاق النافذة
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

// إغلاق لو ضغطت خارج النافذة
document.getElementById('popup').addEventListener('click', (e) => {
  if(e.target.id === 'popup') closePopup();
});

// عداد الزيارات
fetch('https://api.countapi.xyz/hit/trifibelkacem.github.io/visits')
 .then(res => res.json())
 .then(data => {
    document.getElementById('visits').textContent = data.value;
  });
  
   // تايب رايتر يشتغل مع السكرول
const cardTexts = [
  "أنا بلقاسم طريفي، مبرمج مبتدئ من الشلف، الجزائر. أحب البرمجة والقراءة وبناء مشاريع مفيدة 💻",
  "", // الكرت الثاني قائمة
  "قريباً... أول مشروع لي على GitHub 🚀",
  "اضغط للمزيد وخلينا نتواصل 📧"
];

function typeCardText(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  function typing() {
    if(i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// نراقب الكروت متى تدخل الشاشة
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const span = entry.target.querySelector('.type-text');
      const index = Array.from(document.querySelectorAll('.cards .card')).indexOf(entry.target);

      if(span && cardTexts[index] &&!span.classList.contains('typed')) {
        span.classList.add('typed'); // عشان ما يعيد الكتابة
        setTimeout(() => typeCardText(span, cardTexts[index], 45), 300);
      }
    }
  });
}, { threshold: 0.5 }); // 50% من الكرت لازم يبان

// نربط المراقب بكل كرت
document.querySelectorAll('.cards .card').forEach(card => {
  observer.observe(card);
});