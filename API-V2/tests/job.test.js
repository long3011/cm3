const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Job = require("../models/jobModel")
const User = require("../models/userModel")

const jobs = [
    {
        title: "Job Title",
        type: "Full-time",
        description: "great job for beginner",
        company:{
            name: "TestCompany",
            contactEmail: "test@company.com",
            contactPhone: "+358 123456789",
        },
        location: "City",
        salary: 5000
    },  
    {
        title: "Job Title 2",
        type: "Part-time",
        description: "great job for Pros",
        company:{
            name: "TestCompany2",
            contactEmail: "test@company2.com",
            contactPhone: "+358 123456789",
        },
        location: "Some City",
        salary: 5000
    },
]

let token = null;

beforeAll( async () => {
    await User.deleteMany({});
    const result = await api.post("/api/users/signup").send({
        
    name: "UserforTests",
    username: "testerdummy",
    password: "R3g5T7#gh",
    phone_number: "+358 1234567890",
    gender: "Male",
    date_of_birth: "1999-01-01",
    membership_status: "Active",
    address: "Address test"
    });
    token = result.body.token

});
describe("Protected Job Routes", () => {
    beforeEach(async () => {
        await Job.deleteMany({});
        await Promise.all([
            api.post("/api/jobs").set("Authorization", "Bearer " + token).send(jobs[0]),
            api.post("/api/jobs").set("Authorization", "Bearer " + token).send(jobs[1]),
        ]);
    })

// -------------------GET-------------------

it("Should return all jobs as JSON when GET /api/jobs is called, async", async () =>{
    const response = await api
        .get("/api/jobs")
        .set("Authorization","Bearer " + token)
        .expect(200)
        .expect("Content-type", /application\/json/);
    expect(response.body).toHaveLength(jobs.length);
});

it("should return 401 if no token is provided", async () => {
    await api.get("/api/jobs").expect(401)
})

// -----------------POST------------------

it("should create one job when POST /api/jobs is called", async () => {
    const newJob = {
        title: "New Job Title",
        type: "Part-time",
        description: "great new job",
        company:{
            name: "New TestCompany",
            contactEmail: "test@company2.com",
            contactPhone: "+358 123456789",
        },
        location: "Some City",
        salary: 5000
    }
    
    const response = await api
    .post("/api/jobs")
    .set("Authorization", "Bearer " + token)
    .send(newJob)
    .expect(200);

    expect(response.body.title).toBe(newJob.title);
});

// ---------------- GET by ID -------------------

it("should return one job by ID", async () => {
    const job = await Job.findOne();
    const response = await api
        .get(`/api/jobs/${job._id}`)
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .expect("Content-type", /application\/json/)

    expect(response.body.name).toBe(jobs.name)
});

// ---------------- PUT -------------------

it("should update one job by ID", async () => {
    const job = await Job.findOne();
    const updatedJob = { description: "Updated job description", title: "Updated Title"}

    const response = await api
      .put(`/api/jobs/${job._id}`)
      .set("Authorization", "Bearer " + token)
      .send(updatedJob)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.description).toBe(updatedJob.description);
    const updatedJobCheck = await Job.findById(job._id)
    expect(updatedJobCheck.title).toBe(updatedJob.title);
});

// ---------------- DELETE ----------------
it("should delete one job by ID", async () => {
    const job = await Job.findOne();
    await api
        .delete(`/api/jobs/${job._id}`)
        .set("Authorization", "Bearer " + token)
        .expect(204);   

    const jobCheck = await Job.findById(job._id);
    expect(jobCheck).toBeNull();
});  
});

afterAll(async () => {
    await mongoose.connection.close();
})