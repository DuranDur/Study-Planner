import express, { Request, Response, NextFunction } from "express";
import path from "path";
import routes from "./route.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));
app.use("/api", routes);

// Unknown API route
app.use("/api", (req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Catch-all for anything a handler throws
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
