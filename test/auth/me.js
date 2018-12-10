const request = require('supertest');
const chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

const app = require('../../index');

const user = new require('../../models/user');

let userData = {
    name: 'cavid',
    phone: '55852456',
    password: '123456'
};

user.deleteMany({}, (err) => {

    if(err) {
        console.log(err);
    }
});

describe('POST /register - Create new user for testing GET /me', () => {

    it('respond with 201', (done) => {

        request(app)
            .post('/api/auth/register')
            .send(userData)
            .expect(201)
            .then(res => {
                access_token = res.body.data.token;
                done();
            })
    })
})

describe('GET /me - Get user info', function() {

    it('respond with 401 without token', function(done) {

        request(app)
            .get('/api/auth/me')
            .expect(401, done);
    });

    it('respond 401 with wrong token', (done) => {

        request(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer wrongbearerfortesting`)
            .expect(401)
            .then(res => {
                assert.property(res.body, 'errors');
                assert.equal(res.body.errors[0].status, 5);
                done();
            });
    });

    it('respond success', function(done) {

        request(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer ${access_token}`)
            .expect({
                name: userData.name,
                phone: userData.phone
            })
            .expect(200, done);
    })
});