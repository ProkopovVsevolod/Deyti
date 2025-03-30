
// Получаем элементы модального окна и кнопки
const modal = document.getElementById("modal");
const modalMobile = document.getElementById("modalMobile");
const body = document.getElementById("body");
const openModalButtons = document.querySelectorAll("#openModal");
const openModalMobileBtn = document.getElementById("openModalMobile");
const closeModalBtn = document.getElementById("closeModal");
const arrowLeft = document.getElementById("arrowBtnLeft");
const arrowRight = document.getElementById("arrowBtnRight");

// Когда пользователь нажимает на кнопку, открываем модальное окно
openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

const mobileModalHandler = () => {
  modalMobile.classList.toggle("active");

  if (modalMobile.classList.contains("active")) {
    document.body.style.overflow = "hidden";
    openModalMobileBtn.classList.add("active");
  } else {
    document.body.style.overflow = "";
    openModalMobileBtn.classList.remove("active");
  }
};

openModalMobileBtn.addEventListener("click", mobileModalHandler);

// Когда пользователь нажимает на <span> (x), закрываем модальное окно
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Когда пользователь нажимает в любом месте вне модального окна, закрываем его
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

document.querySelectorAll(".modal-mobile__list a").forEach((link) => {
  link.addEventListener("click", function (e) {
    // e.preventDefault(); // Предотвращаем стандартное поведение ссылки
    mobileModalHandler(); // Вызываем функцию закрытия модального окна
  });
});

