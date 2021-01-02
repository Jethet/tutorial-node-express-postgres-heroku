const express = require("express")
const port = process.env.PORT || 3000

const app = express()

app.get("/", (req, res) => {
  res.send("Welcome to our school API")
})

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
})