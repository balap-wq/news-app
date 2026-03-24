import app from "./app.js";
import {testConnection} from './config/db.js'

const PORT = 5000;

testConnection();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
