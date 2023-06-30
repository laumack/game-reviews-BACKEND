# **Board-Master:** back-end
## Back-end project for a board game review website

To view the currently available endpoints, please visit: https://nc-games-xkym.onrender.com/api

The front-end repo is here: https://github.com/laumack/game-reviews-FRONTEND

This project is a ***work in progress***. Future plans include:
* making use of Express routers to help breakdown the logic into subrouters
* adding the following further endpoints:
    * GET /api/users/:username
    * PATCH /api/comments/:comment_id
    * POST /api/reviews
    * GET /api/reviews (pagination)
    * POST /api/categories
    * DELETE /api/reviews/:review_id 
* refactoring any code and ensuring that all files have been separated by their endpoint type

---

## Setup the environment variables
To connect to the development and test databases you will need to create a _.env.development_ file and a _.env.test_ file.

Within the _.env.development_ file, add the following code:

```
PGDATABASE=nc_games
```

Within the _.env.test_ file, add the following code:

```
PGDATABASE=nc_games_test
```
---
#

