import { ADD_CART, CLOSE_DEL, CLOSE_POP, FETCH_CART, GET_ADDR, GET_REST, GET_USER, OPEN_DEL, OPEN_POP, SAVE_CART } from './actionType';
import { SET_RESTAURANTS } from './actionType';
import { CHANGE_ADD_QTY, CHANGE_REMOVE_QTY } from './actionType';

const initialState = {
    products:[],
    cart:[],
    open:false,
    opendel:false
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RESTAURANTS:
            return {
                ...state,
                products: action.payload,
            };
        case ADD_CART: {
            const itemIndex = state.cart.findIndex(
                (item) => item._id === action.payload._id
            );
            const diffitem=state.cart.find(
                (item)=>item.restaurantId!==action.payload.restaurantId
            );
            if(diffitem){
                console.log("cannot be added because restaurant not same");
                return state;
            }
            if (itemIndex >= 0) {
                const updatedCart = state.cart.map((item, index) =>
                    index === itemIndex
                        ? { ...item, qty: (item.qty || 0) + 1 }
                        : item
                );
            
                console.log(updatedCart)
                return {
                    ...state,
                    cart: updatedCart,
                };
            }
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, qty: 1 }],
            };
        }

        case CHANGE_ADD_QTY:
            return{
                ...state,
                cart:state.cart.filter((c)=>
                    c._id === action.payload._id ? (c.qty=action.payload.qty+1):c.qty
                )
            }

        case  CHANGE_REMOVE_QTY:
            return {
                ...state,
                cart:state.cart.filter((c)=>
                    c._id === action.payload._id ? (c.qty=action.payload.qty-1):c.qty
                )
            }

            case OPEN_POP:
                console.log('Popup Open:', action.payload.open);
                return {
                  ...state,
                  open: action.payload.open,
                };
          
              case CLOSE_POP:
                console.log('Popup Close:', action.payload.open);
                return {
                  ...state,
                  open: action.payload.open,
                };

            case OPEN_DEL:
                    console.log('Delivery Open:', action.payload.opendel);
                    return {
                      ...state,
                      opendel: action.payload.opendel,
                    };
              
            case CLOSE_DEL:
                    console.log('Delivery Close:', action.payload.opendel);
                    return {
                      ...state,
                      opendel: action.payload.opendel,
                    };    

        default:
            return state;
    }
};

const initialState2={
    restaurant:[],
    user:null,
    addresses:[],
    usercart:[]
}

export const restaurantReducer=(state=initialState2,action)=>{
    switch(action.type){
        case GET_REST:
            return{
                ...state,restaurant:action.payload
            }
        case GET_USER:
            console.log(action.payload)
            return {
                ...state,user:action.payload
            }
        case GET_ADDR:
            return {
                ...state,addresses:action.payload
            }
        case SAVE_CART:
            return{
                ...state,usercart:action.payload
            }
        case FETCH_CART:
            return{
                ...state,usercart:action.payload
            }
        default:
            return state;
    }
}