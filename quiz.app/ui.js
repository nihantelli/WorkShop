function UI() {
  (this.btn_start = document.querySelector(".btn_start")),
    (this.btn_next = document.querySelector(".btn_next")),
    (this.btn_previous = document.querySelector(".btn_previous")),
    (this.btn_replay = document.querySelector(".btn_replay")),
    (this.btn_quit = document.querySelector(".btn_quit")),
    (this.btn_finish = document.querySelector("btn_finish")),
    (this.quiz_box = document.querySelector(".quiz_box")),
    (this.score_box = document.querySelector(".score_box")),
    (this.option_list = document.querySelector(".option_list")),
    (this.order = document.querySelector(".order")),
    (this.correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>'),
    (this.incorrectIcon =
      '<div class="icon"><i class="fas fa-times"></i></div>'),
    (this.time_text = document.querySelector(".time_text")),
    (this.time_second = document.querySelector(".time_second"));
  this.time_line = document.querySelector(".time_line");
}

// TEKRAR EDECEK PROTOTYPELARI BURAYA GÖNDERDİM.

UI.prototype.soruGoster = function (soru) {
  let question = `<span>${soru.soruMetni}</span>`;
  let options = "";

  for (let cevap in soru.cevapSecenekleri) {
    options += `
                <div class="option"> 
                    <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
                </div>
            `;
  }
  document.querySelector(".question_text").innerHTML = question;
  this.option_list.innerHTML = options;

  const option = this.option_list.querySelectorAll(".option");

  for (let opt of option) {
    opt.setAttribute("onclick", "optionSelected(this)");
  }
  ui.btn_start.classList.add("display");
};

//  UI.prototype.soruSayisiniGoster = function (soruSirasi, toplamSoru) {
//    let tag = `<span class="order">${soruSirasi} / ${toplamSoru}</span>`;
//    document.querySelector(".order").innerHTML = tag;
//    ui.btn_next.classList.add("show");
//     ui.btn_previous.classList.add("show");
//  };

UI.prototype.skoruGoster = function (toplamSoru, dogruCevap) {
  let tag = `Toplam ${toplamSoru} sorudan ${dogruCevap} doğru cevap verdiniz.`;
  document.querySelector(".score_box .score_text").innerHTML = tag;
};
