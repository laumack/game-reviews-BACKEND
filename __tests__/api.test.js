const request = require("supertest");
const app = require("../routes/api.router.js");
const connection = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const endpointsDocument = require("../endpoints.json");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  connection.end();
});

describe("/api - GET request", () => {
  it("responds with a status code of 200 and a JSON describing all the available endpoints on the api", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((response) => {
        expect(response.body.endpoints).toEqual(endpointsDocument);
      });
  });
});

describe("/api/categories - GET request", () => {
  it("responds with a status code of 200 and an array of the category objects, each with a slug property and a description property", () => {
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

describe("Error handling", () => {
  it("invalid path - responds with a status code of 404 and a specified error message if passed a route that does not exist", () => {
    return request(app)
      .get("/api/invalidEndpoint")
      .expect(404)
      .then((response) => {
        console.log("response: ", response.error);
        expect(response.body.msg).toEqual("Invalid input");
      });
  });
});
