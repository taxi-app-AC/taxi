const request = require('supertest');

const app = require('../../index');

const user = new require('../../models/user');

let access_token = '';

user.deleteMany({}, (err) => {

    if(err) {
        console.log(err);
    }
});

describe('POST /register - Create new user for testing GET /me', () => {

    it('respond with 201', (done) => {

        request(app)
            .post('/api/auth/register')
            .send({
                name: 'cavid',
                phone: '444',
                password: '111xxx222'
            })
            .expect(201)
            .then(res => {
                access_token = res.body.data.token;
                done();
            })
    })
})

describe('Auth GET me', function() {

    it('respond with 401 without token', function(done) {

        request(app)
            .get('/api/auth/me')
            .expect(401, done);
    });

    it('respond success', function(done) {

        request(app)
            .get('/api/auth/me')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${access_token}`)
            .expect(200, done);
    })
});