const server = require("../server.js");
const request = require("supertest");

describe("REGISTER USER", () => {
  it("Should return status code 201, and contain token", async () => {
    const res = await request(server)
      .post("/auth/user/register")
      .send({
        email: "htmlRulZd00d@gmail.com",
        username: "SuperHacker",
        password: "sup3r5ecr3tkey",
        firstName: "James",
        lastName: "Bond"
      })
      .set("Content-Type", "application/json");
    
    expect(res.status).toBe(201);
    expect(res.body.token).toBeTruthy();
  });
});

describe("USER LOGIN", () => {
  it("Should login successfully, returning a token", async () => {
    const res = await request(server)
      .post("/auth/login")
      .send({
        email: "htmlRulZd00d@gmail.com",
        password: "sup3r5ecr3tkey"
      })
      .set("Content-Type", "application/json");
    
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
  });
});
