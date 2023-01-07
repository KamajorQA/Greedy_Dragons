import { api } from "./api.js";
import { Card } from "./card.js";
import { Popup } from "./popup.js";
import { dragonInfoFill, dragonInfoEditHide } from "./infowindow.js";

const cardContainer = document.querySelector(".cards");

// GET запрос на сервер для получения данных о драконах и их запись в localStorage по ключу 'dragonsArray'
api.getAllDragons().then((dragonArray) => {
  localStorage.setItem("dragonsArray", JSON.stringify(dragonArray));
});

// проверка наличия уже записанного массива данных в localStorage для исключения ошибки при первой загрузке
// и загрузка с сервера при отсутствии ранее заполненного объекта localStorage
function checkLStorage() {
  let currentStorage = JSON.parse(localStorage.getItem("dragonsArray")); // преобразуем строку из localStorage в объект
  if (currentStorage && currentStorage.length) {
    // проходимся циклом по полученному из localStorage массиву для создания новой карточки на странице для каждого элемента массива
    currentStorage.forEach(function (dragonData) {
      const cardInstance = new Card(dragonData);
      const newCardElement = cardInstance.getElement();
      newCardElement.setAttribute("id", `${dragonData.id}`); // задаем каждой создаваемой карточке свой id из БД
      newCardElement.addEventListener("click", function showDragonInfo(e) {
        let freshStorage = JSON.parse(localStorage.getItem("dragonsArray")); // обращение к актуальному хранилищу, а не замкнутой дате (dragonData статична и не изменяется при обновлении карточки)
        const cardID = e.currentTarget.id; // получение ID карточки по клику на нее
        let freshDragonData = freshStorage.find((item) => {
          // поиск и возврат первого элемента массива с совпадающим значением свойства id с id карточки, по которой был клик
          return item.id == cardID;
        });
        dragonInfoFill(freshDragonData); // обновление попап-инфо-карточки свежими данными о драконе из localStorage
        dragonInfoShow.open(); // открытие инфо-карточки
      });
      cardContainer.append(newCardElement);
    });
  } else {
    api.getAllDragons().then((dragonArray) => {
      dragonArray.forEach(function (dragonData) {
        const cardInstance = new Card(dragonData);
        const newCardElement = cardInstance.getElement();
        newCardElement.setAttribute("id", `${dragonData.id}`);
        newCardElement.addEventListener("click", function showDragonInfo(e) {
          const cardID = e.currentTarget.id; // получение ID карточки по клику на нее
          api.getDragonByID(cardID).then((res) => {
            // данные заполняются по отдельному запросу, чтобы после обновления и повторного открытия инфо-карточки они были сразу актуальными, а не замершими по первому запросу в замыкании
            dragonInfoFill(res); // иначе реализация предполагала бы принудительную перезагрузку страницы в функции обновления данных updateDragonInfo через window.location.reload(), что ухудшает пользовательский опыт
          });
          dragonInfoShow.open(); // открытие инфо-карточки
        });
        cardContainer.append(newCardElement);
      });
    });
  }
}
checkLStorage();

const btnOpenPopupForm = document.querySelector("#add");
const btnOpenPopupLogin = document.querySelector("#login");

const popupAddDragon = new Popup("popup-add-items");
popupAddDragon.setEventListener();

const popupLogin = new Popup("popup-login");
popupLogin.setEventListener();
btnOpenPopupLogin.addEventListener("click", () => popupLogin.open());

document.addEventListener("keydown", (e) => {
  // добавлено закрытие попапа при нажатии Escape
  if (e.code === "Escape") popupAddDragon.close();
  if (e.code === "Escape") popupLogin.close();
  if (e.code === "Escape") dragonInfoShow.close();
  if (e.code === "Escape") dragonInfoEditHide(); // сокрытие допполей/кнопок инфоокна при редактировании
});

btnOpenPopupForm.addEventListener("click", () => {
  popupAddDragon.open();
});

const dragonInfoShow = new Popup("popup-dragon-info");
dragonInfoShow.setEventListener();

const isAuth = Cookies.get("email"); // Установка значения полученной при авторизации куки в константу isAuth для дальнейшей проверки
if (!!isAuth) {
  // проверка наличия куки авторизации, если пользователь ранее авторизовался, то форма авторизации закрывается, кнопка логина скрывается
  popupLogin.close();
  btnOpenPopupLogin.classList.add("visually-hidden");
}

export { btnOpenPopupLogin, popupLogin, dragonInfoShow };
