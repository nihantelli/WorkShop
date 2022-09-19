//QUIZ NESNESİ TANIMLADIM.QUIZ CONSTRUCTORINA ULAŞARAK İÇİNE SORULAR DİZİSİNİ GÖNDERDİM.
const quiz = new Quiz(sorular);

// UI DOSYASINDAKİ UI CONSTRUCTORINA ULAŞTIM VE BUNU ui OLARAK TANIMLADIM.
const ui = new UI();

// HTMLDE TANIMLADIĞIM başlangıç BUTTONUNA ULAŞTIM EVENT VE ÇALIŞTIRACAĞI FONKSİYONU TANIMLADIM. E
ui.btn_start.addEventListener("click", function () {
  ui.btn_next.classList.add("show");
  ui.quiz_box.classList.add("active");

  ui.soruGoster(quiz.soruGetir());
  ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);

  ui.btn_previous.classList.add("display");
});
// HTMLDE TANIMLADIĞIM SONRAKİ SORU BUTTONUNA ULAŞTIM EVENT VE ÇALIŞTIRACAĞI FONKSİYONU TANIMLADIM. EĞER SON SORUYA GELİNMEMİŞSE SORUGETİR PROTOTYPEI ÇALIŞACAK.

ui.btn_see.addEventListener("click", function () {
  ui.btn_start.click();
  ui.btn_previous.click();
  ui.score_box.classList.remove("active");
  ui.btn_previous.classList.add("show");
  ui.btn_next.classList.remove("show");
});

ui.btn_previous.addEventListener("click", function () {
  // GERİ DÖNDÜĞÜMDE BUTONDA FINISH YAZMAMASI İÇİN

  ui.btn_next.innerHTML = "NEXT QUESTION";

  //  SORULARDA GERİYE GİDERKEN ÇALIŞACAK FONKSİYONLAR
  if (quiz.soruIndex != 0) {
    quiz.soruIndex -= 1;

    ui.soruGoster(quiz.soruGetir());
    ui.btn_start.classList.add("display");

    let cevap = quiz.soruGetir().dogruCevap;
    for (let option of ui.option_list.children) {
      if (option.querySelector("span B").textContent == cevap) {
        option.classList.add("a-correct");
        option.insertAdjacentHTML("beforeend", ui.correctIcon);
      } else {
        option.classList.add("a-incorrect");
        option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
      }
      option.classList.add("disabled");
    }
  } else {
    ui.btn_next.classList.add("show");
    ui.quiz_box.classList.remove("active");
    ui.score_box.classList.add("active");
    ui.skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
  }
});

ui.btn_next.addEventListener("click", function () {
  // SONDAN 2.SORUDAKİ NEXT BUTONUNA TIKLAYINCA SON SORUDAKİ NEXT BUTONU YERİNE FINISH YAZMASI
  if (quiz.soruIndex == quiz.sorular.length - 2) {
    ui.btn_next.innerHTML = "FINISH QUIZ";
  }

  //  SORULARDA İLERİ GİDERKEN ÇALIŞACAK FONKSİYONLAR
  if (quiz.sorular.length != quiz.soruIndex + 1) {
    quiz.soruIndex += 1;

    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);

    ui.btn_start.classList.add("display");
  } else {
    ui.quiz_box.classList.remove("active");
    ui.score_box.classList.add("active");
    ui.skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
  }
});
// ÇIKIŞ YAPTIKTAN SONRA YENİDEN YUKLEME
ui.btn_quit.addEventListener("click", function () {
  window.location.reload();
});
// İLK SORUYA DÖNME
ui.btn_replay.addEventListener("click", function () {
  quiz.soruIndex = 0;
  quiz.dogruCevapSayisi = 0;
  ui.btn_start.click();
  ui.btn_next.classList.add("show");
  ui.btn_next.innerHTML = "NEXT QUESTION";
  ui.btn_previous.classList.remove("show");
  ui.score_box.classList.remove("active");
  clearInterval(counter);
  clearInterval(counterLine);
});

// YENİ FONKSİYON YAZDIK, DIŞARDAN SEÇENEK GELDİ. GELEN SEÇENEĞİN İÇİNDEKİ SPAN B ETİKETİNİN İÇİNDEKİ YAZI CEVAP OLARAK TANIMLANDI. QUİZİN İÇİNDEN SORU GETİRİ ÇALIŞTIRACAK SORU NESNESİ TANIMLANDI.

function optionSelected(option) {
  let cevap = option.querySelector("span B").textContent;
  let soru = quiz.soruGetir();

  // SORUNUN ALTINDAN QUIZE ULAŞILIP SORU GETİRİLDİ, CEVAP KONTROL EDİLDİ.

  if (soru.cevabiKontrolEt(cevap)) {
    quiz.dogruCevapSayisi += 1;
    option.classList.add("correct");
  } else {
    option.classList.add("incorrect");
  }

  for (let i = 0; i < ui.option_list.children.length; i++) {
    ui.option_list.children[i].classList.add("disabled");
  }
}

// DIŞARDAN SÜRE VERİLECEK. SÜRE 1 SNDE BİR YENİLENECEK. HTMLDEKİ TIME_SECONDA ULAŞIP ONA TIME ADINI VERDİK. TIME 1ER 1ER AZALACAK.
// SÜRE 0'IN ALTINA İNDİĞİ ZAMAN COUNTER NESNESİNE TANIMLANAN SETINTERVAL ÖZELLİĞİ DURDURULUR. HTMLDE ONA ULAŞILIP SÜRE BİTTİ YAZDIRILIR.
