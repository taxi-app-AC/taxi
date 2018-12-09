const request = require('supertest');
var chai = require('chai')
    , chaiHttp = require('chai-http');
chai.use(chaiHttp);
const express = require('express');

// const app = express();
const app = require('../../index');

var expect = chai.expect;

require('../../config/db');

/*describe('Auth GET /me', function() {

    it('respond with 401 without token', function(done) {

        request(app)
            .get('/api/auth/me')
            .expect(401, done);
    });

    it('respond success', function(done) {

        request(app)
            .get('/api/auth/me')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer 1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMGMwNDk5OTFhY2IzMmNmYWM3ZTU0NiIsImlhdCI6MTU0NDI5MTQ4MSwiZXhwIjoxNTQ0Mzc3ODgxfQ.v4CndSwwMdepIM4ECeX9H_fXr74y76ODltNDrcWI95Q')
            .expect(200, done);
    })
});*/


describe('Auth GET /me', function() {

    it('respond with 401 without token', function() {

        chai.request(app)
            .get('/api/auth/me')
            .end((err, res) => {
                expect(res).to.have.status(401);
            });
    });

    it('respond success', function() {

        chai.request(app)
            .get('/api/auth/me')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer 1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMGMwNDk5OTFhY2IzMmNmYWM3ZTU0NiIsImlhdCI6MTU0NDI5MTQ4MSwiZXhwIjoxNTQ0Mzc3ODgxfQ.v4CndSwwMdepIM4ECeX9H_fXr74y76ODltNDrcWI95Q')
            .end((err, res) => {
                expect(res).to.have.status(200);
            });
    })
});
