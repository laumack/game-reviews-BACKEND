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

describe("/api/reviews/:review_id - PATCH request", () => {
  it("responds with a status code of 200 and the updated review object (with votes count amended)", () => {
    const newVote = { inc_votes: 1 };
    return request(app)
      .patch("/api/reviews/2")
      .send(newVote)
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual({
          review_id: 2,
          title: "Jenga",
          designer: "Leslie Scott",
          owner: "philippaclaire9",
          review_img_url:
            "https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700",
          review_body: "Fiddly fun for all the family",
          category: "dexterity",
          created_at: "2021-01-18T10:01:41.251Z",
          votes: 6,
        });
      });
  });
  it("returns an error if the required information is not provided - inc_votes", () => {
    const newVote = { inc_votes: "" };
    return request(app)
      .patch("/api/reviews/2")
      .send(newVote)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual("Invalid input");
      });
  });
  it("returns an error if the required information is not provided in the correct format - a number", () => {
    const newVote = { inc_votes: "hello" };
    return request(app)
      .patch("/api/reviews/2")
      .send(newVote)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual("Invalid input");
      });
  });
});

describe("/api/reviews/? - QUERIES", () => {
  it("CATEGORY - the array of user objects can be filtered by category (this test shows: 'euro game')", () => {
    return request(app)
      .get("/api/reviews/?category=euro%20game")
      .expect(200)
      .then((response) => {
        const { reviews } = response.body;
        expect(reviews.length).toBe(1);
        reviews.forEach((review) => {
          expect(review.category).toBe("euro game");
        });
      });
  });
  it("CATEGORY - the array of user objects can be filtered by category (this test shows: 'social deduction')", () => {
    return request(app)
      .get("/api/reviews/?category=social%20deduction")
      .expect(200)
      .then((response) => {
        const { reviews } = response.body;
        expect(reviews.length).toBe(11);
        reviews.forEach((review) => {
          expect(review.category).toBe("social deduction");
        });
      });
  });
  it.skip("SORT_BY - the array of user objects can be sorted by any valid column, and defaults to descending order (this test shows: 'owner')", () => {
    return request(app)
      .get("/api/reviews/?sort_by=owner")
      .expect(200)
      .then((response) => {
        const { reviews } = response.body;
        expect(reviews).toBeSortedBy("owner", {
          descending: true,
        });
      });
  });
  it.skip("SORT_BY - the array of user objects can be sorted by any valid column, and defaults to descending order (this test shows: 'review_body')", () => {
    return request(app)
      .get("/api/reviews/?sort_by=review_body")
      .expect(200)
      .then((response) => {
        const { reviews } = response.body;
        expect(reviews).toBeSortedBy("review_body", {
          descending: true,
        });
      });
  });
  it.skip("ORDER - the array of user objects can be ordered by ascending or descending order of the chosen column (this test shows: 'designer', 'ascending')", () => {
    return request(app)
      .get("/api/reviews/?sort_by=designer&order=asc")
      .expect(200)
      .then((response) => {
        const { reviews } = response.body;
        expect(reviews).toBeSortedBy("designer", {
          descending: false,
        });
      });
  });
  it.skip("ORDER - the array of user objects can be ordered by ascending or descending order of the chosen column (this test shows: 'title', 'ascending')", () => {
    return request(app)
      .get("/api/reviews/?sort_by=title&order=asc")
      .expect(200)
      .then((response) => {
        const { reviews } = response.body;
        expect(reviews).toBeSortedBy("title", {
          descending: false,
        });
      });
  });
  it.skip("unknown query - responds with a status code of 404 and corresponding error message if passed an unknown query parameter", () => {
    return request(app)
      .get("/api/reviews/?category=nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not found");
      });
  });
});
