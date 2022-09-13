const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const Warehouse = require('../models/warehouse')

//before all tests delete all warehouses from database
beforeAll(async () => {
    await Warehouse.deleteMany({})
})

//before all tests, login a user
beforeAll(async () => {
    await request(app)
        .post('/users/login')
        .send({ email: 'testemail@gmail.com', password: 'testpassword' })
        .set('Accept', 'application/json')
        .then((res) => {
            token = res.body.token
        })
})

//test warehouses routes
describe("Test warehouses routes", () => {

    //create a new warehouse
    it("should create a new warehouse", async () => {
        const res = await request(app)
            .post('/warehouses')
            .send({
                name: 'testwarehouse',
                city: 'testcity',
                state: 'VA',
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.warehouse).toHaveProperty('name')
        expect(res.body.warehouse).toHaveProperty('city')
        expect(res.body.warehouse).toHaveProperty('state')
        expect(res.body.warehouse).toHaveProperty('user_id')
        expect(res.body.warehouse).toHaveProperty('inventory')
        expect(res.body.warehouse.inventory).toEqual([])
        expect(res.body.warehouse.inventory.length).toBeGreaterThanOrEqual(0)
        expect(res.body.warehouse).toHaveProperty('_id')
        expect(res.body.message).toBe('New warehouse created')
    }, 10000)

    //view all warehouses
    it("should view all warehouses", async () => {
        const res = await request(app)
            .get('/warehouses')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('warehouses')
        expect(res.body.warehouses).toEqual(expect.any(Array))
        expect(res.body.warehouses[0].inventory.length).toBeGreaterThanOrEqual(0)
        expect(res.body.warehouses.length).toBeGreaterThanOrEqual(0)
    })

    //update warehouse by id
    it("should update warehouse by id", async () => {
       
        const warehouse = await Warehouse.findOne({ name: 'testwarehouse' })
        const id = warehouse._id

        const res = await request(app)
            .put(`/warehouses/${id}`)
            .send({
                name: 'testwarehouse2'
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe('Warehouse is updated.')
    })

    //non existing warehouse to be updated return 404
    it("should not update warehouse by id if warehouse does not exist", async () => {
        const res = await request(app)
            .put('/warehouses/5f9d5e5e5d5e5d5e5d5e5d5e')
            .send({
                name: 'testwarehouse3'
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(404)
        expect(res.body.message).toBe('Warehouse not found')
    })
    
    //delete warehouse by id
    it("should delete warehouse by id", async () => {
        const warehouse = await Warehouse.findOne({ name: 'testwarehouse2' })
        const id = warehouse._id

        const res = await request(app)
            .delete(`/warehouses/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe('Warehouse deleted.')
    })

    //non existing warehouse to be deleted return 404
    it("should not delete warehouse by id if warehouse does not exist", async () => {
        const res = await request(app)
            .delete('/warehouses/5f9d5e5e5d5e5d5e5d5e5d5e')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(404)
        expect(res.body.message).toBe('Warehouse not found')
    })

})