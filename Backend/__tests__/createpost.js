const request = require('supertest');
const app = require('../app'); 
const base64 = require('base-64');

describe('Creating a Post', () => {
  it('should create a post and return 201 status', async () => {
    const username = 'johnDoe';
    const password = 'userpassword'; 
    const authHeader = `Basic ${base64.encode(`${username}:${password}`)}`;

    const postData = {
      title: 'My First Post',
      allText: 'This is the body of my first post.'
    };

    const response = await request(app.callback())
      .post('/api/v1/posts')
      .set('Authorization', authHeader)
      .send(postData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('ID'); 
  });
});
