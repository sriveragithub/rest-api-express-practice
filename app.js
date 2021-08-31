const express = require('express');
const app = express();
const records = require('./records')
const routes = require('./routes')

// Tells the app we are expecting requests to come in as json
app.use(express.json())
app.use('/api', routes)

// middleware for 404 not found errors
app.use((req, res, next) => {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message
    }
  })
})

app.listen(3000, () => console.log('Quote API listening on port 3000!'));