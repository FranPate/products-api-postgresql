const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de prueba products', () => {
    it('should return the products of the user', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        let products = [{
            name: 'Celular',
            color: 'Negro',
            price: 1000
        },
        {
            name: 'Televisor',
            color: 'Plateado',
            price: 500
        },
        {
            name: 'Teclado',
            color: 'Blanco',
            price: 200
        }]
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'francisco', password: '1234'})
            .end((err, res) => {
                let token = res.body.token;
                // Expected valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/products')
                    .send({
                        products: products
                    })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                        .get('/products')
                        .set('Authorization', `JWT ${token}`)
                        .end((err, res) => {
                            // Tiene productos Celular y Televisor
                            // { owner: 'francisco', products: [product]}
                            chai.assert.equal(res.statusCode, 200);
                            chai.assert.equal(res.body.owner, 'francisco');
                            chai.assert.equal(res.body.products.length, products.length);
                            chai.assert.equal(res.body.products[0].name, products[0].name);
                            chai.assert.equal(res.body.products[1].name, products[1].name);
                            done();
                        });
                    });
            });
    });
    it('should return the specs of the product', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        let product = {
            name: 'Celular',
            color: 'Negro',
            price: 1000
        };
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'joan', password: '4321'})
            .end((err, res) => {
                let token = res.body.token;
                // Expected valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .post('/products/product')
                    .send(product)
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                        .get('/products')
                        .set('Authorization', `JWT ${token}`)
                        .end((err, res) => {
                            // Tiene productos Celular y Televisor
                            // { owner: 'francisco', products: [product]}
                            chai.assert.equal(res.statusCode, 200);
                            chai.assert.equal(res.body.owner, 'joan');
                            chai.assert.equal(res.body.products.length, 1);
                            chai.assert.equal(res.body.products[0].name, product.name);
                            chai.assert.equal(res.body.products[0].color, product.color);
                            chai.assert.equal(res.body.products[0].price, product.price);
                            done();
                        });
                    });
            });
    });
    it('should edit the product', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        let product = {
            name: 'Celular',
            color: 'Gris',
            price: 1000
        };
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'francisco', password: '1234'})
            .end((err, res) => {
                let token = res.body.token;
                // Expected valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/products/product/0')
                    .send(product)
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                        .get('/products')
                        .set('Authorization', `JWT ${token}`)
                        .end((err, res) => {
                            // Tiene productos Celular y Televisor
                            // { owner: 'francisco', products: [product]}
                            chai.assert.equal(res.statusCode, 200);
                            chai.assert.equal(res.body.owner, 'francisco');
                            chai.assert.equal(res.body.products[0].name, product.name);
                            chai.assert.equal(res.body.products[0].color, product.color);
                            chai.assert.equal(res.body.products[0].price, product.price);
                            done();
                        });
                    });
            });
    });
    it('should return the product', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'francisco', password: '1234'})
            .end((err, res) => {
                let token = res.body.token;
                // Expected valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get('/products/product/0')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        let product = {
                            name: res.body.product.name,
                            color: res.body.product.color,
                            price: res.body.product.price
                        }
                        chai.request(app)
                        .get('/products')
                        .set('Authorization', `JWT ${token}`)
                        .end((err, res) => {
                            // Tiene productos Celular y Televisor
                            // { owner: 'francisco', products: [product]}
                            chai.assert.equal(res.statusCode, 200);
                            chai.assert.equal(res.body.owner, 'francisco');
                            chai.assert.equal(res.body.products[0].name, product.name);
                            chai.assert.equal(res.body.products[0].color, product.color);
                            chai.assert.equal(res.body.products[0].price, product.price);
                            done();
                        });
                    });
            });
    });
    it('should delete the product', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'francisco', password: '1234'})
            .end((err, res) => {
                let token = res.body.token;
                // Expected valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .delete('/products/product/0')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                        .get('/products')
                        .set('Authorization', `JWT ${token}`)
                        .end((err, res) => {
                            // Tiene productos Celular y Televisor
                            // { owner: 'francisco', products: [product]}
                            chai.assert.equal(res.statusCode, 200);
                            chai.assert.equal(res.body.owner, 'francisco');
                            chai.assert.equal(res.body.products.length, 2);
                            done();
                        });
                    });
            });
    });
});
