import request from 'supertest';
import { app, server } from '../src/index';
import { PLAYER_DATABASE } from '../src/assets/players.database';

describe("GET /players", () => {
  it("should return the list of all players", async () => {
    const res = await request(app).get("/players");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return the list of all players sorted", async () => {
    const res = await request(app).get("/players");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(PLAYER_DATABASE.length);
    expect(res.body[res.body.length - 1].data.rank).toBeGreaterThan(res.body[0].data.rank);
  });
});

describe("GET /player/:id", () => {
  it("should return a specific player", async () => {
    const player = {
      id: 52,
      firstname: "Novak",
      lastname: "Djokovic",
      shortname: "N.DJO",
      sex: "M",
      country: {
        picture: "https://data.latelier.co/training/tennis_stats/resources/Serbie.png",
        code: "SRB"
      },
      picture: "https://data.latelier.co/training/tennis_stats/resources/Djokovic.png",
      data: {
        rank: 2,
        points: 2542,
        weight: 80000,
        height: 188,
        age: 31,
        last: [1, 1, 1, 1, 1]
      }
    }
    const res = await request(app).get(`/player/${player.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(player);
  });

  it("should return a random player from database", async () => {
    const player = PLAYER_DATABASE[Math.floor(Math.random() * PLAYER_DATABASE.length)];
    const res = await request(app).get(`/player/${player.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(player);
  });

  it("should return 404 with an incorrect ID", async () => {
    const res = await request(app).get("/player/5552");
    expect(res.statusCode).toBe(404);
  });
});

describe("GET /players-analystics", () => {
  it("should return the metrics", async () => {
    const res = await request(app).get("/players-analystics");
    expect(res.statusCode).toBe(200);
  });

  it("should return the metrics in lest than half a second", async () => {
    const startTime = (new Date()).getTime();
    const res = await request(app).get("/players-analystics");
    const endTime = (new Date()).getTime();
    expect(res.statusCode).toBe(200);
    expect(endTime - startTime).toBeLessThan(500);
  });
});

afterAll((done) => {
  server.close(done);
})