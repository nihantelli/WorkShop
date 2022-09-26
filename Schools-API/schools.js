// INPUTA YAZILAN COUNTRYNİN GETİRİLMESİ
document.querySelector("#btnSearch").addEventListener("click", () => {
  let text = document.querySelector("#txtSearch").value;
  document.querySelector("#details").style.opacity = 0;

  getCountry(text); //inputa girilen verinin country yerine gönderilmesi
});
function onError(err) {
  console.log(err);
}

// APIDEN VERİLERİ ÇEKME
async function getCountry(country) {
  try {
    const response = await fetch(
      "http://universities.hipolabs.com/search?country=" + country
    );
    if (!response.ok) throw new Error("okul bulunamadı");
    const data = await response.json();
    renderCountry(data);
    console.log(data);
  } catch (err) {
    renderError(err);
  }
}

//İÇİNDEN İSTEDİĞİMİZ VERİLERİ DİNAMİK OLARAK ALDIK

function renderCountry(data) {
  const ul = document.querySelector("ul");
  document.querySelector("ul").innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    let li = `
                            <li>
                              
                                  <h3 class="card-title">${data[i].name}</h3>
                                  <hr>
                              
                             
                            </li>

              `;
    document.querySelector("#details").style.opacity = 1;
    ul.insertAdjacentHTML("beforeend", li);
  }
}
function renderError(err) {
  const html = `<div class="alert alert-danger"> ${err.message} </div>`;
  setTimeout(function () {
    document.querySelector("#errors").innerHTML = "";
  }, 3000);
  document.querySelector("#errors").innerHTML = html;
}
