const request = require('supertest');
const app = require('../app'); 
const base64 = require('base-64');

describe('Adding a Comment to a Post', () => {
    it('should add a comment to an existing post and return 201 status', async () => {
        const username = 'johnDoe';
        const password = 'userpassword'; 
        const authHeader = `Basic ${base64.encode(`${username}:${password}`)}`;

        const commentData = {
            allText: 'This is a test comment.',
        };

        const postId = 1; 

        const response = await request(app.callback())
            .post(`/api/v1/posts/${postId}/comments`)
            .set('Authorization', authHeader)
            .send(commentData);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('ID');
        expect(response.body).toHaveProperty('message', 'Comment created');
    });
});
