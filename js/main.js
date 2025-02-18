// Получаем элементы модального окна и кнопки
const modal = document.getElementById("modal");
const body = document.getElementById("body");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");

// Когда пользователь нажимает на кнопку, открываем модальное окно
openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
})


// Когда пользователь нажимает на <span> (x), закрываем модальное окно
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
})

// Когда пользователь нажимает в любом месте вне модального окна, закрываем его
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
})