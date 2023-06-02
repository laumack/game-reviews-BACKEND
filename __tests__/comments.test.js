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
  it("responds with a status code of 200 and an empty comments array for the given review id number for a review which has no comments", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then((response) => {
        const comments = response.body.comments;
        expect(comments.length).toBe(0);
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
        expect(response.body.msg).toBe("Review ID not found");
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

describe("/api/reviews/:review_id/comments - POST request", () => {
  it("responds with a status code of 201 and the new comment which has been added to the database", () => {
    const newComment = {
      body: "I hate this game!",
      username: "bainesface",
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toEqual({
          comment_id: 7,
          body: "I hate this game!",
          votes: 0,
          author: "bainesface",
          review_id: 1,
          created_at: expect.any(String),
        });
      });
  });
  it("returns an error if the required information is not provided - username", () => {
    const newComment = {
      body: "I hate this game!",
      username: "",
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual("Missing required data");
      });
  });
  it("returns an error if the required information is not provided - body", () => {
    const newComment = {
      body: "",
      username: "bainesface",
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual("Missing required data");
      });
  });
});

describe("/api/comments/:comment_id - DELETE request", () => {
  it("responds with a status code of 204 but does not send a response body", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });
  it("resource does not exist - responds with a status code of 404 and a specified error message if passed a comment_id that does not exist", () => {
    return request(app)
      .get("/api/comments/999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid input");
      });
  });
  it("invalid ID - responds with a status code of 400 and a specified error message if passed an invalid review_id", () => {
    return request(app)
      .get("/api/comments/notAnId")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid input");
      });
  });
});
