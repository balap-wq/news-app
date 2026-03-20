import request from "supertest";
import { jest } from "@jest/globals";

// ✅ Mock functions
const mockFindTopHeadlines = jest.fn();
const mockCountArticles = jest.fn();

// ✅ Mock service BEFORE importing app
await jest.unstable_mockModule("../src/services/articleService.js", () => ({
  findTopHeadlines: mockFindTopHeadlines,
  countArticles: mockCountArticles,
}));

// ✅ Import app AFTER mock
const { default: app } = await import("../src/app.js");

describe("GET /api/headlines Integration Tests", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ SUCCESS CASE
  it("should return 200 with paginated data", async () => {
    mockFindTopHeadlines.mockResolvedValue([
      {
        id: 1,
        title: "Test News",
        description: "Desc",
        urlToImage: "img.jpg",
        sourceName: "BBC",
        publishedAt: new Date(),
      },
    ]);

    mockCountArticles.mockResolvedValue(1);

    const response = await request(app)
      .get("/api/headlines?page=1&limit=5");

    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("page");
    expect(response.body).toHaveProperty("limit");
  });

  // ❌ INVALID CATEGORY
  it("should return 400 for invalid category", async () => {
    const response = await request(app)
      .get("/api/headlines?category=invalid");

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  // ❌ INVALID PAGE
  it("should return 400 when page is 0", async () => {
    const response = await request(app)
      .get("/api/headlines?page=0");

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

});