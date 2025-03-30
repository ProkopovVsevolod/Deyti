const CONFIG = {
  BOT_TOKEN: "7679659463:AAHye7GgzphV-P0Jb8Pveh9EYnmbQI7ikKE",
  CHAT_ID: "7864270190",
  WHATSAPP_API: "https://1103.api.green-api.com/1103216201/messages/chat",
};

function getFormData() {
  return {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    goals: {
      wantToMeet: document.getElementById("wantToMeet").checked,
      wantToTeam: document.getElementById("wantToTeam").checked,
    },
    wishes: document.getElementById("wishes").value,
    personalData: document.getElementById("personalData").checked,
    recall: document.getElementById("recall").checked,
  };
}

function getGoalByValue(goals) {
  if (goals?.wantToMeet) return "Хочу встречу!";
  if (goals?.wantToTeam) return "Хочу в команду!";
}

// Функция для форматирования сообщения
function formatMessage(formData) {
  return `
  Новое сообщение от пользователя:  
  <b>Имя:</b> ${formData.name}
  <b>Номер телефона:</b> ${formData.phone}
  <b>Цели:</b>  ${getGoalByValue(formData.goals)}
  ${formData.wishes ? `<b>Пожелания:</b>\n${formData.wishes}` : ""}  
  ${formData.recall ? "<b>Требуется перезвонить!</b>" : ""}
      `;
}

document.querySelectorAll('input[name="chooseCategory"]').forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    // Если чекбокс отмечен
    if (this.checked) {
      // Снимаем все остальные чекбоксы с этого же имени
      document.querySelectorAll('input[name="chooseCategory"]').forEach((otherCheckbox) => {
        if (otherCheckbox !== this) {
          otherCheckbox.checked = false;
        }
      });
    }
  });
});

document.querySelector(".modal-content__form").addEventListener("submit", async function (e) {
  e.preventDefault();

  // Проверка согласия на обработку данных
  if (!document.getElementById("personalData").checked) {
    alert("Пожалуйста, дайте согласие на обработку персональных данных");
    return;
  }

  try {
    // Проверка наличия формы
    if (!e.target) {
      throw new Error("Форма не найдена");
    }

    // Получаем выбранный метод отправки
    const submitButton = e.submitter;
    const isTelegram = submitButton?.value === "Telegram";

    // Получаем данные формы
    const formData = getFormData();
    if (!formData) {
      throw new Error("Ошибка при получении данных формы");
    }

    // Форматируем сообщение
    const message = formatMessage(formData);
    if (!message) {
      throw new Error("Ошибка при форматировании сообщения");
    }

    // Отправка в Telegram
    if (isTelegram) {
      if (!CONFIG.CHAT_ID) {
        throw new Error("Не указан CHAT_ID для Telegram");
      }

      const response = await fetch(`https://api.telegram.org/bot${CONFIG.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CONFIG.CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка Telegram: ${response.status}`);
      }

      const result = await response.json();
      if (!result.ok) {
        throw new Error(result.description);
      }

      alert("Сообщение успешно отправлено в Telegram!");
    } else {
        console.log('whatsAppClient:', whatsAppClient);

      // Отправка в WhatsApp
      const restAPI = whatsAppClient.restAPI({
        idInstance: "1103216201",
        apiTokenInstance: "42b20132bbe0490c8483b0d4a896572a2636d5d9c6994dad8f",
      });

      console.log('restAPI:', restAPI);

      //   const response = await fetch(CONFIG.WHATSAPP_API, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded",
      //     },
      //     body: JSON.stringify({
      //       message: message,
      //       //   phone: formData.phone, // Используем правильное поле для телефона
      //     }),
      //     redirect: "follow",
      //   });
      restAPI.message
        .sendMessage(
          "79996699284@c.us", // Номер получателя
          null, // ID цитируемого сообщения (null если не цитируете)
          "Привет!" // Текст сообщения
        )
        .then((data) => {
          console.log("Сообщение отправлено:", data);
        })
        .catch((error) => {
          console.error("Ошибка:", error);
        });

      //   if (!response.ok) {
      //     throw new Error(`Ошибка WhatsApp: ${response.status}`);
      //   }

      //   const result = await response.json();
      //   if (!result.success) {
      //     throw new Error(result.message || "Ошибка отправки сообщения");
      //   }

      //   alert("Сообщение успешно отправлено в WhatsApp!");
    }

    // Очищаем форму
    e.target.reset();
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Произошла ошибка при отправке сообщения. Попробуйте позже.");
  }
});
