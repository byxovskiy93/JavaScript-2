"use strict";

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const DELETE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json';
const BASKET_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json';
const ADD_URL    = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json';

const RANDOM_INTAGER =  Math.random() * 100;

class GoodsItem {


    constructor(id,title,price,rating,images = 'images/product/no-images.png') {
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.images = images;
        this.price = price;
    }

    render() {
        return `<div class="product"><div class="product-body">` +
            `<div class="item-head">
            <div class="item-images"><img src="${this.images}"></div>
            </div>` +
            `<div class="item-body">
            <div class="item-title"><h3>${this.title}</h3></div>
            <div class="item-price">${this.price} <i class="fas fa-ruble-sign"></i></div>
            </div>`+
            `<div class="item-footer"><div class="item-rating">${this.ratingIcon()}</div></div>` +
            `</div>
            <div class="product-select">
                  <div class="product-dropdown" data-price="${this.price}" data-name="${this.title}" data-id="${this.id}">
                  <p class="issue">Добавить в корзину</p>
               </div>
            </div>
           </div>`;
    }

    ratingIcon(){
        let readyIconRating = '';
        for(let i = 0; i < 5;++i){
            if(i < this.rating){
                readyIconRating+= '<i class="fas fa-star"></i>';
            }else{
                readyIconRating+= '<i class="far fa-star"></i>';
            }
        }
        return readyIconRating;
    }
}

class GoodsList {

    constructor() {
        this.goods = [];
    }

    fetchGoods() {

        new Promise((resolve, reject) => {

            if (RANDOM_INTAGER <= 60) {

                this.makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
                    this.goods = JSON.parse(goods);
                }).catch(error => {
                    alert('Произошла ошибка на сервере!');
                });

                setTimeout(() => {
                    if (this.goods) {
                        resolve(this.goods);
                    } else {
                        reject('Слишком долгий ответ от сервера!');
                    }
                }, 300);
            } else {
                reject();
            }


        }).then(() => {
            this.render();
        }).catch(error => {
            let randomInt = Math.floor(Math.random() * 2) + 1;
            if (randomInt === 1) {
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('Слишком долгий ответ от сервера!');
                    }, 3000)
                }).then(e => {
                    Toastify({
                        text: e,
                        className: "info",
                        close: true,
                        duration: 5000,
                        backgroundColor: '#cce5ff'
                    }).showToast();
                }).catch(e => {
                    console.log(e);
                });
            } else {
                new Promise((resolve, reject) => {
                        resolve('Файл отсутствует на сервере!');
                }).then(e => {
                    Toastify({
                        text: e,
                        className: "error",
                        close: true,
                        duration: 5000,
                        backgroundColor: '#f8d7da'
                    }).showToast();
                }).catch(e => {
                    console.log(e);
                });
            }


        });
    }


    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product,good.product_name, good.price,good.rating,good.images);
            listHtml += goodItem.render();
        });
        document.querySelector('.products-list').innerHTML = listHtml;
    }


    getSum(){
        let sum = 0;
        this.goods.forEach(good => {
            sum+= parseInt(good.price);
        });
        return sum;
    }


    makeGETRequest(url) {
        return new Promise((resolve, reject) => {
            var xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                }else{
                    reject(xhr.statusText);
                }
            };
            xhr.open('GET', url, true);
            xhr.send();
        })
    }
}

const list = new GoodsList();

list.fetchGoods();



class Basket {

    constructor(){
        this.basket = [];
        this.count = 0;
        this.amount = 0
    }

    addItem(object){

        this.send(ADD_URL).then(data => {

            let id = object.getAttribute('data-id');
            let name =  object.getAttribute('data-name');
            let price =  object.getAttribute('data-price');

            if(!!this.basket[id]){
                this.basket[id].addCount();
                this.count+=1;
            }else{
                this.basket[id] = new BasketItem(id,name,price);
                this.count+=1;
            }

            document.querySelector('.cart-count').innerHTML = this.count;

            document.querySelector('.amount-price').innerHTML = this.getSum()+' <i class="fas fa-ruble-sign"></i>';

            this.getListItem();

        }).catch(error => {
            alert('Произошла ошибка на сервере!');
        });

    }

    plusCount(id){
        if(this.count){
            this.basket[id].addCount();
            ++this.count;
        }

        document.querySelector('.cart-count').innerHTML = this.count;
        document.querySelector('.amount-price').innerHTML = this.getSum()+' <i class="fas fa-ruble-sign"></i>';

        this.getListItem();
    }

    minusCount(id){

        if(this.basket[id].count !== 1){
            this.basket[id].removeCount();
            --this.count;
        }

        document.querySelector('.cart-count').innerHTML = this.count;
        document.querySelector('.amount-price').innerHTML = this.getSum()+' <i class="fas fa-ruble-sign"></i>';

        this.getListItem();
    }

