const leftArrow = document.getElementById("arrowBtnLeft");
const rightArrow = document.getElementById("arrowBtnRight");

leftArrow.addEventListener("click", showPrevious);
rightArrow.addEventListener("click", showNext);
// Создаем объект для хранения состояния
const sliderState = {
  currentIndex: 0,
  reviews: [
    {
      name: "Вася",
      text: "Время, проведенное в приятной компании и атмосфере Время, проведенное в приятной компании и атмосфере Время, проведенное в приятной компании и атмосфере Время, проведенное в приятной компании и атмосфере",
      time: "06:23:47",
    },
    {
      name: "Петя",
      text: "Отличная организация мероприятий!",
      time: "07:15:30",
    },
    {
      name: "Маша",
      text: "Прекрасные воспоминания о вечере",
      time: "08:42:15",
    },
  ],
};

// Функция для создания DOM структуры
function createSliderHTML(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
      <div class="reviews__container">
        <p class="reviews__block-info-title"></p>
        <p class="reviews__text"></p>
        <p class="reviews__time"></p>
        <div class="reviews__block-arrows">
          <div id="arrowBtnLeft">
            <img src="./img/arrow-left.png" alt="Стрелка влево">
          </div>
          <div id="arrowBtnRight">
            <img src="./img/arrow-right.png" alt="Стрелка вправо">
          </div>
        </div>
      </div>
    `;
}

// Функции для навигации
function showPrevious() {
  sliderState.currentIndex = (sliderState.currentIndex - 1 + sliderState.reviews.length) % sliderState.reviews.length;
  updateDisplay();
}

function showNext() {
  sliderState.currentIndex = (sliderState.currentIndex + 1) % sliderState.reviews.length;
  updateDisplay();
}

// Функция для обновления отображения
function updateDisplay() {
  const review = sliderState.reviews[sliderState.currentIndex];
  const titleElement = document.querySelector(".reviews__block-info-title");
  const textElement = document.querySelector(".reviews__text");
  const timeElement = document.querySelector(".reviews__time");

  titleElement.textContent = review.name;
  textElement.textContent = review.text;
  timeElement.textContent = review.time;
}

// Инициализация слайдера
function initializeSlider(containerId) {
  createSliderHTML(containerId);
  updateDisplay();
}

// Запуск при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  initializeSlider("slider-container");
});
