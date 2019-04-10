"use strict"

class GoodsItem {

    constructor(title,price,rating,images = 'images/product/no-images.png') {
        this.title = title;
        this.rating = rating;
        this.images = images;
        this.price = price;
    }

    render() {
        return `<div class="product-item">` +
            `<div class="item-head">
            <div class="item-images"><img src="${this.images}"></div>
            </div>` +
            `<div class="item-body">
            <div class="item-title"><h3>${this.title}</h3></div>
            <div class="item-price">${this.price} <i class="fas fa-ruble-sign"></i></div>
            </div>`+
            `<div class="item-footer"><div class="item-rating">${this.ratingIcon()}</div></div>` +
            `</div>`;
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
        this.goods = [
            {title:'Бизиборд "Шестерёнки"',price:'600',rating: 0},
            {title:'Бизиборд "Часики"',price:'700',rating: 1,images: 'images/product/2.jpg'},
            {title:'Бизиборд "Вундеркинд"',price:'400',rating: 3,images: 'images/product/3.jpg'},
            {title:'Бизиборд "Развивайка"',price:'900',rating: 5,images: 'images/product/4.jpg'},
            {title:'Бизиборд "Весёлая Радуга"',price:'1200',rating: 2,images: 'images/product/5.jpg'},
            {title:'Бизиборд "Вагончики"',price:'1600',images: 'images/product/6.jpg'},
            {title:'Бизиборд "Веселые дверки"',price:'1900',rating: 5,images: 'images/product/7.jpg'},
            {title:'Бизиборд "Чудо-теремок"',price:'780',rating: 5,images: 'images/product/8.jpg'}
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price,good.rating,good.images);
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

}

const list = new GoodsList();

list.fetchGoods();
list.render();

//Получаем сумму всех товаров
list.getSum();

class Basket {

    constructor(){
       this.basketArray = [];
    }

    addItem(){

    }

    deleteItem(id){

    }

    getSum(){

    }

}

class BasketItem{

    constructor(title,price,rating,images,count) {
        this.title = title;
        this.rating = rating;
        this.images = images;
        this.price =  parseInt(price);
        this.count =  parseInt(count);
    }

    getSum(){
        return this.price * this.count;
    }

}

