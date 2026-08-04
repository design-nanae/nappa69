// グローバルナビゲーション
const globalNavBtn = document.querySelector('.l-header__navBtn');
const globalNavCloseBtn = document.querySelector('.l-header__navClose');


//ローディング画面
window.addEventListener('load', () => {
  const loader = document.getElementById('loading');

  if (sessionStorage.getItem('visited')) {
    loader.remove();
    startSlider();
    return;
  }

  sessionStorage.setItem('visited', 'true');

  setTimeout(() => {
    loader.classList.add('fadeout');

    // 👇ここでスタート
    startSlider();

  }, 2000);

  setTimeout(() => {
    loader.remove();
  }, 2600);
});

//クリックしたらis-openのクラスをつける
globalNavBtn.addEventListener('click',()=>{
    document.body.classList.add('is-open');
});

//クリックしたらis-openのクラスをはずす
globalNavCloseBtn.addEventListener('click',()=>{
    document.body.classList.remove('is-open');
});
//リンククリックしたら、解除する
document.querySelectorAll('.l-header a').forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('is-open');
  });
});



//ベクターを動かすアニメーション
const lines = document.querySelectorAll('.line');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
},{
  rootMargin: "-200px 0px"
});

// すべてのlineを監視
lines.forEach(line => {
  observer.observe(line);
});

//セクションタイトルのアニメーション
const targets = document.querySelectorAll('.c-sectionTitle');

window.addEventListener('scroll', function() {

  targets.forEach(function(target){

    const position = target.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if(position < screenHeight - 100){
      target.classList.add('active');
    }

  });

});


//コンセプト文字の動き
document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('.p-aboutus__title');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        target.classList.add('active');
        observer.unobserve(entry.target); // 一度だけアニメーション
      }
    });
  }, { threshold: 0.9 }); // 画面に90％入ったら発火

  observer.observe(target);
});


//FAQの開閉のアニメーション
//FAQの開閉ボタンをすべて取得
const faqBtns = document.querySelectorAll('.p-faq-openclose');

// ⚫︎取得したボタンに1つずつクリックイベントを設定
faqBtns.forEach((btn) => {
    btn.addEventListener('click', () => {

        // クリックされたボタンの親要素を取得
        // その中の dd（回答部分）を取得
        //closest（一番近い）
        const dd = btn.closest('.p-faq__listItem').querySelector('dd');
        const answers = document.querySelectorAll('.p-faq__list dd');

        // ⚫︎他の回答は閉じる処理
        // すべての回答(dd)を取得してループ
        answers.forEach((d) => {
            // クリックされた回答以外を閉じる
            if (d !== dd) d.classList.remove('is-open');
        });

        // ⚫︎今回クリックした回答を開閉
        dd.classList.toggle('is-open'); // 開いていれば閉じる、閉じていれば開く


        // ⚫︎ボタンの回転アニメーションの切り替え
        // すべてのボタンの回転をリセット
        faqBtns.forEach((btn) => { btn.classList.remove('is-open') });

        // 今クリックした回答が開いていれば、ボタンを回転
        //「この回答が開かれていたら、ボタンに回転用クラスを付ける」という意味になります。
        if (dd.classList.contains('is-open')) {
            btn.classList.add('is-open');
        }
    });
});



//メインビジュアルの動き
function startSlider() {
  const sliders = document.querySelectorAll(".p-topmainvisual__slider");

  sliders.forEach(slider => {

    const slides = slider.querySelectorAll("img");
    if (slides.length === 0) return;

    let current = 0;
    const slideInterval = 2500;

    function showSlide(index) {
      slides.forEach((img, i) => {
        img.classList.toggle("active", i === index);
      });
    }

    // 🔥 必ず1枚目からスタート
    showSlide(0);

    setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, slideInterval);
  });
}

//.p-Viのふわっとアニメーション
document.addEventListener("DOMContentLoaded", () => {
  const viImages = document.querySelectorAll(".p-Vi img");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // 一度だけアニメーション
        }
      });
    },
    {
      threshold: 0.2 // 画面に20%見えたら発火
    }
  );

  viImages.forEach(img => observer.observe(img));
});

//スクロールアニメーション
const elements = document.querySelectorAll('.fade');

const scrollObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }
  });
});

elements.forEach(el => scrollObserver.observe(el));

//フッターのトップに戻るボタン
const backToTop = document.querySelector('.c-backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.scrollHeight;

  // 一番下に近づいたら表示
  if (scrollY + windowHeight > documentHeight - 100) {
    backToTop.classList.add('is-show');
  } else {
    backToTop.classList.remove('is-show');
  }
});

//メニュービジュアルの動き
function startMenuSlider() {
  const slider = document.querySelector(".p-p-menuvisual__slider");
  if (!slider) return;

  const slides = slider.querySelectorAll("img");
  let current = 0;

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 2000);
}

window.addEventListener("load", startMenuSlider);

//予約ボタン
const btn = document.querySelector('.c-fixed-btn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    btn.classList.add('is-show');
  } else {
    btn.classList.remove('is-show');
  }
});