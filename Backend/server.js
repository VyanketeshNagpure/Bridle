import express from 'express';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import router from './routes/route.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
Connection();
app.use('/', router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
