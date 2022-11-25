import {
  GETALL_COURSES,
  CREATE_CLOUTH,
  UPDATE_CLOUTH,
  DELETE_CLOUTH,
} from "../Actions/coursesAction";

const initialState = {
  clouths: [],
};
export const coursesReduce = (state = initialState, action) => {
  switch (action.type) {
    case GETALL_COURSES:
      return {
        ...state,
        clouths: [...action.payload],
      };
    case CREATE_CLOUTH:
      return {
        ...state,
        clouths: [...state.clouths, action.payload],
      };
    case UPDATE_CLOUTH:
      return {
        ...state,
        clouths: state.clouths.map((x) => {
          if (x.docId === action.payload.docId) {
            return {
              ...x,
              ...payload,
            };
          } else {
            return x;
          }
        }),
      };
    case DELETE_CLOUTH:
      return {
        ...state,
        clouths: state.clouths.filter((x) => x.docId !== action.payload.docId),
      };
    default:
      return { ...state };
  }
};
