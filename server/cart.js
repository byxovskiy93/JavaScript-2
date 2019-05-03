let add = (cart, req) => {
    cart.contents.push (req.body);
    return JSON.stringify (cart, null, 4);
};

let change = (cart, req) => {
    let find  = cart.contents.find (el => el.id_product === +req.params.id);
    find.quantity++;
    return JSON.stringify (cart, null, 4);
};

let remove = (cart, req) => {
    let newCart =  cart.contents.filter((card) => {
        if(req.body.id_product !== card.id_product) {return card;}
    });
    cart.contents = newCart;
    return JSON.stringify (cart, null, 4);
};

module.exports = {
    add,change,remove
};