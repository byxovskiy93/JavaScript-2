
const PRODUCTS = [
    {title:'Бизиборд "Шестерёнки"',price:'600 <i class="fas fa-ruble-sign"></i>',rating: 0,images: 'images/product/1.jpg'},
    {title:'Бизиборд "Часики"',price:'700 <i class="fas fa-ruble-sign"></i>',rating: 1,images: 'images/product/2.jpg'},
    {title:'Бизиборд "Вундеркинд"',price:'400 <i class="fas fa-ruble-sign"></i>',rating: 3,images: 'images/product/3.jpg'},
    {title:'Бизиборд "Развивайка"',price:'900 <i class="fas fa-ruble-sign"></i>',rating: 5,images: 'images/product/4.jpg'},
    {title:'Бизиборд "Весёлая Радуга"',price:'1200 <i class="fas fa-ruble-sign"></i>',rating: 2,images: 'images/product/5.jpg'},
    {title:'Бизиборд "Вагончики"',price:'1600 <i class="fas fa-ruble-sign"></i>',rating: 5,images: 'images/product/6.jpg'},
    {title:'Бизиборд "Веселые дверки"',price:'1900 <i class="fas fa-ruble-sign"></i>',rating: 5,images: 'images/product/7.jpg'},
    {title:'Бизиборд "Чудо-теремок"',price:'780 <i class="fas fa-ruble-sign"></i>',rating: 5,images: 'images/product/8.jpg'}
];

const renderProductItem = function(title,price,rating,images) {

    return `<div class="product-item">` +
        `<div class="item-head">
            <div class="item-images"><img src="${images}"></div>
         </div>` +
        `<div class="item-body">
            <div class="item-title"><h3>${title}</h3></div>
            <div class="item-price">${price}</div>
        </div>`+
        `<div class="item-footer"><div class="item-rating">${rating}</div></div>` +
        `</div>`
};

const renderProductList = function (list) {
    const productsList = list.map(function (item) {
       return renderProductItem(item.title,item.price,ratingTransformIcon(item.rating),item.images);
    });
    document.querySelector('.products-list').innerHTML = productsList.join('');
};

const ratingTransformIcon = function (int) {
    let readyIconRating = '';

    for(let i = 0; i < 5;++i){
        if(i < int){
            readyIconRating+= '<i class="fas fa-star"></i>';
        }else{
            readyIconRating+= '<i class="far fa-star"></i>';
        }
    }
    return readyIconRating;
};

renderProductList(PRODUCTS);