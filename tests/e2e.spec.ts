import request from 'supertest';
import { app } from '../src/index';

describe("GET /players", () => {
  it("should return the list of all players", async () => {
    const res = await request(app).get("/players");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return the list of all players sorted", async () => {
    const res = await request(app).get("/players");
    expect(res.statusCode).toBe(200);
    expect(res.body[0].level).toBeGreaterThan(res.body[res.body.length - 1].level);
  });
});

describe("GET /player/:id", () => {
  it("should return a specific player", async () => {
    const res = await request(app).get("/player/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return 404 with an incorrect ID", async () => {
    const res = await request(app).get("/player/88888987754");
    expect(res.statusCode).toBe(404);
  });
});

describe("GET /players-analystics", () => {
  it("should return the metrics", async () => {
    const res = await request(app).get("/players-analystics");
    expect(res.statusCode).toBe(200);
  });

  it("should return the metrics fast", async () => {
    const res = await request(app).get("/players-analystics");
    expect(res.statusCode).toBe(200);
  });
});