    deleteItem(id){
        this.send(DELETE_URL).then(data => {
            this.count = this.count - this.basket[id].count;
            delete this.basket[id];
            document.querySelector('.cart-count').innerHTML = this.count;
            document.querySelector('.amount-price').innerHTML = this.getSum()+' <i class="fas fa-ruble-sign"></i>';
            this.getListItem();
        }).catch(error => {
            alert('Произошла ошибка на сервере!');
        });
    }

    getListItem(){
        this.send(BASKET_URL).then(data => {
            this.render()
        }).catch(error => {
            alert('Произошла ошибка на сервере!');
        });
    }

    render() {
        let listHtml = '';
        this.basket.forEach(basketItem => {
            listHtml += basketItem.render();
        });
        document.querySelector('.card-list').innerHTML = listHtml;
    }

    send(url){
        return new Promise((resolve, reject) => {
            var xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                }else{
                    reject(xhr.statusText);
                }
            };

            xhr.open('GET', url, true);
            xhr.send();
        })
    }

    getSum(){
        this.amount = 0;

        this.basket.forEach(basketItem => {
            this.amount += basketItem.getSum();
        });

        return this.amount;
    }


}

class BasketItem{

    constructor(id,title,price,count = 1,images = 'images/product/no-images.png') {
        this.id_product = id;
        this.product_name = title;
        this.images = images;
        this.price =  parseInt(price);
        this.count =  parseInt(count);
    }

    getSum(){
        return this.price * this.count;
    }

    addCount(){
        this.count+=1;
    }

    removeCount(){
        if(this.count !== 1){
            --this.count;
        }
    }

    render() {
        return `<div class="item" data-id="${this.id_product}">
                    <div class="buttons delete-basket-item">
                        <span class="delete-btn"></span>
                    </div>

                    <div class="image">
                        <img src="${this.images}" alt="" />
                    </div>

                    <div class="description">
                        <span>${this.product_name}</span>
                    </div>

                    <div class="quantity">
                        <button class="plus-btn" type="button" name="button">
                            <img src="images/plus.svg" alt="" />
                        </button>
                        <input type="text" name="name" value="${this.count}">
                        <button class="minus-btn" type="button" name="button">
                            <img src="images/minus.svg" alt="" />
                        </button>
                    </div>

                    <div class="total-price">${this.price * this.count} <i class="fas fa-ruble-sign"></i></div>
                </div>`;
    }

}


const BasketObject = new Basket();

let modalShopCard = document.querySelector('.shopping-cart');

const cardButton = document.querySelector('.static-basket-block').addEventListener('click',(e) => {
    BasketObject.getListItem();
    modalShopCard.setAttribute("style", "display:flex;");
});

const buttonCloseCardModal = document.querySelector('.close-button').addEventListener('click',(e) => {
    modalShopCard.setAttribute("style", "display:none;");
});

//Добавить в корзину
document.addEventListener('click', e => {

    if (!e.target.matches('.product-dropdown') && !e.target.parentElement.matches('.product-dropdown')) return;

    e.preventDefault();

    if(e.target.matches('.product-dropdown')){
        BasketObject.addItem(e.target);
    }else{
        BasketObject.addItem(e.target.parentElement);
    }

}, false);

//Отслеживаем удаление элемента из корзины
document.addEventListener('click', e => {

    if (!e.target.matches('.delete-basket-item') && !e.target.parentElement.matches('.delete-basket-item')) return;

    e.preventDefault();

    if(e.target.matches('.delete-basket-item')){
        BasketObject.deleteItem(e.target.parentElement.getAttribute('data-id'));
    }else{
        BasketObject.deleteItem(e.target.parentElement.parentElement.getAttribute('data-id'));
    }

}, false);

//Отслеживаем нажатие на кнопку + в корзине товаров
document.addEventListener('click', e => {

    if (!e.target.matches('.plus-btn') && !e.target.parentElement.matches('.plus-btn')) return;

    e.preventDefault();

    if(e.target.matches('.plus-btn')){
        BasketObject.plusCount(e.target.parentElement.parentElement.getAttribute('data-id'));
    }else{
        BasketObject.plusCount(e.target.parentElement.parentElement.parentElement.getAttribute('data-id'));
    }

}, false);

//Отслеживаем нажатие на кнопку - в корзине товаров
document.addEventListener('click', e => {

    if (!e.target.matches('.minus-btn') && !e.target.parentElement.matches('.minus-btn')) return;

    e.preventDefault();

    if(e.target.matches('.minus-btn')){
        BasketObject.minusCount(e.target.parentElement.parentElement.getAttribute('data-id'));
    }else{
        BasketObject.minusCount(e.target.parentElement.parentElement.parentElement.getAttribute('data-id'));
    }

}, false);


//Получаем сумму всех товаров
//list.getSum();





