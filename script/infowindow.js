// получаем конкретные поля/лейблы/кнопки

const dInfoImage = document.getElementById("dragon-info_image");
const dInfoId = document.getElementById("dragon-info_id");
const dInfoImgLink = document.getElementById("dragon-info_img_link");
const dInfoName = document.getElementById("dragon-info_name");
const dInfoAge = document.getElementById("dragon-info_age");
const dInfoRate = document.getElementById("dragon-info_rate");
const dInfoFavorite = document.getElementById("dragon-info_favorite");
const dInfoDescriptionTextarea = document.getElementById(
  "dragon-info_description-textarea"
);
const dInfoDescDiv = document.getElementById("dragon-info_desc");

const dInfoIdLabel = document.getElementById("dragon-info_id-label");
const dInfoImgLinkLabel = document.getElementById("dragon-info_img_link-label");
const dInfoDescriptionLabel = document.getElementById(
  "dragon-info_description-label"
);
const dInfoUpdBtn = document.getElementById("dragon-info_update");
const dInfoDelBtn = document.getElementById("dragon-info_delete");

// функция для заполнения инфоокна данными получаемыми из резолва fetch-запроса на получение id по клику на карточку:
const dragonInfoFill = function (resolve) {
  dInfoImage.src = resolve.image;
  dInfoId.value = resolve.id;
  dInfoImgLink.value = resolve.image;
  dInfoName.value = resolve.name;
  dInfoAge.value = resolve.age;
  dInfoRate.value = resolve.rate;
  dInfoFavorite.checked = resolve.favorite;
  dInfoDescriptionTextarea.innerText = resolve.description;
  dInfoDescDiv.innerText = resolve.description;
};

// массив всех input элементов в инфо-окне
let dInfoFields = [
  dInfoId,
  dInfoImgLink,
  dInfoName,
  dInfoAge,
  dInfoRate,
  dInfoFavorite,
];

// функция перебора всех input полей и установка им аттрибута disabled (блокировка)
function disableDInfoInputs() {
  dInfoFields.forEach((item) => {
    item.disabled = true;
  });
}

// функция перебора всех input полей и снятие аттрибута disabled (разблокировка)
function enableDInfoInputs() {
  dInfoFields.forEach((item) => {
    item.disabled = false;
  });
}

// функция переключения отображения допполей (и сокрытия дива с описанием) при редактировании инфо-карточки
const dragonInfoEditShow = function () {
  enableDInfoInputs(); // коллбэк для разблокировки input элементов
  dInfoId.classList.toggle("dragon-info__input_active");
  dInfoImgLink.classList.toggle("dragon-info__input_active");
  dInfoIdLabel.classList.toggle("dragon-info__input_active");
  dInfoImgLinkLabel.classList.toggle("dragon-info__input_active");
  dInfoDescriptionLabel.classList.toggle("dragon-info__input_active");
  dInfoDescriptionTextarea.classList.toggle("dragon-info__input_active");
  dInfoUpdBtn.classList.toggle("dragon-info__input_active");
  dInfoDelBtn.classList.toggle("dragon-info__input_active");
  dInfoDescDiv.classList.toggle("dragon-info__input_hidden");
};

// функция сокрытия допполей (и отображения дива с описанием) при завершении редактирования инфо-карточки
const dragonInfoEditHide = function () {
  disableDInfoInputs(); // коллбэк для блокировки input элементов
  dInfoId.classList.remove("dragon-info__input_active");
  dInfoImgLink.classList.remove("dragon-info__input_active");
  dInfoIdLabel.classList.remove("dragon-info__input_active");
  dInfoImgLinkLabel.classList.remove("dragon-info__input_active");
  dInfoDescriptionLabel.classList.remove("dragon-info__input_active");
  dInfoDescriptionTextarea.classList.remove("dragon-info__input_active");
  dInfoUpdBtn.classList.remove("dragon-info__input_active");
  dInfoDelBtn.classList.remove("dragon-info__input_active");
  dInfoDescDiv.classList.remove("dragon-info__input_hidden");
};

// находим кнопку редактирования инфо-карточки
const btnDragonInfoEdit = document.querySelector(".popup__edit");
//вешаем на нее обработчик отображения допполей
btnDragonInfoEdit.addEventListener("click", () => dragonInfoEditShow());

// находим кнопку закрытия инфо-окна
const btnDragonInfoClose = document.querySelector(".popup-dragon-info__close");
//вешаем на нее обработчик сокрытия допполей и блокировки input'ов
btnDragonInfoClose.addEventListener("click", () => dragonInfoEditHide());

// находим форму обновления данных о драконе в документе
const updateForm = document.querySelector("#popup-form-dragon");

// функция-обработчик формы редактирования инфо-карточки, сбора значений input-полей и обновления дракона в БД
const updateDragonInfo = function (event) {
  event.preventDefault();
  const fields = updateForm.querySelectorAll("input, select, textarea"); // отсев интерактивных тегов в форме обновления инфо-карточки
  const values = {}; // в этот объект запишутся все полученные данные из формы
  fields.forEach((field) => {
    const { name, value, type, checked } = field;
    values[name] = isCheckboxOrRadio(type) ? checked : value;
  });

  const currentCard = document.getElementById(`${values.id}`); // находим на странице связанную карточку по id
  const cardTitle = currentCard.querySelector(".card__name"); // находим заголовок внутри карточки
  const cardImage = currentCard.querySelector(".card__image"); // находим img внутри карточки
  // обновляем данные в превью карточки на странице

  cardImage.src = values.image;
  cardTitle.textContent = values.name;

  // проверяем наличие лайка и добавляем/убираем огонек с превью-карточки
  if (!!values.favorite) {
    let ignite = document.createElement("button");
    ignite.innerHTML = '<i class="fa-solid fa-fire-flame-curved"></i>';
    ignite.className = "card__like";
    currentCard.append(ignite);
  } else {
    if (!!currentCard.querySelector(".card__like")) {
      currentCard.querySelector(".card__like").remove();
    }
  }

  api.updateDragon(values.id, values); // отправляем на сервер PUT запрос на обновление дракона в БД

  dragonInfoShow.close(); // закрываем карточку по окончании редактирования
  dragonInfoEditHide(); // скрываем допполя/кнопки инфоокна по окончании редактирования, чтобы они не отображались при повторном открытии карточки
};

// на кнопку обновления информации в инфо-карточке вешаем обработчик сбора данных и отправки на сервер
updateForm.addEventListener("submit", (e) => updateDragonInfo(e));

// функция-обработчик формы редактирования инфо-карточки, сбора значений input-полей и обновления дракона в БД
const deleteDragonInfo = function (event) {
  event.preventDefault();
  const fields = updateForm.querySelectorAll("input, select, textarea"); // отсев интерактивных тегов в форме обновления инфо-карточки
  const values = {}; // в этот объект запишутся все полученные данные из формы
  fields.forEach((field) => {
    const { name, value, type, checked } = field;
    values[name] = isCheckboxOrRadio(type) ? checked : value;
  });
  const currentCard = document.getElementById(`${values.id}`); // находим на странице связанную карточку по id
  currentCard.remove(); // удаляем текущую карточку из DOM дерева
  api.deleteDragon(values.id); // отправляем на сервер DELETE запрос

  dragonInfoShow.close();
  dragonInfoEditHide();
};

// на кнопку удаления дракона в инфое-окне вешаем обработчик удаления
dInfoDelBtn.addEventListener("click", (e) => deleteDragonInfo(e));
