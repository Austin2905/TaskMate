const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const tasksRouter = require('./routes/tasks');

app.use(bodyParser.json());
app.use(cors());

app.use('/api/tasks', tasksRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
