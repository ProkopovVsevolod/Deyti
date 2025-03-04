// Получаем элементы модального окна и кнопки
const modal = document.getElementById("modal");
const modalMobile = document.getElementById("modalMobile");
const body = document.getElementById("body");
const openModalBtn = document.getElementById("openModal");
const openModalMobileBtn = document.getElementById("openModalMobile");
const closeModalBtn = document.getElementById("closeModal");

const CONFIG = {
    BOT_TOKEN: '7679659463:AAHye7GgzphV-P0Jb8Pveh9EYnmbQI7ikKE',
    CHAT_ID: '', // Здесь нужно указать ваш chat_id
    WHATSAPP_API: 'YOUR_WHATSAPP_API_URL'
};

// Когда пользователь нажимает на кнопку, открываем модальное окно
openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
})

openModalMobileBtn.addEventListener("click", () => {
    modalMobile.classList.toggle('active');;

    if (modalMobile.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
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

function getFormData() {
    return {
        name: document.getElementById('name').value,
        goals: {
            wantToMeet: document.getElementById('wantToMeet').checked,
            wantToTeam: document.getElementById('wantToTeam').checked
        },
        wishes: document.getElementById('wishes').value,
        personalData: document.getElementById('personalData').checked,
        recall: document.getElementById('recall').checked
    };
}

// Функция для форматирования сообщения
function formatMessage(formData) {
    return `
        Новое сообщение от пользователя:
        
        Имя: ${formData.name}
        
        Цели:
        ${formData.goals.wantToMeet ? '• Хочу встречу!' : ''}
        ${formData.goals.wantToTeam ? '• Хочу в команду!' : ''}
        
        ${formData.wishes ? `Пожелания:\n${formData.wishes}` : ''}
        
        ${formData.recall ? 'Требуется перезвонить!' : ''}
    `;
}

document.querySelectorAll('input[name="chooseCategory"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // Если чекбокс отмечен
        if (this.checked) {
            // Снимаем все остальные чекбоксы с этого же имени
            document.querySelectorAll('input[name="chooseCategory"]').forEach(otherCheckbox => {
                if (otherCheckbox !== this) {
                    otherCheckbox.checked = false;
                }
            });
        }
    });
});


document.querySelector('.modal-content__form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Проверка согласия на обработку данных
    if (!document.getElementById('personalData').checked) {
        alert('Пожалуйста, дайте согласие на обработку персональных данных');
        return;
    }
    
    // Получаем выбранный метод отправки
    const submitButton = e.submitter;
    const isTelegram = submitButton.value === 'Telegram';
    
    try {
        const formData = getFormData();
        const message = formatMessage(formData);
        
        if (isTelegram) {
            // Отправка в Telegram
            const response = await fetch(`https://api.telegram.org/bot${CONFIG.BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: CONFIG.CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
            
            const result = await response.json();
            if (result.ok) {
                alert('Сообщение успешно отправлено в Telegram!');
            } else {
                throw new Error(result.description);
            }
        } else {
            // Отправка в WhatsApp
            const response = await fetch(CONFIG.WHATSAPP_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    phone: formData.name // Здесь должен быть номер телефона
                })
            });
            
            const result = await response.json();
            if (result.success) {
                alert('Сообщение успешно отправлено в WhatsApp!');
            } else {
                throw new Error(result.message);
            }
        }
        
        // Очищаем форму
        e.target.reset();
    } catch (error) {
        console.error('Ошибка при отправке:', error);
        alert('Произошла ошибка при отправке сообщения. Попробуйте позже.');
    }
});
