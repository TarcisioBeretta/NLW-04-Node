import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Surveys", () => {

  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = await createConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new survey", async () => {
    const response = await request(app).post("/Surveys").send({
      title: "title example",
      description: "description example"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it("Should be able to get all surveys", async () => {
    const response = await request(app).get("/Surveys");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
