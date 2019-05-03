const express = require ('express');
const bodyParser = require('body-parser');
const fs = require ('fs');
const app = express ();

app.use (express.json()); //Определение JSON
app.use ('/', express.static ('public'));

app.use(bodyParser.json());

//Получаем продукты
app.get ('/api/products', (req, res) => {
    fs.readFile ('server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    })
});

//Получаем корзину
app.get ('/api/cart', (req, res) => {
    fs.readFile ('server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    })
});

const handler = require ('./handler');

//Добовляем элемент в корзину
app.post ('/api/cart', (req, res) => {
       handler (req, res, 'add', 'server/db/userCart.json');
});

// Изменяем элемент в корзине
app.put ('/api/cart/:id', (req, res) => {
    handler (req, res, 'change', 'server/db/userCart.json');
});

// Удаляем элементы из корзины
app.delete ('/api/cart/:id', (req, res) => {
    handler (req, res, 'delete', 'server/db/userCart.json');
});

app.listen (3000, () => ('listening at port 3000...'));