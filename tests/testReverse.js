let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8080';

describe('Name reversed',()=>{

	it('Should get the reversed string with capitalized vowels', (done) => {
		chai.request(url)
			.get('/reverse/hello')
			.end( function(err,res){
				expect(res).to.have.status(200);
                expect(res.body.reversed).to.equal('OllEh');
				done();
			});
	});
});

describe('String with some vowels uppercase',()=>{

	it('Should get the reversed string with capitalized vowels', (done) => {
		chai.request(url)
			.get('/reverse/HhAaaAIoLa')
			.end( function(err,res){
				expect(res).to.have.status(200);
                expect(res.body.reversed).to.equal('ALOIAAAAhH');
				done();
			});
	});
});

describe('No vowels',()=>{

	it('Should reverse the string', (done) => {
		chai.request(url)
			.get('/reverse/hll')
			.end( function(err,res){
				expect(res).to.have.status(200);
                expect(res.body.reversed).to.equal('llh');
				done();
			});
	});
});