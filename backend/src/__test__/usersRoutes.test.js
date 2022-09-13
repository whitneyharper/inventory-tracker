const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const User = require('../models/user')


beforeAll(async () => {
    await User.findOneAndDelete({ email: 'testemail@gmail.com' })
})

//close the connection to the database
afterAll(() => mongoose.connection.close())

describe("Test user routes", () => {


  //sign up a new user
  it("should sign up a new user", async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        email: 'testemail@gmail.com',
        password: 'testpassword'
      })
      .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('email')
      expect(res.body).toHaveProperty('token')
})

  //test if user already exists
  it("should not sign up a new user if user already exists", async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        email: 'testemail@gmail.com',
        password: 'testpassword'
      })
      .set('Accept', 'application/json')
      expect(res.body.message).toBe('Email already in use')
      expect(res.statusCode).toBe(409)
      
    })

  //login a user
  it("should login a user", async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'testemail@gmail.com',
        password: 'testpassword'
      })
      .set('Accept', 'application/json')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('email')
      expect(res.body).toHaveProperty('token')
    })

    //test for incorrect password
    it("should not login a user if password is incorrect", async () => {
      const res = await request(app)
        .post('/users/login')
        .send({
          email: 'testemail@gmail.com',
          password: 'incorrectpassword'
        })
        .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(401)
        expect(res.body.message).toBe('Incorrect password.')
      })

      //test for incorrect email
      it("should not login a user if email is incorrect", async () => {
        const res = await request(app)
          .post('/users/login')
          .send({
            email: 'incorrectemail@gmail.com',
            password: 'testpassword'
          })
          .set('Accept', 'application/json')
          expect(res.statusCode).toEqual(401)
          expect(res.body.message).toBe("Incorrect email or email doesn't exist.")
      })

})



