const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

function getProductFromFile(cb) {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}
module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    console.log(err)

                }
            })
        })
    }

    static fetchAll(cb) {
        getProductFromFile(cb)
    }
}