import * as request from 'supertest'
import app from '../../server'

it("Not authorized", async done => {
    const response = await request(app).get("/api/users")
    expect(response.body).toEqual({"error": "Not authorized"})
    expect(response.status).toEqual(403)

    done()
})