"use strict"

const API_URL = 'http://json.maysalon.ru';

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
                  <div class="product-dropdown" data-price="${this.price}" data-name="${this.title}" data-id="${this.id}" data-images="${this.images}">
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

            this.makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
                this.goods = JSON.parse(goods);
            }).catch(error => {
                alert('Произошла ошибка на сервере!');
            });

            setTimeout(() => {
                if (this.goods) {
                    resolve(this.goods);
                } else {
                    reject('Слишком долгий ответ от сервера');
                }
            }, 300);
        }).then(() => {
            this.render();
        }).catch(error => {
            alert(error);
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
                    if (xhr.readyState === 4) {
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






//Получаем сумму всех товаров
//list.getSum();





