import app from "./app";
import { testConnection } from "./config/db";

const PORT = 5000;

testConnection();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});