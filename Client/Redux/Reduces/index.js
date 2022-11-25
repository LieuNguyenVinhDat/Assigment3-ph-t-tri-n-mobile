import { creteStore, combineReducers } from "redux";
import { coursesReduce } from "./coursesReduce";
export const rootReducer = combineReducers({
  courses: coursesReduce,
});
