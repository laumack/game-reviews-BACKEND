# **Board-Master:** Back-end
*Back-end project for a board game review website* - WORK IN PROGRESS

## Background

This project builds an API for the purpose of accessing application data programmatically. The intention is to mimic the building of a real world backend service (such as [reddit](https://www.reddit.com/)) which should provide this information to the front end architecture.

The database is [PSQL](https://www.postgresql.org/), and it is interacted with using [node-postgres](https://node-postgres.com/).

## Links

>To view the *currently* available endpoints, please visit:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **https://nc-games-xkym.onrender.com/api**

>The front-end repo is here:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **https://github.com/laumack/game-reviews-FRONTEND**

## Plans

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
---

# Project Setup

## Environment Variables
To connect to the development and test databases you will need to create an _.env.development_ file and an _.env.test_ file.

Within the _.env.development_ file, add the following code:

```
PGDATABASE=nc_games
```

Within the _.env.test_ file, add the following code:

```
PGDATABASE=nc_games_test
```

---

