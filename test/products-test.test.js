const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de prueba products', () => {
    it('should return the products of the user', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'francisco', password: '1234'})
            .end((err, res) => {
                // Expected valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get('/products')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        // Tiene productos Celular y Televisor
                        // { owner: 'francisco', products: [product]}
                        chai.assert.equal(res.statusCode, 200);
                        chai.assert.equal(res.body.owner, 'francisco');
                        chai.assert.equal(res.body.products.length, 2);
                        chai.assert.equal(res.body.products[0].name, 'Celular');
                        chai.assert.equal(res.body.products[1].name, 'Televisor');
                        done();
                    });
            });
    });
});
