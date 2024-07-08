import app from "./app";
import { errorHandler } from "./middlewares/errorHandler";

const PORT = process.env.PORT || 3000;

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
