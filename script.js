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
/// بيانات كل كرت
const popupData = {
 0: {title: "مشاريعي", text: "هنا بعرض كل المشاريع اللي اشتغلت عليها. قريباً رابط GitHub لكل مشروع 🚀"},
 1: {title: "مهاراتي", text: "HTML, CSS, JavaScript, Python. ولسه أتعلم أشياء جديدة كل يوم 💻"},
 2: {title: "تواصل معي", text: "تقدر تتواصل عبر GitHub أو تنتظر أضيف البريد قريباً 📧"},
 3: {title: "نبذة عني", text: "أنا بلقاسم طريفي، مطور مبتدئ شغوف ببناء أشياء مفيدة على الويب ✨"}
};

// لما تضغط على الكرت
document.querySelectorAll('.card').forEach((card, index) => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    document.getElementById('popup-title').textContent = popupData[index].title;
    document.getElementById('popup-text').textContent = popupData[index].text;
    document.getElementById('popup').style.display = 'flex';
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