import request from "supertest";
import app from "../../index";
import { expect } from "chai";

describe("Register API", () => {
  it("should register a new user", (done) => {
    const userData = {
      username: "harrypotter",
      email: "harrypotter@gmail.com",
      password: "harry",
    };

    request(app)
      .post("/api/v1/auth/register")
      .send(userData)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        // Check if the response contains the token
        expect(res.body).to.have.property("payload");
        expect(res.body.payload).to.have.property("token");
        done();
      });
  });

  it("should return 400 for an already registered user", (done) => {
    const existingUser = {
      username: "usman",
      email: "usman@gmail.com",
      password: "usman123",
    };

    request(app)
      .post("/api/v1/auth/register")
      .send(existingUser)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        // Check if the response contains the error message
        expect(res.body).to.have.property("message", "User already exists!");
        done();
      });
  });
});
