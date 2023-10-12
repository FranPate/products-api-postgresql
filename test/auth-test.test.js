const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de prueba auth', () => {
    it('should return 200 when created user', (done) => {
        chai.request(app)
            .post('/auth/signup')
            .set('content-type', 'application/json')
            .send({user: 'lautaro', password: '5678'})
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });
    it('should return 401 when no jwt aviable', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .get('/products')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });
    it('should return 400 when no data is provided', (done) => {
        chai.request(app)
            .post('/auth/login')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 400);
                done();
            });
    });
    it('should return 200 for succesful login', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'francisco', password: '1234'})
            .end((err, res) => {
                // Expected valid login
                chai.assert.equal(res.statusCode, 200);
                done();
            
            });
    });
    it('should return 200 when jwt correct', (done) => {
        // Cuando la llamada tiene correctamente la llave
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
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
            });
    });
});