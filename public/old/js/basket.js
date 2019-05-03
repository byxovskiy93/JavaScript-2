"use strict";

const DELETE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json';
const BASKET_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json';
const ADD_URL    = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json';

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
          let images = object.getAttribute('data-images');

          if(!!this.basket[id]){
              this.basket[id].addCount();
              this.count+=1;
          }else{
              this.basket[id] = new BasketItem(id,name,price,images);
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

    constructor(id,title,price,images,count = 1) {
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






