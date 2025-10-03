const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

beforeAll(async () => {
  await User.deleteMany({});
});

describe("User Routes", () => {
  describe("POST /api/users/signup", () => {
    it("should signup a new user with valid credentials", async () => {
      // Arrange
      const userData = {
        name: "Test User",
        username: "testuser",
        password: "R3g5T7#gh",
        phone_number: "09-123-47890",
        gender: "Other",
        date_of_birth: "1999-01-01",
        membership_status: "Active",
        bio: "This is a test user's bio.",
        address: "123 Test St, Test City, Test Country",
        profile_picture: "http://example.com/profile.jpg",
      };

      // Act
      const result = await api.post("/api/users/signup").send(userData);

      // Assert
      expect(result.status).toBe(201);
    });

    it("should return an error with invalid credentials", async () => {
      // Arrange
      const userData = {
        name: "Test User",
        username: "testuser",
        password: "InvalidPassword", // Missing special character and number
      };

      // Act
      const result = await api.post("/api/users/signup").send(userData);

      // Assert
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });

  describe("POST /api/users/login", () => {
    it("should login a user with valid credentials", async () => {
      // Arrange
      const userData = {
        username: "testuser",
        password: "R3g5T7#gh",
      };

      // Act
      const result = await api.post("/api/users/login").send(userData);

      // Assert
      expect(result.status).toBe(200);
    });

    it("should return an error with invalid credentials", async () => {
      // Arrange
      const userData = {
        username: "testuser",
        password: "invalidpassword",
      };

      // Act
      const result = await api.post("/api/users/login").send(userData);

      // Assert
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
