import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config(); // This way .env variables are available anywhere in the project.

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.ENV === "dev") {
  (async () => {
    const morgan = (await import("morgan")).default; // Dinamic import for morgan, so it's only used if we are under the 'development' environment.
    app.use(morgan("dev"));
  })();
}

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Aleja's server API!");
});

app.listen(port, () => {
  console.log(`[SERVER]: Server is running at port ${port}`);
});
