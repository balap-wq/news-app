import { jest } from "@jest/globals";

const mockGetArticles = jest.fn();
const mockCountArticles = jest.fn();

jest.unstable_mockModule("../src/repositories/headlinesRepository.js", () => ({
  getArticles: mockGetArticles,
  countArticles: mockCountArticles
}));

const { getHeadlines } = await import("../src/controllers/headlinesController.js");

describe("GET /api/headlines", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //  EXISTING TEST
  test("pagination logic", async () => {

    mockGetArticles.mockResolvedValue([
      { title: "News 1", author: "A" },
      { title: "News 2", author: "B" }
    ]);

    mockCountArticles.mockResolvedValue(20);

    const req = {
      query: { page: 2, limit: 2 }
    };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await getHeadlines(req, res);

    expect(mockGetArticles).toHaveBeenCalledWith(2, 2);

    expect(res.json).toHaveBeenCalledWith({
      total: 20,
      page: 2,
      totalPages: 10,
      data: [
        { title: "News 1", author: "A" },
        { title: "News 2", author: "B" }
      ]
    });

  });

  // NEW TEST (FIELD FILTERING )
  test("field filtering logic", async () => {

    mockGetArticles.mockResolvedValue([
      { title: "News 1", author: "A", content: "abc" }
    ]);

    mockCountArticles.mockResolvedValue(1);

    const req = {
      query: { fields: "title,author" }
    };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await getHeadlines(req, res);

    expect(res.json).toHaveBeenCalledWith({
      total: 1,
      page: 1,
      totalPages: 1,
      data: [
        { title: "News 1", author: "A" } // content removed
      ]
    });

  });

});