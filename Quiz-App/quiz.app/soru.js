// SORU CONSTRUCTORU OLUŞTURDUM
function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
  this.soruMetni = soruMetni;
  this.cevapSecenekleri = cevapSecenekleri;
  this.dogruCevap = dogruCevap;
}
// TEKRAR EDECEK OLAN KONTROL PROTOTYPE'INI TANIMLADIM.
Soru.prototype.cevabiKontrolEt = function (cevap) {
  return cevap === this.dogruCevap;
};

// DİZİ TANIMLADIM.SORU CONSTRUCTORINA ULAŞARAK İÇLERİNE PARAMETRELERİ GÖNDERDİM.
let sorular = [
  new Soru(
    "1-Which of the following is not a character from Friends?",
    { A: "Phoebe", B: "Rachel", C: "Jack", D: "Monica" },
    "C"
  ),
  new Soru(
    "2-Which of the following is Phoebe's instrument?",
    { A: "Guitar", B: "Piano", C: "Violin", D: "Cello" },
    "A"
  ),
  new Soru(
    "3-Which of the following is Monica's job?",
    { A: "Doctor", B: "Chef", C: "Architect", D: "Model" },
    "B"
  ),
  new Soru(
    "4- Which of the following is Rachel's tattoo?",
    {
      A: "Red Cupid",
      B: "Little Monkey",
      C: "Blue Angel",
      D: "Red Heart",
    },
    "D"
  ),
  new Soru(
    "5-Which of these were one of the show's original working titles?",
    {
      A: "Insomnia Cafe",
      B: "Life and Stuff",
      C: "Special Moments",
      D: "You've Got a Friend",
    },
    "A"
  ),
];
