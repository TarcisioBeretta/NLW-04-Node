import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Users", () => {

  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = await createConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "Namexample",
      email: "user@mail.com"
    });

    expect(response.status).toBe(201);
  });

  it("Should not to be able to create a new user with a exists email", async () => {
    const response = await request(app).post("/users").send({
      name: "Namexample",
      email: "user@mail.com"
    });

    expect(response.status).toBe(400);
  });
});
