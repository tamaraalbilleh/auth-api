
require('dotenv').config();
const { server } = require('../src/server.js');
const supertest = require('supertest');
// const request = supertest(server);
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server);
let id;

describe('V1 Api clothes', () => {
  it('GET /clothes ', async () => {
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
  it('POST /clothes', async () => {
    const response = await request.post('/api/v1/clothes').send({
      name: 'scarf',
      size: '25',
      color: 'red',
      
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('scarf');
    id = response.body._id;
  });
  it('GET /clothes/:id', async () => {
    const response = await request.get(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('scarf');
  });
  it('GET /clothes', async () => {
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
  });
  it('PUT /clothes', async () => {
    const response = await request.put(`/api/v1/clothes/${id}`).send({
      name: 'scarf',
      size: '25',
      color: 'blue',
    });
    expect(response.status).toEqual(200);
    expect(response.body.color).toEqual('blue');
  });
  it('DELETE /clothes', async () => {
    const response = await request.delete(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
  });
  it('invalid model', async () => {
    const response = await request.get('/api/v1/anyModels');
    expect(response.status).toEqual(500);
  });
});


describe('V1 Api food', () => {
  it('GET /food ', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
  it('POST /food', async () => {
    const response = await request.post('/api/v1/food').send({
      name: 'Mansaf',
      calories: '300',
      type: 'VEGETABLE',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('Mansaf');
    id = response.body._id;
  });
  it('GET /food/:id', async () => {
    const response = await request.get(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Mansaf');
  });
  it('GET /food', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
  });
  it('PUT /food', async () => {
    const response = await request.put(`/api/v1/food/${id}`).send({
      name: 'Mansaf',
      calories: '300',
      type: 'PROTIEN',
    });
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('PROTIEN');
  });
  it('DELETE /food', async () => {
    const response = await request.delete(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
  });
  it('invalid model', async () => {
    const response = await request.get('/api/v1/anyModels');
    expect(response.status).toEqual(500);
  });
});