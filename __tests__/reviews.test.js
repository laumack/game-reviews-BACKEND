const request = require("supertest");
const app = require("../routes/api.router.js");
const connection = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
require("jest-sorted");

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

describe("/api/reviews - GET request", () => {
  it("responds with a status code of 200 and an array of the review objects, with the requested properties and an additional property of comment_count", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((response) => {
        const { reviews } = response.body;
        expect(reviews.length).toBe(13);
        reviews.forEach((review) => {
          expect(typeof review.comment_count).toBe("number");
          expect(review).not.toHaveProperty("review.body");
          expect(typeof review.owner).toBe("string");
          expect(typeof review.title).toBe("string");
          expect(typeof review.review_id).toBe("number");
          expect(typeof review.category).toBe("string");
          expect(typeof review.review_img_url).toBe("string");
          expect(typeof review.created_at).toBe("string");
          expect(typeof review.votes).toBe("number");
          expect(typeof review.designer).toBe("string");
          expect(typeof review.title).toBe("string");
        });
      });
  });
  it("the array of review objects should be sorted by descending order of date", () => {
    return request(app)
      .get("/api/reviews")
      .then((response) => {
        const { reviews } = response.body;
        expect(reviews).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  it("invalid path - responds with a status code of 404 and a specified error message if passed a route that does not exist", () => {
    return request(app)
      .get("/api/notARoute")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid input");
      });
  });
});

describe("/api/reviews/:review_id/comments - GET request", () => {
  it("responds with a status code of 200 and an array of comments for the given review id number, with the specified properties (testing on a review id with multiple comments)", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then((response) => {
        const comments = response.body.comments;
        expect(comments.length).toBe(3);
        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.review_id).toBe("number");
        });
      });
  });
  it("the array of comments for the given review id number should be sorted by descending order of date", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .then((response) => {
        const reviews = response.body.comments;
        expect(reviews).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  it("resource does not exist - responds with a status code of 404 and a specified error message if passed a review_id that does not exist", () => {
    return request(app)
      .get("/api/reviews/999/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not found");
      });
  });
  it("invalid ID - responds with a status code of 400 and a specified error message if passed an invalid review_id", () => {
    return request(app)
      .get("/api/reviews/notAnId/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid input");
      });
  });
  it("route does not exist - responds with a status code of 404 and a specified error message if passed a route that does not exist", () => {
    return request(app)
      .get("/api/reviews/2/notARoute")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid input");
      });
  });
});
