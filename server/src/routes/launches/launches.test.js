const request = require('supertest')
const app = require('../../app')

// supertest assertions are chained using the dot ie .expect
// jest assertions dont have the preceeding dot

describe('Test GET /launches', ()=>{
    test('It should respond with 200 success', async ()=>{//async is easier
       // const response = request(app); //we pass the root file containing main routes/middleware. Then we can call functions from it
       const response = await request(app).get('/launches')
       .expect('Content-Type', /json/)
       .expect(200)
        // expect(response.statusCode).toBe(200);
    });
});

describe('Test POST /launch', ()=>{
    const completeLaunchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'January 4, 2028'
    }

    const launchDataWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f'
    }
    test('It should respond with 201 created', async ()=>{
        const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201)
                
       const requestDate = new Date(completeLaunchData.launchDate).valueOf();
       const responseDate = new Date(response.body.launchDate).valueOf()
       expect(requestDate).toBe(responseDate);
        // jest assertion
        expect(response.body).toMatchObject(launchDataWithoutDate)

    });
    test('It should catch missing required fields', async ()=>{

        const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
       .expect('Content-Type', /json/)
       .expect(201)
 
    });
    test('It should catch invalid dates', ()=>{

    });
})
