'use strict';

process.env.SECRET = 'toes';

require('@code-fellows/supergoose');
const middleware = require('../src/auth/middleware/bearer.js');
const Users = require('../src/auth/models/users.js');
const jwt = require('jsonwebtoken');
const { expect } = require('@jest/globals');

let users = {
  admin: { username: 'admin', password: 'password' },
};

// Pre-load our database with fake users
beforeAll(async () => {
  await new Users(users.admin).save();

});

describe('Auth Middleware', () => {

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with an incorrect token', () => {

      req.headers = {
        authorization: 'Bearer thisisabadtoken',
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith('Invalid Login');
          expect(res.status).not.toBeCalled();
        });

    });

    it('logs in a user with a proper token', () => {

      const user = { username: 'admin' };
      const token = jwt.sign(user, process.env.SECRET);

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });

    });

  });

});