import { btnOpenPopupLogin, popupLogin, dragonInfoShow } from "./index.js";
import { Card } from "./card.js";
import { api } from "./api.js";
import { dragonInfoFill } from "./infowindow.js";

const form = document.querySelector("#popup-form-item");

function isCheckboxOrRadio(type) {
  if (["checkbox", "radio"].includes(type)) return true;
}

function retrieveFormValue(event) {
  event.preventDefault();

  const fields = form.querySelectorAll("input, select, textarea");
  const values = {}; // в этот объект запишутся все полученные данные из формы

  fields.forEach((field) => {
    const { name, value, type, checked } = field;
    values[name] = isCheckboxOrRadio(type) ? checked : value;
  });

  const parentCardContainer = document.querySelector(".cards"); // находим родительский контейнер

  const cardInstance = new Card(values); // создаем новый экземпляр класса Card передав полученный объект value с данными из формы
  const newCardElement = cardInstance.getElement(); // вызываем метод класса Card, который клонирует шаблон с id #card-template и записывает туда значения в соответствующие теги значения name и image
  newCardElement.setAttribute("id", `${values.id}`); // сразу добавляем id вновь созданной карточке

  newCardElement.addEventListener("click", function showDragonInfo(e) {
    // наполнение и открытие инфоокна вновь созданной карточки
    const cardID = e.currentTarget.id; // получение ID карточки по клику на нее
    api.getDragonByID(cardID).then((res) => {
      dragonInfoFill(res);
    }); // обновление попап-инфо-карточки
    dragonInfoShow.open(); // открытие инфо-карточки
  });

  parentCardContainer.append(newCardElement); // добавляем заполненную карточку в конец родительской обертки карточек

  // обновляем массив драконов в localStorage (добавляем новый элемент)
  let drawDragons = JSON.parse(localStorage.getItem("dragonsArray")); // получаем в переменную распарсенный массив исходных драконов из localStorage
  drawDragons.push(values); // добавляем в конец массива объект со вновь созданным драконом
  localStorage.setItem("dragonsArray", JSON.stringify(drawDragons)); // перезаписываем объект localStorage с учетом внесенных изменений (добавления элемента)

  document.querySelector(".popup-add-items").classList.remove("popup_active"); // закрываем форму
  form.reset(); // сбрасываем введенные данные в форму

  api.addNewDragon(values); // отправляем на сервер POST запрос на добавление дракона в БД
}

form.addEventListener("submit", retrieveFormValue);

// обработка логина (создание куки с данными введенного email'а)
const formLogin = document.querySelector("#popup-form-login");

function retrieveLoginData(event) {
  event.preventDefault();

  const fields = formLogin.querySelectorAll("input, select, textarea");
  const values = {};
  fields.forEach((field) => {
    const { name, value, type, checked } = field;
    values[name] = isCheckboxOrRadio(type) ? checked : value; // проверка чекбокса оставлена на будущее, если будет добавлена, например, галка о принятии terms of use или подобное
  });

  //  document.cookie = `email=${values.email}; samesite=strict; secure`; // обычное создание куки
  Cookies.set("email", `email=${values.email}`, { expires: 1 }); // создание куки через библиотеку js-cookie со сроком действия 1 день.

  document.querySelector(".popup-login").classList.remove("popup_active");
  formLogin.reset();
  btnOpenPopupLogin.classList.add("visually-hidden"); // скрываем кнопку логина после авторизации
  popupLogin.close();
}

formLogin.addEventListener("submit", retrieveLoginData);

export { isCheckboxOrRadio };
export { form, formLogin };
