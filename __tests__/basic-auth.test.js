'use strict';

require('@code-fellows/supergoose');
const middleware = require('../src/auth/middleware/basic.js');
const Users = require('../src/auth/models/users.js');

let users = {
  admin: { username: 'admin', password: 'password' },
};

// Pre-load our database with fake users
beforeAll(async (done) => {
  await new Users(users.admin).save();
  done();
});

describe('Auth Middleware', () => {

  // admin:password: YWRtaW46cGFzc3dvcmQ=
  // admin:foo: YWRtaW46Zm9v

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with the incorrect basic credentials', () => {

      // Change the request to match this test case
      req.headers = {
        authorization: 'Basic YWRtaW46Zm9v',
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });

    }); // it()

    it('logs in an admin user with the right credentials', () => {

      // Change the request to match this test case
      req.headers = {
        authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });

    }); // it()

  });

});

// 'use strict';

// process.env.SECRET = 'toes';

// require('@code-fellows/supergoose');
// const middleware = require('../../../src/auth/middleware/bearer.js');
// const Users = require('../../../src/auth/models/users.js');
// const jwt = require('jsonwebtoken');

// let users = {
//   admin: { username: 'admin', password: 'password' },
// };

// // Pre-load our database with fake users
// beforeAll(async (done) => {
//   await new Users(users.admin).save();
//   done();
// });

// describe('Auth Middleware', () => {
//   // Mock the express req/res/next that we need for each middleware call
//   const req = {};
//   const res = {
//     status: jest.fn(() => res),
//     send: jest.fn(() => res),
//   };
//   const next = jest.fn();

//   describe('user authentication', () => {
//     it('fails a login for a user (admin) with an incorrect token', () => {
//       req.headers = {
//         authorization: 'Bearer thisisabadtoken',
//       };

//       return middleware(req, res, next).then(() => {
//         expect(next).toHaveBeenCalledWith('Invalid Login');
//       });
//     });

//     it('fails a login for a user (admin) without token', () => {
//       return middleware(req, res, next).then(() => {
//         expect(next).toHaveBeenCalledWith('Invalid Login');
//       });
//     });

//     it('logs in a user with a proper token', () => {
//       const user = { username: 'admin' };
//       const token = jwt.sign(user, process.env.SECRET);

//       req.headers = {
//         authorization: `Bearer ${token}`,
//       };

//       return middleware(req, res, next).then(() => {
//         expect(next).toHaveBeenCalledWith();
//       });
//     });
//   });
// });