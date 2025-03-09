import { ADD_CART,START_ADD,FAIL_ADD, CHANGE_ADD_QTY, CHANGE_REMOVE_QTY, OPEN_POP, CLOSE_POP, GET_REST, GET_USER, GET_ADDR, FETCH_CART, SAVE_CART, OPEN_DEL, CLOSE_DEL } from './actionType';
import { SET_RESTAURANTS } from './actionType';
import axios from 'axios';

export const setRestaurants = (restaurants) => ({
    type: SET_RESTAURANTS,
    payload: restaurants,
  });
  
export const fetchRestaurants = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:1000/restdetails');
        dispatch(setRestaurants(response.data));
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };
};
  

export const addToCart = (product) => (dispatch) => {
    dispatch({type: START_ADD})
    try{
        console.log("dispatched :",product);
        dispatch({
            type: ADD_CART, 
            payload: product,
        });
    }catch(err){
        console.log(err);
        dispatch({type:FAIL_ADD})
    }
};

export const changeAddQty=(product)=>(dispatch)=>{
  try{
    dispatch({
      type: CHANGE_ADD_QTY,
      payload:{
        _id:product._id,
        qty:product.qty
      }
    })
  }catch(err){
    console.log(err)
  }
}

export const changeRemoveQty=(product)=>(dispatch)=>{
  try{
    dispatch({
      type:CHANGE_REMOVE_QTY,
      payload:{
        _id:product._id,
        qty:product.qty
      }
    })
  }catch(err){
    console.log(err)
  }
}

export const openAdd = (prop) => (dispatch) => {
  try {
    dispatch({
      type: OPEN_POP,
      payload: {
        open: prop,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const closeAdd = (prop) => (dispatch) => {
  try {
    dispatch({
      type: CLOSE_POP,
      payload: {
        open: prop,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const openDel = (prop) => (dispatch) => {
  try {
    dispatch({
      type: OPEN_DEL,
      payload: {
        opendel: prop,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const closeDel = (prop) => (dispatch) => {
  try {
    dispatch({
      type: CLOSE_DEL,
      payload: {
        opendel: prop,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getRestAction = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:1000/restaurantgetdetails');
    dispatch({
      type: GET_REST,
      payload: response.data, 
    });
  } catch (err) {
    console.error('Error fetching restaurant details:', err);
  }
};

export const getUser=(token)=>async (dispatch)=>{
  try{
    const response = await axios.get('http://localhost:1000/getuser',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log(response.data)
    dispatch({
      type:GET_USER,
      payload:response.data
    })
  }catch(err){
    console.log(err)
  }
}

export const getAddr=(token)=>async (dispatch)=>{
  try{
    const response=await axios.get('http://localhost:1000/addresses',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    dispatch({
      type:GET_ADDR,
      payload:response.data
    })
  }catch(err){
    console.log(err)
  }
}

export const savecart=(items)=>async (dispatch)=>{
  const userId=localStorage.getItem("userId");
  const token=localStorage.getItem("token");
  
  try{
    const response = await axios.post('http://localhost:1000/usercart',{userId,items},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log({items})
    dispatch({
      type:SAVE_CART,
      payload:response.data
    })
  }catch(err){
    console.log(err)
  }
}

export const fetchCart=()=>async (dispatch)=>{
  const userId=localStorage.getItem("userId");
  const token=localStorage.getItem("token")
  if(!userId){
    console.log("user Not Found")
  }
  try{
    const response=await axios.get(`http://localhost:1000/usercartget/${userId}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log(response.data)
    dispatch({
      type:FETCH_CART,
      payload:response.data
    })
  }catch(err){
    console.log(err)
  }
}