# Expense Tracker

An expense tracker app made using the MERN stack: MongoDB, Express, React, Node.js, and Redux

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Mongo](https://www.mongodb.com/) 3.5.7+
* [Express.js](https://expressjs.com/) 4.17.1+
* [React.js](https://reactjs.org/) 16.13.1+
* [Node.js](https://nodejs.org/en/) 12.14.1+
* [Redux.js](https://redux.js.org/) 4.0.5+

### Installing

Clone this repo:

```
git clone git@github.com:cryptoshell/expense-tracker.git
```

### Configure

After all the prerequisites are installed, make sure to check if your MongoDB is up.

Run Mongo:
```
$ brew services start mongodb
$ mongo
> use expense
```

Run your client:
```
$ cd expense-tracker
$ cd server
$ yarn install
$ nodemon server.js // or npx nodemon server.js
```

Run your server:
```
$ cd expense-tracker
$ cd client
$ yarn install
$ yarn start
```