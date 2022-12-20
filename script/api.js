const CONFIG_API = {
	url: 'https://cats.petiteweb.dev/api/single/greedy_dragons',
	headers: {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	},
};

class Api {
	constructor(config) {
	this._url = config.url;
	this._headers = config.headers;
	}
 	_onResponse(res) {
    		return res.ok
      		? res.json()
      		: Promise.reject({ ...res, message: 'Server error'});
  	}
	getAllDragons() {
	fetch(`${this._url}/show`, {
		method: 'GET'
	}).then(this._onResponse);
	}
	addNewDragon(data) {
	fetch(`${this._url}/add`, {
		method: 'POST',
		headers: this._headers, 
		body: JSON.stringify(data),
	}).then(this._onResponse);
	}
	getIDs() {
	fetch(`${this._url}/ids/`, {
		method: "GET"
	}).then(this._onResponse);
	}
	getDragonByID(id) {
	fetch(`${this._url}/show/${id}`, {
		method: "GET"
	}).then(this._onResponse);
	}
	updateDragon(id, data) {
	data = {...data, id: id}; // запрет на изменение id
	fetch(`${this._url}/update/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: this._headers,
	}).then(this._onResponse);
	}
	deleteDragon(id) {
	fetch(`${this._url}/delete/${id}`, {
		method: "DELETE"
	}).then(this._onResponse);
	}
}

const api = new Api(CONFIG_API);

// первичная инициализация БД с созданием каждой записи из массива dragons. Выполняется 1 раз.
//dragons.forEach(function(element) {
//	api.addNewDragon(element);
//})


// проверка всех CRUD функций
// api.addNewDragon({id: 53217, name: 'Nibbler', age: 1000});
// api.updateDragon(53217, {id: 1, rate: 6, description: 'Вселенная: Футурама. Раса: Нибблонианец. Хозяин: Лила. Домашняя планета: Этерниум. "За время произношения одной буквы его имени триллиарды миров вспыхнут и уйдут в небытие"'});
// api.getDragonByID(53217);
// api.getIDs();
// api.getAllDragons();
// api.deleteDragon(53217);
// api.getAllDragons();


// инфо из Swagger'а (документация по используемому API):
// Адрес API
// https://cats.petiteweb.dev

// GET - получить информацию обо всех объектах
// https://cats.petiteweb.dev/api/single/<name>/show

// GET - получить массив всех существующих id
// https://cats.petiteweb.dev/api/single/<name>/ids

// GET - получить информацию об одном объекте по id
// https://cats.petiteweb.dev/api/single/<name>/show/<id объекта>

// POST - добавить новый объект (id, name - обязательно!)
// https://cats.petiteweb.dev/api/single/<name>/add

// PUT - изменить информацию об объекте (запрещено менять id и name)
// https://cats.petiteweb.dev/api/single/<name>/update/<id объекта>

// DELETE - удалить объект
// DELETE https://cats.petiteweb.dev/api/single/<name/delete/<id объекта>

// Роутеры:
// GET https://cats.petiteweb.dev/api/single/:user/show - отобразить все объекты
// GET https://cats.petiteweb.dev/api/single/:user/show/:id- отобразить все возможные айди объектов
// GET https://cats.petiteweb.dev/api/single/:user/ids - отобразить конкретный объект
// POST https://cats.petiteweb.dev/api/single/:user/add - добавить объект
// PUT https://cats.petiteweb.dev/api/single/:user/update/:id - изменить информацию об объекте
// DELETE https://cats.petiteweb.dev/api/single/:user/delete/:id - удалить объект из базы данных