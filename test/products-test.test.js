const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de prueba products', () => {
    it('should add a product', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        let product = {
            name: 'Televisor',
            color: 'Verde',
            price: 500
        };
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'lautaro', password: '5678'})
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
                            done();
                        });
                    });
            });
    });
    it('should edit the product', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        let product = {
            name: 'Parlantes',
            color: 'Negro',
            price: 1000
        };
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'lautaro', password: '5678'})
            .end((err, res) => {
                let token = res.body.token;
                // Expected valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/products/product/Parlantes')
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
            .send({user: 'lautaro', password: '5678'})
            .end((err, res) => {
                let token = res.body.token;
                // Expected valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get('/products/product/Computadora')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        // Tiene productos Celular y Televisor
                        // { owner: 'francisco', products: [product]}
                        console.log(res.body);
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
                });
    });
    it('should delete the product', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'lautaro', password: '5678'})
            .end((err, res) => {
                let token = res.body.token;
                // Expected valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .delete('/products/product/Alfombra')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                        .get('/products')
                        .set('Authorization', `JWT ${token}`)
                        .end((err, res) => {
                            // Tiene productos Celular y Televisor
                            // { owner: 'francisco', products: [product]}
                            chai.assert.equal(res.statusCode, 200);
                            done();
                        
                        });
                    });
             });
    });
});
