import request from "supertest";
import app from "../../index";
import { expect } from "chai";

describe("Register API", () => {
  it("should register a new user", (done) => {
    const userData = {
      username: "newuser",
      email: "newuser@example.com",
      password: "newuserpassword",
    };

    request(app)
      .post("/api/register")
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
      username: "existinguser",
      email: "existinguser@example.com",
      password: "existinguserpassword",
    };

    request(app)
      .post("/api/register")
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
