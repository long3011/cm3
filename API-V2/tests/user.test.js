const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel")

beforeEach(async () => {
    await User.deleteMany({});
});

describe("User Routes", () => {
    describe("POST /api/users/signup", () => {
        it("should signup a new user with valid credentials", async() =>{
            const userData = {
                name: "UserforTests",
                username: "testerdummy",
                password: "R3g5T7#gh",
                phone_number: "+358 1234567890",
                gender: "Male",
                date_of_birth: "1999-01-01",
                membership_status: "Active",
                address: "Addresstest"
            };
        const result = await api.post("/api/users/signup").send(userData);
        
        expect(result.status).toBe(201);
        expect(result.body).toHaveProperty("token");

        const savedUser = await User.findOne({username: userData.username});
        expect(savedUser).not.toBeNull();
        })

    });
    describe("POST /api/users/login", () => {
        it("should login user with valid credentials", async () => {
            await api.post("/api/users/signup").send({
                name: "UserforTests",
                username: "testerdummy",
                password: "R3g5T7#gh",
                phone_number: "+358 1234567890",
                gender: "Male",
                date_of_birth: "1999-01-01",
                membership_status: "Active",
                address: "Address test"
            });
                  const result = await api.post("/api/users/login").send({
        username: "testerdummy",
        password: "R3g5T7#gh",
      });
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("token");
    });

    it("❌ should return an error with wrong password", async () => {
      const result = await api.post("/api/users/login").send({
        username: "testerdummy",
        password: "wrongpassword",
      });

      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });
});

// Close DB connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
