let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8080';

describe('get all countries',()=>{

	it('should get all countries', (done) => {
		chai.request(url)
			.get('/countries')
			.end( function(err,res){
				expect(res).to.have.status(200);
				expect(res.body.countries).to.have.length(28)
				done();
			});
	});

});

describe('get the counties that contains "ma"',()=>{

	it('should get the countries that contains "ma" ', (done) => {
		chai.request(url)
			.get('/countries?filter=ma')
			.end( function(err,res){
				expect(res).to.have.status(200);
				expect(res.body.countries).to.have.length(4)
				done();
			});
	});

});

describe('Filtering to none of the countries ',()=>{

	it('Shoudnt get any contries', (done) => {
		chai.request(url)
			.get('/countries?filter=aaaaa')
			.end( function(err,res){
				expect(res).to.have.status(200);
				expect(res.body.countries).to.have.length(0)
				done();
			});
	});

});

describe('Get Descendent sorted countries: ',()=>{

	it('Get Descendent sorted countries', (done) => {
		chai.request(url)
			.get('/countries?order=desc')
			.end( function(err,res){
				expect(res.body.countries[0].vat).to.equal(27);
				expect(res.body.countries[27].vat).to.equal(17);
				done();
			});
	});

});
describe('Get Ascendent sorted countries: ',()=>{

	it('Get Ascendent sorted countries', (done) => {
		chai.request(url)
			.get('/countries?order=asc')
			.end( function(err,res){
				expect(res.body.countries[0].vat).to.equal(17);
				expect(res.body.countries[27].vat).to.equal(27);
				done();
			});
	});

});

describe('Typo on order string: ',()=>{

	it('should get error code 501', (done) => {
		chai.request(url)
			.get('/countries?order=deco')
			.end( function(err,res){
				expect(res).to.have.status(501);
				done();
			});
	});

});

