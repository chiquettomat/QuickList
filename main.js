const input = document.querySelector(".itens");
const addBtn = document.querySelector("#add");
const Ullist = document.getElementById("listItens");
const alertMessage = document.getElementsByClassName("removedMessage");
const checkbox = document.getElementById("select");
const sectionAlert = document.getElementById("insertAlert");

function additems() {
  addBtn.addEventListener("click", () => {
    const inputValue = input.value;
    if (inputValue === "") {
      alert("Por favor insira um valor válido.");
      return;
    }
    const regexCharacters = /^[a-zA-Zà-úÀ-Ú0-9\s\.,~]{3,30}$/;
    if (!regexCharacters.test(inputValue)) {
      alert(
        "O valor inserido excede o limite de 30 caracteres ou contém menos de 3"
      );
      input.value = "";
      return;
    }
    const newitens = document.createElement("li");
    newitens.classList.add("listItem");
    newitens.innerHTML = `
      <input type="checkbox" name="" class="select" />
      <p>${inputValue}</p>
      <button type="submit" class="icon1">
        <img src="./assets/delete-02-stroke-rounded.svg" alt="" />
      </button>
    `;
    const deleteBtn = newitens.querySelector("button");
    deleteBtn.addEventListener("click", deleteItem);
    input.value = "";
    Ullist.appendChild(newitens);

    const check = newitens.querySelector("input");
    check.classList.add("select");

    savelist();
  });
}

function savelist() {
  const listItens = document.querySelectorAll(".listItem");
  const itensArray = Array.from(listItens).map((item) =>
    item.textContent.trim()
  );
  try {
    localStorage.setItem("myList", JSON.stringify(itensArray));
  } catch (error) {
    console.error("Erro ao salvar lista no localStorage:", error);
  }
}

function loadList() {
  const savedList = localStorage.getItem("myList");
  if (savedList) {
    const item = JSON.parse(savedList);
    item.forEach((itens) => {
      const newitens = document.createElement("li");
      newitens.classList.add("listItem");
      newitens.innerHTML = `
      <input type="checkbox" name="" class="select" />
      <p>${itens}</p>
      <button type="submit" class="icon1">
        <img src="./assets/delete-02-stroke-rounded.svg" alt="" />
      </button>
      `;
      const deleteBtn = newitens.querySelector("button");
      deleteBtn.addEventListener("click", deleteItem);

      Ullist.appendChild(newitens);
    });
  }
}

function deleteItem(event) {
  const item = event.target.closest("li");
  Ullist.removeChild(item);

  savelist();

  sectionAlert.classList.add("animation");
  sectionAlert.style.opacity = 1;

  const closeBtn = sectionAlert.querySelector("#cancelMessage");
  closeBtn.addEventListener("click", () => {
    sectionAlert.style.opacity = 0;
  });
}

additems();
loadList();
