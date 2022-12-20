// находим в DOM-дереве форму добавления дракона по ID
const form = document.querySelector("#popup-form-item");

// isCheckboxOrRadio - вспомогательная функция для проверки типов
// элементов на чекбокс и радио-кнопку. Нужна, чтобы при переборе полей
// полученной формы в цикле forEach (куда залетает каждый элемент формы)
// в случае если это чекбокс или радиокнопка в 'name' записывалось не
// значение 'value' (как у прочих полей, у которых 'value' при отправке
// содержит введенные данные; в отличие от них для чекбокса и радио
// там всегда будет значение 'on'), а булевое значение свойства 'checked')

function isCheckboxOrRadio(type) {
    if (['checkbox', 'radio'].includes(type))
    return true;
};

// функция-обработчик формы

function retrieveFormValue(event) {
    event.preventDefault();

    const fields = document.querySelectorAll('input, select, textarea');
    const values = {}; // в этот объект запишутся все полученные данные из формы

    fields.forEach(field => {
        const {name, value, type, checked} = field;
        values[name] = isCheckboxOrRadio(type) ? checked : value;
    });

    const parentCardContainer = document.querySelector(".cards"); // находим родительский контейнер

    const cardInstance = new Card(values); // создаем новый экземпляр класса Card передав полученный объект value с данными из формы
    const newCardElement = cardInstance.getElement(); // вызываем метод класса Card, который клонирует шаблон с id #card-template и записывает туда значения в соответствующие теги значения name и img_link
    parentCardContainer.append(newCardElement);; // добавляем заполненную карточку в конец родительской обертки карточек

    document.querySelector(".popup-add-items").classList.remove("popup_active"); // закрываем форму
    form.reset(); // сбрасываем введенные данные в форму
}

form.addEventListener("submit", retrieveFormValue);
