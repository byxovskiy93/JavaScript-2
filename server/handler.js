
const cart = require ('./cart');
const moment = require ('moment');
const fs = require ('fs');
const fileHandler = 'server/db/handler.json';

const actions = {
    add: cart.add,
    change: cart.change,
    delete: cart.remove
};

let handler = (req, res, action, file) => {
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let readyData = JSON.parse(data);
            let newCart = actions[action](readyData, req);
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {

                    //Если все окей записываем совершенное действие
                    fs.readFile (fileHandler, 'utf-8', (err, data) => {
                        if (!err) {
                            let readyData = JSON.parse(data);
                            let nowTime = moment().format('DD-MM-YYYY HH:mm:ss');
                            let newHandler = {"action": action,"product":req.body.product_name,"time":nowTime};
                            readyData.handler.push(newHandler);
                            let newArrayHandler = JSON.stringify (readyData, null, 4);
                            fs.writeFile(fileHandler, newArrayHandler, (err) => {})
                        }
                    });

                    res.send({result: 1, text: 'Success'})
                }
            })
        }
    })
};

module.exports = handler;