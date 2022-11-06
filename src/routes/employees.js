import { Router } from "express";
import {
  geEmployees,
  createEmployees,
  deleteEmployees,
  updateEmployees,
  getEmployee,
} from "../controllers/employeeController.js";

const router = Router();

router.get("/employees", geEmployees);

router.get("/employees/:id", getEmployee);

router.post("/employees", createEmployees);

router.patch("/employees/:id", updateEmployees);

router.delete("/employees/:id", deleteEmployees);

export default router;
