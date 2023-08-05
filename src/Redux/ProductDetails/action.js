 import { GET_DATA } from "./actionType";
 import { REACT_APP_API } from "../../env";
 import axios from "axios";
 const handlegetData=()=>{
    return(dispatch)=>{
      // http://localhost:3004/data
        axios.get(`${REACT_APP_API}/data`).then((res)=>{
             console.log(res.data);
            dispatch({
              type:GET_DATA,
              payload:res.data
            })
          })
    }
 }



 const addToCart=(object)=>{
    return(dispatch)=>{
        // console.log(object);
        axios.post(`${REACT_APP_API}/data`,object).then((res)=>{
            // console.log(object)
        })
        axios.get(`${REACT_APP_API}/data`).then((res)=>{
            console.log(res);
            dispatch({ type: "cart", payload: res.data });
})
}
}
 export {handlegetData,addToCart};