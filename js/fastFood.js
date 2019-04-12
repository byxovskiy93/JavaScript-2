"use strict"


class Calculate {

    constructor(){

        this.hamburgerArray = [
            new Hamburger('Маленький',50,20,'images/product/hamburger-small.png'),
            new Hamburger('Большой',100,40,'images/product/hamburger-big.png')
        ];

        this.fillingArray = [
            new Filling('С сыром',10,20),
            new Filling('С салатом',20,5),
            new Filling('С картофелем',15,10)
        ];

        this.additionallyArray = [
            new Additionally('Приправа',15,0),
            new Additionally('Майонез',20,5)
        ];

        this.selectHamburgerOption = [];
        this.selectFillingOption = [];
        this.selectAdditionallyOption = [];

        this.imagesHamburger = document.querySelector('.images-hamburger');

        this.render();
    }

    render(){

        let hamBurger = '';
        let filling = '';
        let additionally = '';

        let firstHamburger = this.hamburgerArray[0];

        this.hamburgerArray.forEach((item,key) => {
            hamBurger += `<option value=${key}>${item.title}</option>`;
        });

        document.querySelector('#hamBurger').innerHTML = hamBurger;
        this.imagesHamburger.innerHTML = `<img src=${firstHamburger.images}></img>`;


        this.fillingArray.forEach((item,key) => {
            filling += `<option value=${key}>${item.title}</option>`;
        });

        document.querySelector('#filling').innerHTML = filling;


        this.additionallyArray.forEach((item,key)=> {
            additionally += `<option value=${key}>${item.title}</option>`;
        });

        document.querySelector('#additionally').innerHTML = additionally;

    }

    logic(){
        let selected;
        let values;

        this.selectHamburgerOption.push(this.hamburgerArray[0]);

        document.getElementById("hamBurger").addEventListener("change",i => {
            this.selectHamburgerOption = [];
            let selectElement = this.hamburgerArray[i.target.value];
            this.imagesHamburger.innerHTML = `<img src=${selectElement.images}></img>`;
            this.selectHamburgerOption.push(selectElement);

        },false);
        document.getElementById("filling").addEventListener("change",i => {

             this.selectFillingOption = [];

              selected = document.querySelectorAll('#filling option:checked');
              values = Array.from(selected).map(el => el.value);

             values.forEach((i) => {
                 this.selectFillingOption.push(this.fillingArray[i]);
             });

        },false);

        document.getElementById("additionally").addEventListener("change",i => {

            this.selectAdditionallyOption = [];

            selected = document.querySelectorAll('#additionally option:checked');
            values = Array.from(selected).map(el => el.value);

            values.forEach((i) => {
                this.selectAdditionallyOption.push(this.additionallyArray[i]);
            });

        },false);
    }

    getSum(){

        let sum = 0;
        let hamburger = this.selectHamburgerOption;
        let filing = hamburger.concat(this.selectFillingOption);
        let readyConcat = filing.concat(this.selectAdditionallyOption);
        readyConcat.forEach(i =>{
            sum+= i.price;
        });

        return sum;
    }

    getColories(){
        let colories = 0;
        let hamburger = this.selectHamburgerOption;
        let filing = hamburger.concat(this.selectFillingOption);
        let readyConcat = filing.concat(this.selectAdditionallyOption);
        readyConcat.forEach(i =>{
            colories+= i.calories;
        });

        return colories;
    }

    getDisplayResult(){
        document.querySelector('.calculate-sum').innerHTML = this.getSum() + ' .руб';
        document.querySelector('.calculate-calories').innerHTML = this.getColories()+ ' .ккал';
    }

}

class Hamburger{
    constructor(title,price,calories,images){
        this.title = title;
        this.price = price;
        this.calories = calories;
        this.images = images;
    }
}

class Filling {
    constructor(title,price,calories){
        this.title = title;
        this.price = price;
        this.calories = calories;
    }
}


class Additionally {
    constructor(title,price,calories){
        this.title = title;
        this.price = price;
        this.calories = calories;
    }
}

let calculate = new Calculate();
calculate.logic();

document.getElementById('calculate-form-submit').addEventListener('click',e => {
   e.preventDefault();
   calculate.getDisplayResult();
},false);