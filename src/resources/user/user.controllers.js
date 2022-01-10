import { crudControllers } from "../../utils/crud"
import { User } from "./user.model"

export const userControllers = crudControllers(User)