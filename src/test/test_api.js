let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
let should = chai.should();

var appsrv = require('../app')

chai.use(chaiHttp);
var agent = chai.request.agent(appsrv);


describe('API Tests', () => {

	describe('#GET /ping', () =>{
		it('should return http 200 if server is up', () => {
			agent
				.get("/ping")
			.then(function (res) {
		    	expect(res).to.have.status(200);
		    });
		});
	});

});
