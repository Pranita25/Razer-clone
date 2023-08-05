import axios from "axios";
import { REACT_APP_API } from "../../env";
export const loginSucess = (email, password) => {
  return (dispatch) => {
    
    fetch(`${REACT_APP_API}/users`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        response.map((ele, i) => {
          if (ele.email === email && ele.password === password) {
            dispatch({ type: "isAuth", payload: true });
          }
        });
      });
  };
};
export const logoutSucess = () => {
  return (dispatch) => {
    dispatch({ type: "isAuthfalse", payload: false });
    console.log("fhhj");
  };
};

export const productAction = (sort, filter) => {
  console.log(sort, filter);
  // http://localhost:3004/data
  let url = `${REACT_APP_API}/data?`;
  if (sort) {
    url += `&_sort=price&_order=${sort}`;
  }
  if (filter) {
    url += `&specifications.screen=${filter}`;
  }

  return (dispatch) => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "data", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


export const addToCart = (object) => {
  return (dispatch) => {
    // console.log(object);
    // http://localhost:3004/cart
    axios.post(`${REACT_APP_API}/cart`, object).then((res) => {
      // console.log(object)
    });
    axios.get(`${REACT_APP_API}/cart`).then((res) => {
      console.log(res.data);
      dispatch({ type: "cart", payload: res.data });
    });
  };
};
