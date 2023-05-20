\c nc_games_test;


SELECT review_id
FROM reviews
WHERE owner = $1;
[req.params]

-- \dt;

-- \d users;

-- \d reviews;

-- \c nc_games_test

-- \dt
-- \d reviews;
-- \d comments;

-- SELECT animal_name
-- FROM animals
-- LEFT JOIN northcoders ON northcoders.favourite_animal_id = animals.animal_id
-- GROUP BY animals.animal_id;

-- SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer, COUNT(comments.review_id) AS comment_count
-- FROM reviews
-- LEFT JOIN comments ON reviews.review_id = comments.review_id
-- GROUP BY owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer
-- ORDER BY created_at DESC;


-- SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer
-- FROM reviews
-- LEFT JOIN comments
-- ON reviews.review_id = comments.review_id
-- COUNT review_id
-- GROUP BY reviews.review_id
-- ORDER BY reviews.created_at DESC;

-- -- LEFT JOIN comments ON comments.review_id = reviews.review_id
-- -- -- GROUP BY 
-- -- ORDER BY created_at DESC;

-- -- owner, title, review_id, category, review_img_url, created_at, votes, designer

-- -- // left join comments to review id + group by

-- -- CREATE TABLE reviews_comments (
-- --     review_id INT REFERENCES reviews(review_id),
-- --     review_id INT REFERENCES comments(review_id)
-- );

-- SELECT * FROM reviews_comments;
