# **Board-Master:** Backend 🎲
*Backend project for a board game review website* - WORK IN PROGRESS

## Background 📆

This project builds an API for the purpose of accessing application data programmatically. The intention is to mimic the building of a real world backend service (such as [reddit](https://www.reddit.com/)) which should provide this information to the front end architecture.

The database is [PSQL](https://www.postgresql.org/), and it is interacted with using [node-postgres](https://node-postgres.com/).

## Links 🔗

>To view the *currently* available **ENDPOINTS**, please visit:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **https://nc-games-xkym.onrender.com/api**  
(you may wish to use a JSON formatter extension to better view this data)

>The frontend repo is here:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **https://github.com/laumack/game-reviews-FRONTEND**

## Plans 📈

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

# Project Setup ⚛️

Fork and clone this repo on GitHub.

## Minimum Requirements ⚠️

* Node: v20.3.0
* Postgres: v14.8

## Install Dependencies 🧰

Install dependencies using:

```
$ npm install
```

## Environment Variables 🗺️

To connect to the development and test databases you will need to create an _.env.development_ file and an _.env.test_ file.

Within the _.env.development_ file, add the following code:

```
PGDATABASE=nc_games
```

Within the _.env.test_ file, add the following code:

```
PGDATABASE=nc_games_test
```

## Seed Databases 🌱

There are two databases included with this project, one for the live *development* data, and a smaller one for *test* data.

To seed the databases, you will need to run:

```
$ npm run setup-dbs
$ npm run seed
```

## Run Tests 👩‍🎓

The project was built using Test-Driven Development throughout, with [Jest](https://jestjs.io/) and [Jest-Sorted](https://github.com/P-Copley/jest-sorted). As a result, there are comprehensive tests included, which you can run by using:

```
$ npm test
```

---
---

# Credits 🙏

This project was started when I was a student on a [Northcoders](https://northcoders.com/) Software Development Bootcamp. The initial template repo was provided by Northcoders.  

# License ©️

MIT License

Copyright (c) 2023 Lauren Alexandra McIntyre

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## [Back to top 🔝](#board-master-backend-🎲)
