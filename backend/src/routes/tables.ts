import express from "express";
import * as TablesController from "../controllers/tables";

const router = express.Router();

router.get("/", TablesController.getTables);

router.post("/", TablesController.createTable);

export default router;
