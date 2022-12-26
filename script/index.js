const cardContainer = document.querySelector(".cards");

api.getAllDragons().then((dragonArray) => {
  dragonArray.forEach(function (dragonData) {
    const cardInstance = new Card(dragonData);
    const newCardElement = cardInstance.getElement();
    newCardElement.setAttribute("id", `${dragonData.id}`); // задаем каждой создаваемой карточке свой id из БД
    newCardElement.addEventListener("click", function showDragonInfo(e) {
      const cardID = e.currentTarget.id; // получение ID карточки по клику на нее
      api.getDragonByID(cardID).then((res) => {
        dragonInfoFill(res);
      }); // обновление попап-инфо-карточки
      dragonInfoShow.open(); // открытие инфо-карточки
    });
    cardContainer.append(newCardElement);
  });
});

const btnOpenPopupForm = document.querySelector("#add");
const btnOpenPopupLogin = document.querySelector("#login");

const formDragonAdd = document.querySelector("#popup-form-item");

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
});

btnOpenPopupForm.addEventListener("click", () => {
  popupAddDragon.open();
});

const dragonInfoShow = new Popup("popup-dragon-info");
dragonInfoShow.setEventListener();
