const button_add_task = document.getElementById("button_add_task");
const add_task = document.getElementById("add_task");
const form_new_task = document.getElementById("form-new-task");
const button_cancel_task = document.getElementById("cancel_task");
const store = document.getElementById("store");
const input_new_task = document.getElementById("input_new_task");
const description = document.getElementById("description");
const save_task = document.getElementById("save_task");
const tasks_container = document.getElementById("tasks");
const imageInput = document.getElementById("imageInput1"); 
let selectedImage = null; 
const element = document.getElementById("contentPDF"); 
const selectImageButton = document.getElementById("selectImageButton"); 
var modal = document.getElementById("modal");
const iconUser = document.getElementById("icon-user");
const modalEditProfile = document.getElementById("content-profile");
const closeProfileModal = document.getElementById("close_profile");
const selectBandeira = document.getElementById("selectBandeira");
const storeProfile = document.getElementById("storeProfile");
const nameTechnical = document.getElementById("nameTechnical");
const containerInputsProfile = document.getElementById(
  "containerInputsProfile"
);
var html = document.querySelector("html");
var body = document.querySelector("body");
function obterDataAtualFormatada() {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0"); 
  const mes = String(hoje.getMonth() + 1).padStart(2, "0"); 
  const ano = hoje.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
function editProfile() {
  modalEditProfile.style.display = "block";
  modalEditProfile.style.visibility = "visible";
}
function closeProfile() {
  modalEditProfile.style.display = "none";
  modalEditProfile.style.visibility = "hidden";
}
function saveProfile() {
  let bandeira = document.getElementById("selectBandeira").value;
  let loja = document.getElementById("storeProfile").value;
  let tecnico = document.getElementById("nameTechnical").value;
  if (!bandeira || !loja || !tecnico) {
    Toastify({
      text: "Preencha todos os campos",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "top",
      stopOnFocus: true,
      style: {
        background: "red",
      },
    }).showToast();
    return;
  }
  containerInputsProfile.innerHTML = `
    <div>
      <label>Bandeira:</label>
      <br>
      <select required id="selectBandeira">
        <option value="${bandeira}">Atual: ${bandeira}</option>
        <option value="Fort Atacadista">Fort Atacadista</option>
        <option value="Sempre Fort">Sempre Fort</option>
        <option value="Bate Fort">Bate Fort</option>
        <option value="Comper">Comper</option>
        <option value="Perlog">Perlog</option>
        <option value="Fort Atacadista Posto">Fort Atacadista Posto</option>
      </select>
      <br>
      <label>Loja:</label>
      <br>
      <input value="${loja}" type="number" id="storeProfile" placeholder="${loja}">
      <br>
      <label>Técnico:</label>
      <br>
      <input value="${tecnico}" id="nameTechnical" type="text" placeholder="${tecnico}">
    </div>
    <div>
      <button id="save_profile" onclick="saveProfile()">Salvar</button>
      <button id="close_profile" onclick="closeProfile()">Cancelar</button>
    </div>
  `;
  const valueProfile = [bandeira, loja, tecnico];
  localStorage.setItem("savedProfile", JSON.stringify(valueProfile));
  localStorage.setItem("savedInputs", containerInputsProfile.innerHTML);
  iconUser.style.color = "var(--color-font)";
  Toastify({
    text: "Perfil salvo com sucesso!",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "#28a745",
    },
  }).showToast();
  // closeProfile();
}
function mostrarModal() {
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  modal.style.visibility = "visible";
  modal.style.display = "flex";
}
function deleteTask(event) {
  var task = event.target.closest(".container-task");
  task.remove();
  saveTask();
}
function saveTask() {
  localStorage.setItem("savedContent", tasks_container.innerHTML);
}
imageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    selectImageButton.classList.add("selected");
    selectImageButton.classList.remove("red");
    selectImageButton.textContent = "Imagem selecionada";
  } else {
    selectImageButton.classList.remove("selected");
    selectImageButton.textContent = "ADICIONAR IMAGEM";
  }
});
function addTask(title, store) {
  var newDiv = document.createElement("div");
  newDiv.className = "container-task";
  newDiv.innerHTML = `
      <div class="header-task">
                <div>
                    <h4>Loja ${store}</h4>
                    <h4>${title}</h4>
                </div>
                <i class="fa-solid fa-trash" aria-hidden="true"></i>

            </div>
            <div>
                <p>${description.value}</p>
            </div>
  `;
  newDiv.querySelector(".fa-trash").addEventListener("click", deleteTask);
  tasks_container.appendChild(newDiv);
  saveTask();
}
imageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      selectedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});
function addTask(title, store) {
  var newDiv = document.createElement("div");
  newDiv.className = "container-task";
  const imageHTML = selectedImage
    ? `<img src="${selectedImage}" alt="Imagem da tarefa" class="task-image">`
    : "";

  newDiv.innerHTML = `
      <div class="header-task">
        <div>
          <h4>Loja ${store}</h4>
          <h4>${title}</h4>
        </div>
        <i class="fa-solid fa-trash" aria-hidden="true"></i>
      </div>
      ${imageHTML}
      <div>
        <p>${description.value}</p>
      </div>
  `;
  newDiv.querySelector(".fa-trash").addEventListener("click", deleteTask);
  tasks_container.appendChild(newDiv);
  saveTask();
  selectedImage = null;
}
document.querySelectorAll(".check-task").forEach(function (checkbox) {
  checkbox.addEventListener("change", chackedTask);
});
window.addEventListener("load", function () {
  const savedInputs = localStorage.getItem("savedInputs");
  if (savedInputs) {
    containerInputsProfile.innerHTML = savedInputs;
  }
});
window.addEventListener("load", function () {
  const savedContent = localStorage.getItem("savedContent");
  if (savedContent) {
    tasks_container.innerHTML = savedContent;
    document.querySelectorAll(".fa-trash").forEach(function (btn) {
      btn.addEventListener("click", deleteTask);
    });
    document.querySelectorAll(".check-task").forEach(function (checkbox) {
      checkbox.addEventListener("change", chackedTask);
    });
  }
});
add_task.addEventListener("click", function () {
  form_new_task.style.display = "flex";
  form_new_task.style.visibility = "visible";
});
function cancelTask() {
  input_new_task.value = "";
  form_new_task.style.display = "none";
  form_new_task.style.visibility = "hidden";
}
save_task.addEventListener("click", function () {
  if (
    input_new_task.value == "" ||
    store.value == "" ||
    description.value == "" ||
    selectImageButton.attributes.class.nodeValue == "custom-file-upload"
  ) {
    if (selectImageButton.attributes.class.nodeValue == "custom-file-upload") {
      selectImageButton.classList.add("red");
    }
    Toastify({
      text: "Preencha todos os campos",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "red",
      },
      onClick: function () {},
    }).showToast();
  } else {
    addTask(input_new_task.value, store.value);
    form_new_task.style.display = "none";
    form_new_task.style.visibility = "hidden";
    input_new_task.value = "";
    description.value = "";
    selectImageButton.classList.remove("selected");
    selectImageButton.textContent = "ADICIONAR IMAGEM";
     cancelTask()
  }
});
function generatePDF() {
  if (localStorage.getItem("savedProfile") == null) {
    iconUser.style.color = "red";
    Toastify({
      text: "Preencha seu perfil",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "red",
      },
    }).showToast();
    return;
  }
  if (tasks_container.innerText == "") {
    Toastify({
      text: "Adicione pelo menos um relatório",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "red",
      },
    }).showToast();
    return;
  }

  let profileData = JSON.parse(localStorage.getItem("savedProfile"));
  mostrarModal();
  const element = document.getElementById("contentPDF");
  const tasks = document.querySelectorAll(".container-task");
  element.innerHTML = `
    <table>
      <thead>
        <tr>
          <th style="text-align: center; font-size: x-large;">
            RELATÓRIO
          </th>
        </tr>
      </thead>
    </table>
    <table>
      <thead>
        <tr>
          <th>BANDEIRA:</th>
          <th>${profileData[0].toUpperCase()}</th>
          <th>FILIAL:</th>
          <th>${profileData[1]}</th>
          <th>DATA DO RELATÓRIO:</th>
          <th>${obterDataAtualFormatada()}</th>
        </tr>
      </thead>
    </table>
    <table>
      <thead>
        <tr>
          <th style="width: 50%;">ELABORADO POR (RESPONSÁVEL):</th>
          <th>${profileData[2].toUpperCase()}</th>
        </tr>
      </thead>
    </table>
    <table id="container-table">
    </table>
  `;

  const containerTable = document.getElementById("container-table");
  let currentHeight = 0;
  const pageHeight = 1122;
  let contador = 700;
  let page = 1;
  tasks.forEach((task, index) => {
    const store = task.querySelector(".header-task h4:first-child").textContent;
    const title = task.querySelector(".header-task h4:last-child").textContent;
    const description = task.querySelector("p").textContent;
    const imgElement = task.querySelector(".task-image");
    const imgSrc = imgElement ? imgElement.src : null;
    const taskHTML = `
    <table>
      <thead class="task-table">
        <th style="height: auto; width: 50%; padding: 0;">
          ${
            imgSrc
              ? `<img src="${imgSrc}" style="max-height:340px;">`
              : ""
          }
        </th>
        <th style="padding: 0;">
          <table style="width: 100%; margin: 0;">
            <tr><td>${store}</td></tr>
            <tr><td>${title}</td></tr>
            <tr><td>${description}</td></tr>
          </table>
        </th>
      </thead>
    </table>
  `;
    containerTable.innerHTML += taskHTML;
  });
  let taskTable = document.querySelectorAll(".task-table");
  taskTable.forEach((task, index) => {
    const bottomPosition = task.offsetTop + task.offsetHeight;
    if (bottomPosition >= contador) {
      task.classList.add("page-break");
      contador += 700;
      page += 1;
    }
  });
  html2pdf()
    .set({
      margin: [30, 0, 25, 0],
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    })
    .from(element)
    .toPdf()
    .get("pdf")
    .then((pdf) => {
      const pageCount = pdf.internal.getNumberOfPages();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.addImage("./images/logo-gp-pereira 2.png", "PNG", 85, -4, 40, 40);
        pdf.addImage(
          "./images/footer.png",
          "PNG",
          0,
          pageHeight - 20,
          pageWidth,
          15
        );
      }
      pdf.save(`Relatorio.pdf`);
    })
    .then(() => {
      window.location.reload();
    });
}
