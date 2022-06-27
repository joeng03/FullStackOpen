const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("../models/User");
const app = require("../app");
const api = supertest(app);

const initUsers = [
  {
    username: "bbb",
    name: "bbb",
    password: "bbb",
  },
  {
    username: "bbbbb",
    name: "bbb",
    password: "bbbbb",
  },
];
beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(initUsers);
});
describe("POST request to create new user works properly", () => {
  test("Invalid username", async () => {
    const invalidUser = {
      username: "aa",
      name: "aaa",
      password: "aaa",
    };
    const expectedErrMsg = {
      error: "Username must be at least 3 characters long",
    };
    const errMsg = await api.post("/api/users").send(invalidUser).expect(400);
    expect(errMsg.body).toEqual(expectedErrMsg);
  });
  test("Invalid password", async () => {
    const invalidUser = {
      username: "aaa",
      name: "aaa",
      password: "aa",
    };
    const expectedErrMsg = {
      error: "Password must be at least 3 characters long",
    };
    const errMsg = await api.post("/api/users").send(invalidUser).expect(400);
    expect(errMsg.body).toEqual(expectedErrMsg);
  });
  test("Username already taken", async () => {
    const invalidUser = {
      username: "bbb",
      name: "aaa",
      password: "aaa",
    };
    const expectedErrMsg = {
      error: "Username must be unique",
    };
    const errMsg = await api.post("/api/users").send(invalidUser).expect(400);
    expect(errMsg.body).toEqual(expectedErrMsg);
  });
  test("Valid User", async () => {
    const validUser = {
      username: "aaa",
      name: "aaa",
      password: "aaa",
    };
    const expectedCreatedUser = {
      username: "aaa",
      name: "aaa",
      blogs: [],
    };
    const createdUser = await api
      .post("/api/users")
      .send(validUser)
      .expect(201);
    delete createdUser.body._id;
    expect(createdUser.body).toEqual(expectedCreatedUser);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
