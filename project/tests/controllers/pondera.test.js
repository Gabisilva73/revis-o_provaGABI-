const assert = require('assert');
const controller = require('../../api/controllers/UsersController');
const {USER, RESPONSE} = require('../utils/index');
const sinon = require('sinon');
var supertest = require('supertest');

async function precondicao(user=USER) {
    await User.destroy({})
    const user_returned = await User.create(user).fetch()
    return user_returned
}

describe('UsersController', () => {
    it('Deve encontrar todos os usuários', async () => {
        const user = await precondicao()
        const substituicao1 =  sinon.stub(User, 'find').resolves([user]);

        const req = {};
        
        await controller.find(req, RESPONSE);

        assert.deepStrictEqual(RESPONSE.body, [user]);

        substituicao1.restore();
        await User.destroy({})
    });
});

describe('route /users', function() {
    it('Deve retornar todos os usuários', async function() {
      let user = await precondicao();
      await supertest(sails.hooks.http.app)
        .get('/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(async (res) => {
          assert.deepStrictEqual(res.body, [user]);
          await User.destroy({});
        })
        .catch(async (err) => {
          console.log(err);
          await User.destroy({});
          throw err;
        });
    });
  });
  

  describe('User (model)', () => {
    it('Deve achar os usuários com sucesso', async () => {
      const inserted_user = await precondicao({"name": "jonathan", "email": "jo@ygmail.com"})
      let user = await User.find();
  
      assert.deepStrictEqual(user, [inserted_user])
    });
  });