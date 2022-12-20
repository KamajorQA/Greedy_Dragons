const cardContainer = document.querySelector(".cards");

dragons.forEach(function (dragonData) {
  const cardInstance = new Card(dragonData);
  const newCardElement = cardInstance.getElement();
  cardContainer.append(newCardElement);
});

const btnOpenPopupForm = document.querySelector("#add");
const formDragonAdd = document.querySelector("#popup-form-item");

const popupAddDragon = new Popup("popup-add-items");
popupAddDragon.setEventListener();
document.addEventListener("keydown", (e) => { // добавлено закрытие попапа при нажатии Escape
      if (e.code === "Escape") popupAddDragon.close();
      });

btnOpenPopupForm.addEventListener("click", () => {
  popupAddDragon.open();
});

// api.getAllDragons().then((data) => console.log(data));