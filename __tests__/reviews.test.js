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

describe("/api/reviews/:review_id - GET request", () => {
  it("responds with a status code of 200, a review object with the correct properties (the columns of the reviews table), and the data relating to the provided review id number", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then((response) => {
        const review = response.body.review;
        expect(review.review_id).toBe(1);
        expect(review.title).toBe("Agricola");
        expect(review.category).toBe("euro game");
        expect(review.designer).toBe("Uwe Rosenberg");
        expect(review.owner).toBe("mallionaire");
        expect(review.review_body).toBe("Farmyard fun!");
        expect(review.review_img_url).toBe(
          "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700"
        );
        const date1 = new Date(1610964020514);
        expect(review.created_at).toBe(date1.toISOString());
        expect(review.votes).toBe(1);
      });
  });

  it("invalid ID - responds with a status code of 400 and corresponding error message if passed an invalid review ID", () => {
    return request(app)
      .get("/api/reviews/notAnId")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid input");
      });
  });

  it("unknown ID - responds with a status code of 404 and corresponding error message if passed a number that is not a current review ID number", () => {
    return request(app)
      .get("/api/reviews/999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not found");
      });
  });
});
