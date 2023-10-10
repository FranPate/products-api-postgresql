const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de prueba e2e para la API', () => {
    it('should return 401 when no jwt', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .get('/products')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });
    it('should return 200 when jwt correct', (done) => {
        // Cuando la llamada tiene correctamente la llave
        chai.request(app)
            .post('/login')
            .end((err, res) => {
                chai.request(app)
                    .get('/products')
                   .set('Autorization', `JWT ${res.body.token}`)
                   .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
            });
        
    });
});