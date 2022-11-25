export const GETALL_COURSES = "GETALL_COURSES";
export const CREATE_CLOUTH = "CREATE_CLOUTH";
export const UPDATE_CLOUTH ='UPDATE_CLOUTH'
export const DELETE_CLOUTH ='DELETE_CLOUTH'

export const getAllCourses = (Courses) => {
  return {
    type: GETALL_COURSES,
    payload: Courses,
  };
};
export const createClouth = (clouth) => {
  return {
    type: CREATE_CLOUTH,
    payload: clouth,
  };
};
export const updateClouth = (clouth) => {
  return {
    type: UPDATE_CLOUTH,
    payload: clouth,
  };
};
export const deleteClouth = (docId) => {
  return {
    type: DELETE_CLOUTH,
    payload: { docId },
  };
};
//action-thunk
export const fetchAllCourses = () => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5557/api/Courses");
        const Courses = await response.json();
        console.log("here", Courses);
        dispatch(getAllCourses(Courses));
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  };
};
export const postClouth = (clouth) => {
  return (dispatch) => {
    const postData = async () => {
      try {
        await fetch("http://localhost:5557/item", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clouth),
        });
      } catch (err) {
        console.log(err);
      }
    };
    postData();
    dispatch(createClouth(clouth));
  };
};
export const update = (docId, clouth) => {
  return (dispatch) => {
    const updateData = async () => {
      try {
        await fetch(`http://localhost:5557/update/${docId}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clouth),
        });
      } catch (err) {
        console.log(err);
      }
    };
    updateData();
    dispatch(updateClouth(clouth));
  };
};
export const deleteF = (docId) => {
  return (dispatch) => {
    const deleteData = async () => {
      try {
        await fetch(`http://localhost:5557/del/${docId}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.log(err);
      }
    };
    deleteData();
    dispatch(deleteClouth(docId));
  };
};

