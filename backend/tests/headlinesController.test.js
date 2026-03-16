import { getHeadlines } from "../src/controllers/headlinesController.js";
import * as repo from "../src/repositories/headlinesRepository.js";

jest.mock("../src/repositories/headlinesRepository.js");

describe("getHeadlines Controller", () => {

  test("should return paginated headlines", async () => {

    repo.findTopHeadlines = jest.fn().mockResolvedValue([
      { id: 1, title: "News 1" }
    ]);

    repo.countArticles = jest.fn().mockResolvedValue(10);

    const req = {
      query: { page: "1", limit: "9" }
    };

    const res = {
      json: jest.fn()
    };

    await getHeadlines(req, res);

    expect(repo.findTopHeadlines).toHaveBeenCalledWith({
      limit: 9,
      offset: 0
    });

    expect(res.json).toHaveBeenCalled();

  });

});