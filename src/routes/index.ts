import { Router } from "express";
import {
    ListController,
    ListPerMonthController,
    ListStudentsPerMonthController,
    updateController
} from "../controllers";

const routes = Router();


routes.get('/', ListController);
routes.get('/list/month/:month', ListPerMonthController);
routes.get('/list-students/:month', ListStudentsPerMonthController);
routes.post('/update', updateController);

export { routes };