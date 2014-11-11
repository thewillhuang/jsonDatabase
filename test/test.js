/*jshint node: true*/
'use strict';
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../server.js');

var expect = chai.expect;

describe('Simple Json Database', function() {
  it('should be able to respond to a post request and create a new file', function(done) {
    chai.request('http://localhost:3000')
    .post('/hi2')
    .send({
      msg:'hello'
    })
    .end(function(err, res) {
      expect(err).to.be.eql(null);
      expect(res.body).to.be.eql({ msg: 'hello' });
      done();
    });
  });
  it('should respond to a get request and post the object in the file', function(done) {
    chai.request('http://localhost:3000')
    .get('/hi2')
    .end(function(err, res) {
      expect(err).to.be.eql(null);
      expect(res.body).to.be.eql({ msg: 'hello'});
      done();
    });
  });
});
