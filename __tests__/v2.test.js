'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server.js');
const Users = require('../src/auth/models/users.js');
const jwt = require('jsonwebtoken');

const request = supergoose(server);
let  SECRET =process.env.SECRET || 'secret';
let id;
let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  editor: { username: 'editor', password: 'password', role: 'editor' },
  user: { username: 'user', password: 'password', role: 'user' },
};
beforeAll(async () => {
  await new Users(users.admin).save();
  await new Users(users.user).save();
});
const user = { username: 'admin' };
const token = jwt.sign(user, SECRET);

const basic = { username: 'basic' };
const basicToken = jwt.sign(basic, SECRET);


describe('v2 clothes', () => {
  it('read all from DataBase /clothes when no data', async () => {
    const response = await request
      .get('/api/v2/clothes')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
  it('create test on POST /clothes', async () => {
    const response = await request
      .post('/api/v2/clothes')
      .send({
        name: 'hat',
        color: 'pink',
        size: 'm',
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('hat');
    id = response.body._id;
  });
  it('should be able to read specific data on GET /clothes', async () => {
    const response = await request
      .get(`/api/v2/clothes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('hat');
  });
  
  it('read all from DataBase test on GET /clothes', async () => {
    const response = await request
      .get('/api/v2/clothes')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  it('should be able to update data on PUT /clothes', async () => {
    const response = await request
      .put(`/api/v2/clothes/${id}`)
      .send({
        name: 'hat',
        color: 'pink',
        size: 'M',
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('hat');
  });
  
  it('should be able to delete data on DELETE /clothes', async () => {
    const response = await request
      .delete(`/api/v2/clothes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
 
  it('should throw an error if you add invalid model', async () => {
    const response = await request
      .get('/api/v2/movies')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(500);
  });
  it('should deny access for the user with the wrong token', async () => {
    const response = await request
      .post(`/api/v2/clothes`)
      .send({
        name: 'skirt',
        color: 'brown',
        size: 's',
      })
      .set('Authorization', `Bearer ${basicToken}`);
    expect(response.status).toEqual(500);
  });
  it('should deny access for the user without a token', async () => {
    const response = await request
      .post(`/api/v2/clothes`)
      .send({
        name: 'skirt',
        color: 'brown',
        size: 's',
      })
      .set('Authorization', `Bearer thisiswrongtoken`);
    expect(response.status).toEqual(500);
  });
});


describe('v2 food', () => {
  it('read all from DataBase /food when there is no data', async () => {
    const response = await request
      .get('/api/v2/food')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
  it('create test on POST /food', async () => {
    const response = await request
      .post('/api/v2/food')
      .send({
        name: 'Mansaf',
        calories: '300',
        type: 'VEGETABLE',
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('Mansaf');
    id = response.body._id;
  });
  it('should be able to read specific data on GET /food', async () => {
    const response = await request
      .get(`/api/v2/food/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Mansaf');
  });
  


  
  it('should be able to delete data on DELETE /food', async () => {
    const response = await request
      .delete(`/api/v2/food/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
  
  it('should throw an error if you add invalid model', async () => {
    const response = await request
      .get('/api/v2/books')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(500);
  });
  it('should deny access for the user with the wrong token', async () => {
    const response = await request
      .post(`/api/v2/food`)
      .send({
        name: 'cake',
        type: 'FRUIT',
        calories: '1000',
      })
      .set('Authorization', `Bearer ${basicToken}`);
    expect(response.status).toEqual(500);
  });
  it('should deny access for the user without a token', async () => {
    const response = await request
      .post(`/api/v2/food`)
      .send({
        name: 'cake',
        type: 'FRUIT',
        calories: '1000',
      })
      .set('Authorization', `Bearer thisiswrongtoken`);
    expect(response.status).toEqual(500);
  });
});
    