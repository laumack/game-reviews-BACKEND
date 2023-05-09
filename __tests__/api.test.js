const request = require("supertest");
const app = require("../routes/api.router.js");
const connection = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  connection.end();
});

// When requesting multiple resources - test for shape
// When requesting a specific resource - test for specific properties

describe("/api/categories - GET request", () => {
  it("responds with a status code of 200", () => {
    return request(app).get("/api/categories").expect(200);
  });

  it("responds with an array of the category objects, each with a slug property and a description property", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => {
        const { categories } = response.body;
        expect(categories.length).toBe(4);
        categories.forEach((category) => {
          expect(typeof category.slug).toBe("string");
          expect(typeof category.description).toBe("string");
        });
      });
  });
});

describe.skip("error handling", () => {
  it("/api - responds with an error code of 404 if passed a route that does not exist (bad request)", () => {
    return request(app)
      .get("/api/invalidURL")
      .expect(404)
        .then((response) => {
        expect(response.body.msg).toBe("Invalid input");
      });
  });
});
