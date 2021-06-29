let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8080';

describe('Get the array',()=>{

	it('Should return the original simple array', (done) => {
		chai.request(url)
			.get('/append')
			.end( function(err,res){
				expect(res).to.have.status(200);
                expect(res.body).to.eql(["this","is","simple","array"]);
				done();
			});
	});
});

describe('Append and unshift to simple array',()=>{

	it('Should unshift and append both of the strings', (done) => {
		chai.request(url)
			.get('/append?start=hello&end=bye')
			.end( function(err,res){
				expect(res).to.have.status(200);
                expect(res.body).to.eql(["hello","this","is","simple","array","bye"]);
				done();
			});
	});
});

describe('Append to simple array',()=>{

	it('Should append both of the strings', (done) => {
		chai.request(url)
			.get('/append?end=bye')
			.end( function(err,res){
				expect(res).to.have.status(200);
                expect(res.body).to.eql(["this","is","simple","array","bye"]);
				done();
			});
	});
});

describe('Unshift to simple array',()=>{

	it('Should unshift and append both of the strings', (done) => {
		chai.request(url)
			.get('/append?start=hello')
			.end( function(err,res){
				expect(res).to.have.status(200);
                expect(res.body).to.eql(["hello","this","is","simple","array"]);
				done();
			});
	});
});