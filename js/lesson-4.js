"use strict";
let text = document.querySelector('.text').innerHTML;
let newText = text.replace(/'[a-zA-Z\s]+'|'[à-ÿ¸\s]+'/g, e => {
    return e.replace(/'/g,"\"");
});
document.querySelector('.text').innerHTML = newText;
