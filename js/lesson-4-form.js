"use strict";

let notificationName = document.getElementById('notification-name');
let notificationPhone = document.getElementById('notification-phone');
let notificationEmail = document.getElementById('notification-email');

let phone = document.getElementById('phone');
let name = document.getElementById('name');
let email = document.getElementById('email');

function validateName (v){
    if(/\d/.test(v)){
        name.setAttribute("style", "border: 1px solid red;");
        notificationName.innerHTML += 'Имя может содержать только буквенные символы!<br>';
        return false;
    }else{
        name.setAttribute("style", "");
        notificationName.innerHTML = '';
        return true;
    }
}

function validatePhone (v){

    console.log(v);

    if(v.length < 11){
        phone.setAttribute("style", "border: 1px solid red;");
        notificationPhone.innerHTML += 'Для телефона минимальное количество символов 11!<br>';
        return false;
    } else if(/^\d+$/.test(v) && v.length >= 11){
        let p = phone.value.replace(/\D/g, '').match(/(\d{1})(\d{3})(\d{3})(\d{4})/);
        phone.value = '+ '+p[1]+'(' + p[2] + ') ' + p[3] + '-' + p[4];
        phone.setAttribute("style", "");
        notificationPhone.innerHTML = '';
        return true;
    }else{
        phone.setAttribute("style", "border: 1px solid red;");
        notificationPhone.innerHTML += 'Телефон может содержать только цифры!<br>';
        return false;
    }
}

function validateEmail (v){
    if(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test(v)){
        email.setAttribute("style", "");
        notificationEmail.innerHTML = '';
        return true;
    }else{
        email.setAttribute("style", "border: 1px solid red;");
        notificationEmail.innerHTML += 'Вы указали невреный формат email адреса!<br>';
        return false;
    }
}

name.addEventListener('keyup',e => {
    validateName(e.target.value);
});

phone.addEventListener('blur',e => {
    validatePhone(e.target.value);
});

email.addEventListener('blur',e => {
    validateEmail(e.target.value);
});


document.getElementById('testForm').addEventListener('submit',e =>{
    e.preventDefault();
    if(validateName(name.value) && validateEmail(email.value)){
        alert('Форма отправлена!');
    }
});