import { Router, Request, Response } from "express";
const router = Router()

router.get("/tasks", (req:Request, res:Response)=>{
    res.send("Hello from TypeScript + Express!");
    res.json([])
})

export default router; 