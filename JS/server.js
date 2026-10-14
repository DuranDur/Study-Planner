import express from "express";
import routes from "./route.js";
const app = express();
const port = 3000;
app.use(routes);
app.use(express.json());
// Explicitly typed req and res for TypeScript stability
app.get("/", (req, res) => {
    res.send("Hello from TypeScript + Express!");
});
// Added the port parameter and a callback function to confirm it is running
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
export default app;
//# sourceMappingURL=server.js.map