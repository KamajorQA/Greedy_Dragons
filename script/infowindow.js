// функция для заполнения инфоокна данными получаемыми из резолва fetch-запроса на получение id по клику на карточку:

const dragonInfoFill = function (resolve) {
document.getElementById('dragon-info_image').src = resolve.image;
document.getElementById('dragon-info_id').value = resolve.id;
document.getElementById('dragon-info_img_link').value = resolve.image;
document.getElementById('dragon-info_name').value = resolve.name;
document.getElementById('dragon-info_age').value = resolve.age;
document.getElementById('dragon-info_rate').value = resolve.rate;
document.getElementById('dragon-info_favorite').checked = resolve.favorite;
document.getElementById('dragon-info_description-textarea').innerText = resolve.description;
document.getElementById('dragon-info_desc').innerText = resolve.description;
}
