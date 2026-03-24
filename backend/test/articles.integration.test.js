import request from "supertest";
import { jest } from "@jest/globals";

const mockFindArticleById = jest.fn();

await jest.unstable_mockModule(
  "../src/repositories/articleRepository.js",
  () => ({
    findArticleById: mockFindArticleById,
  })
);

const { default: app } = await import("../src/app.js");

describe("GET /api/articles/:id Integration Tests", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 with article data", async () => {
    mockFindArticleById.mockResolvedValue({
      id: 1,
      title: "Test Article",
      description: "Test Desc",
    });

    const response = await request(app).get("/api/articles/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("title", "Test Article");
    expect(response.body).toHaveProperty("description", "Test Desc");
  });

  it("should return 404 if article not found", async () => {
    mockFindArticleById.mockResolvedValue(null);

    const response = await request(app).get("/api/articles/9999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error", "Article not found"); // ✅ exact message
    expect(response.body).toHaveProperty("articleId", 9999);            // ✅ added articleId
  });

  it("should return 400 if id is not a valid number", async () => {
    const response = await request(app).get("/api/articles/abc");

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid article ID"); // ✅ exact message
  });

  it("should return 404 if no id segment in path", async () => {
    const response = await request(app).get("/api/articles/");

    expect(response.statusCode).toBe(404);
  });

 

});