
      // GOREV LİSTESİ TANIMLARI
      let gorevListesi = [];
      if (localStorage.getItem("gorevListesi") !== null) {
        gorevListesi = JSON.parse(localStorage.getItem("gorevListesi"));
      }
      // BAŞTA TANIMLANAN NESNELER
      let editId;
      let isEditTask = false;
      const taskInput = document.querySelector("#txtTaskName");
      const btnClear = document.querySelector("#btnClear");
      const filters = document.querySelectorAll(".filters span");

      // GÖREV LİSTESİNİN GÖSTERİLMESİ
      displayTasks("all");
      function displayTasks(filter) {
        let ul = document.getElementById("task-list");
        ul.innerHTML = ""; //ULNİN İÇİ BAŞLANGIÇTA BOŞ ÇÜNKÜ HER SEFERİNDE TEKRAR EKLENMESİN DİYE.
        if (gorevListesi.length == 0) {
          //HİÇ GÖREV YOKSA LİSTENİZ BOŞ YAZSIN
          ul.innerHTML = "<p class='p-3 m-0'> Your task list is empty...</p>";
        } else {
          for (let gorev of gorevListesi) {
            //GOREV LİSTESİNİ DOLAŞAN DÖNGÜ
            let completed = gorev.durum == "completed" ? "checked" : ""; //GOREV DURUMU COMPLETED İSE CHECKED OLSUN DEĞİLSE BOŞ OLSUN

            if (filter == gorev.durum || filter == "all") {
              //GELEN İD DURUMA EŞİTVE VEYA HEPSİ İSE, YANİ HTMLDE İDSİ COMPLETED OLAN GOREV DURUMUN ALTINDA COMPLETED OLANLA EŞLEŞİR, ONLAR GETİRİLİR, PENDİNG OLAN PENDİNGLE, ALLSA Bİ FİLTRE OLMAYACAĞI İÇN HEPSİ GELİR.
              let li = `<li class="task list-group-item">
                                <div class="form-check">
                                    <input type="checkbox" onclick="updateStatus(this)" id="${gorev.id}" class="form-check-input" ${completed}>
                                    <label for="${gorev.id}" class="form-check-label ${completed}">${gorev.gorevAdi}</label>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Delete</a></li>
                                        <li><a onclick='editTask(${gorev.id}, "${gorev.gorevAdi}")' class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Edit</a></li>
                                    </ul>
                                </div>
                            </li>
                            
                        `;
              ul.insertAdjacentHTML("beforeend", li);
            }
          }
        }
      }
      //BUTONLARA EVENT TANIMLANMASI. BUNU HTMLDE BUTON YANINA (CLICK, (){}) ŞEKLİNDE DE EKLEYEBİLİRDİK.
      document
        .querySelector("#btnAddNewTask")
        .addEventListener("click", newTask);
      document
        .querySelector("#btnAddNewTask")
        .addEventListener("keypress", function () {
          //ENTERA BASINCA DA ÇALIŞMASI İÇİN
          if (event.key == "Enter") {
            document.getElementById("btnAddNewTask").click();
          }
        });
      // tıklanan spanın active olup öncekinin active'inin kaldırılması
      for (let span of filters) {
        span.addEventListener("click", function () {
          document.querySelector("span.active").classList.remove("active");
          span.classList.add("active");
          displayTasks(span.id); //DİSPLAY TASKE SPANIN İDSİNİ GÖNDER
        });
      }
      function newTask(event) {
        //YENİ GÖREV EKLEME VEYA GUNCELLEME
        if (taskInput.value == "") {
          alert("You must enter a task!");
        } else {
          //ekleme
          if (!isEditTask) {
            // NORMAL LİSTE SONUNA EKLEME
            gorevListesi.push({
              id: gorevListesi.length + 1,
              gorevAdi: taskInput.value,
              durum: "pending",
            });
          } else {
            for (let gorev of gorevListesi) {
              if (gorev.id == editId) {
                gorev.gorevAdi = taskInput.value;
              }
              isEditTask = false;
            }
          }
          //guncelleme EDİT TASKA TIKLANINCA TRUE OLDU, DUZENLENEN YAZI TEKRAR LİSTEYE EKLENDİ. FALSE DÖNDÜ.
          taskInput.value = "";
          displayTasks(document.querySelector("span.active").id);
          localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
        }

        event.preventDefault();
      }
      //SEÇİLENİN SİLİNMESİ
      function deleteTask(id) {
        let deletedId;

        for (let index in gorevListesi) {
          if (gorevListesi[index].id == id) {
            deletedId = index;
          }
        }

        gorevListesi.splice(deletedId, 1);
        displayTasks(document.querySelector("span.active").id);
        localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
      }
      //GUNCELLEME EDİT
      function editTask(taskId, taskName) {
        editId = taskId;
        isEditTask = true;
        taskInput.value = taskName;
        taskInput.focus();
        taskInput.classList.add("active");

        console.log("edit id:", editId);
        console.log("edit mode", isEditTask);
      }

      btnClear.addEventListener("click", function () {
        gorevListesi.splice(0, gorevListesi.length);
        localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
        displayTasks();
      });
      //CHECKED YAPMA, DURUM BİLGİSİNİ DEĞİŞTİRME
      function updateStatus(selectedTask) {
        // console.log(selectedTask.parentElement.lastElementChild);
        let label = selectedTask.nextElementSibling;
        let durum;

        if (selectedTask.checked) {
          label.classList.add("checked");
          durum = "completed";
        } else {
          label.classList.remove("checked");
          durum = "pending";
        }

        for (let gorev of gorevListesi) {
          if (gorev.id == selectedTask.id) {
            gorev.durum = durum;
          }
        }

        displayTasks(document.querySelector("span.active").id);

        localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
      }
   