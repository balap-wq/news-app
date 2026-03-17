const request = require("supertest");
const app = require("../src/app");

describe("GET /api/headlines", () => {

  test("should return 200 with paginated data", async () => {

    const res = await request(app)
      .get("/api/headlines?page=1&limit=20");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");

  });

  test("should return 400 for invalid category", async () => {

    const res = await request(app)
      .get("/api/headlines?category=invalid");

    expect(res.statusCode).toBe(400);

  });

  test("should return 400 when page is 0", async () => {

    const res = await request(app)
      .get("/api/headlines?page=0");

    expect(res.statusCode).toBe(400);

  });

});