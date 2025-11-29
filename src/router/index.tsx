import { createHashRouter } from "react-router-dom";
import { routes } from "./config";

export const router = createHashRouter(routes);
export default router;