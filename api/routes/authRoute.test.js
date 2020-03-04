const server = require("../server.js");
const request = require("supertest");
const knex = require("../../config/knexConfig");

const initialize = async () => {
  await knex.raw('TRUNCATE TABLE user_creds RESTART IDENTITY CASCADE');
  await knex('users').del();
}

beforeAll(() => {
  return initialize();
})

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
