const assert = require('assert');
const controller = require('../../api/controllers/UsersController');
const {USER, RESPONSE} = require('../utils/index');
const sinon = require('sinon');
var supertest = require('supertest');

describe('UsersController', () => {
  it('Deve criar o usuário com sucesso', async () => {
    const substituicao1 =  sinon.stub(User, 'create').resolves(USER);
 
    const req = {
      body: USER,
    };

    await controller.create(req, RESPONSE);

    assert.strictEqual(substituicao1.calledOnceWith({name: USER.name, email: USER.email}), true);
    assert.strictEqual(RESPONSE.statusCode, 200);
    assert.deepStrictEqual(RESPONSE.body, {success: "true"});

    substituicao1.restore();
  });
});

describe('route /register', function() {
  it('should respond with JSON containing success: true', function (done) {
    supertest(sails.hooks.http.app)
    .post('/register')
    .send(USER)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) {console.log(err);return done(err)};
      assert.deepStrictEqual(res.body, { success: "true" });
      done();
    });
  });
});

describe('User (model)', () => {
  it('Deve criar o usuário com sucesso', async () => {
    let user = await User.create(USER).fetch();

    assert.strictEqual(user.email, USER.email)
    assert.strictEqual(user.name, USER.name)
  });
});