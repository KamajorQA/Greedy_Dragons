class Card {
  constructor(dragonInfo) {
    this._data = dragonInfo;
  }
  _getTemplate() { // получение содержимого шаблона (тега template) в виде узла DOM-дерева
    return document
      .querySelector("#card-template")
      .content.querySelector(".card");
  }
  getElement() {
    this.element = this._getTemplate().cloneNode(true); // клонирование контента узла из шаблона
    const cardTitle = this.element.querySelector(".card__name");
    const cardImage = this.element.querySelector(".card__image");
    const cardIgnite = this.element.querySelector(".card__like");
    if ((this._data.favourite === false) || (this._data.favorite === false)) { //проверка отсутствия лайка у добавляемого объекта
	  cardIgnite.remove() // удаление огонька при отсутствии лайка (признания господства)
    };

    cardImage.src = this._data.img_link;
    cardTitle.textContent = this._data.name;
    return this.element;
  }
}
