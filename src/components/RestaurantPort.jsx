import React,{useState} from 'react';
import './RestaurantPort.css';
import { useParams } from 'react-router';
import { SiSwiggy } from "react-icons/si";
import { IoIosSearch } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { LuBadgeHelp } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { Link } from 'react-router';
import { GiAlliedStar } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, savecart } from '../storeRedux/cartAction';

const RestaurantPort = () => {
    const {restID,restaurantID}=useParams();
    const dispatch=useDispatch()
    const [scroller,setScroller]=useState(0);
    const product=useSelector((state)=>state.cart.products) 
    const cart=useSelector((state)=>state.cart.cart) 
    const rests=useSelector((state)=>state.restaurant.restaurant);

    const handlerScroll=(direction)=>{
      const getrestId=document.getElementById('rest-id');
      const scroller=300
      if(direction==='left'){
        getrestId.scrollTo({
          left:getrestId.scrollLeft-scroller,
          behavior:"smooth"
        })
      }else if(direction==="right"){
        getrestId.scrollTo({
          left:getrestId.scrollLeft+scroller,
          behavior:"smooth"
        })
      }
    }

    const filteredItems=product.filter((item)=>
      Array.isArray(item.restaurantId) 
      ? item.restaurantId.includes(decodeURIComponent(restaurantID))
      : item.restaurantId === decodeURIComponent(restaurantID)
    )

    const filteredRest=rests.filter((rest)=>
      Array.isArray(rest.restaurantId) 
      ? rest.restaurantId.includes(decodeURIComponent(restaurantID))
      : rest.restaurantId === decodeURIComponent(restaurantID)
    )

     const handlerAddtoCart=(item)=>{
        dispatch(addToCart(item))
        const updatedcart=[...cart,item]
        dispatch(savecart(updatedcart))
      }

  return (
    <div className='port-main'>
        <nav className='nav-items'>
        <div className="left-nav">
        <Link to='/'><SiSwiggy className='si'/></Link>
        </div>
        <div className="right-nav">
        <Link to='/search'  style={{ textDecoration: "none", color: "black" }}><div className="search"><IoIosSearch style={{height:"30px", width:"30px"}}/>Search</div></Link>
        <div className="offer"><BiSolidOffer style={{height:"30px", width:"30px"}}/>Offers</div>
        <div className="help"><LuBadgeHelp style={{height:"30px", width:"30px"}}/>Help</div>
        <div className="sigin"><IoPersonSharp style={{height:"30px", width:"30px"}}/>Sigin</div>
         <Link to='/cart' style={{textDecoration:"none",color:"black"}}>
            <div className="cart"> <BsCart2 style={{ height: "30px", width: "30px" }}/>
            {cart && cart.length > 0 ? (
          <div>{cart.reduce((total,item)=>total+item.qty,0)}</div>) : (<div>0</div>)}
            Cart
            </div>
          </Link>
        </div>
      </nav>
      <div className="rest-details-body">
        <div className="rest-name">{restID}</div>
        {
          filteredRest.map((restes)=>(
            <div className="rest-overview">
          <div className="rating"><GiAlliedStar style={{ color: 'green', height: '25px', width: '25px', margin: '0.2rem' }} />
          {restes.restRating} (50 ratings) . ₹600 for two</div>
          <div className="cuisine">{restes.restItems}</div>
          <div className="location">Outlet: {restes.restPlace}</div>
          <div className="time">50-55 mins</div>
        </div>
          ))
        }
        <div className="rest-deals">
          <div className="rest-deals-header">
            <div className="deals-title">Deals for you</div>
            <div className="div-arrow-btn">
              <button className='arrow-btn'  onClick={() => handlerScroll("left")}>&#8592;</button>
              <button className='arrow-btn'  onClick={() => handlerScroll("right")}>&#8594;</button>
            </div>
          </div>
          <div className="rest-deals-box" id='rest-id' onScroll={(e)=>setScroller(e.target.scrollLeft)}>
            <div className="deal-box">
              <img src="/deals.avif" alt="" className='deal-img'/>
              <div className="deal-offer">Extra ₹40 off</div>
              <div className="deal-timer">ENDS IN 10h : 58m : 5s</div>
            </div>
            <div className="deal-box">
              <img src="/dealday.avif" alt="" className='deal-img'/>
              <div className="deal-offer">Item At ₹199</div>
              <div className="deal-timer">ENDS IN 10h : 58m : 5s</div>
            </div>
            <div className="deal-box">
              <img src="/peroffer.avif" alt="" className='deal-img'/>
              <div className="deal-offer">Flat ₹40 off</div>
              <div className="deal-timer">ENDS IN 10h : 58m : 5s</div>
            </div>
            <div className="deal-box">
              <img src="/peroffer.avif" alt="" className='deal-img'/>
              <div className="deal-offer">Flat ₹80 off</div>
              <div className="deal-timer">ENDS IN 10h : 58m : 5s</div>
            </div>
          </div>
        </div>
        <div className="menu-inputs">
          <div className="menu-title">MENU</div>
          <div className="menu-ip">
            Search for Dishes
          </div>
          <div className="menu-btn">
            <button className='menu-btns'>Bestseller</button>
            <button className='menu-btns'>Guidlines</button>
            <button className='menu-btns'>Bestseller</button>
            <button className='menu-btns'>Guidlines</button>
          </div>
        </div>
        <hr className='menu-hr'/>
        <div className="top-picks">
          <div className="top-title">Top picks</div>
          <div className="top-items">
            <img className='top-item-img' src="/burger2.avif" alt="" />
            <div className="top-item-add">ADD</div>
            <div className="top-item-price">₹40</div>
          </div>
          <div className="top-items">
            <img className='top-item-img' src="/burger2.avif" alt="" />
            <div className="top-item-add">ADD</div>
            <div className="top-item-price">₹40</div>
          </div>
        </div>
        <div className="rest-products">
          <div className="type-product">Special Items</div>
         {
          filteredItems.map((item)=>(
            <>
             <div className="rest-product-box" key={item._id}>
             <div className="product-title">{item.itemname}</div>
             <div className="product-price">₹{item.amount}</div>
              <div className="product-desc">
              Feel the crunch with Burger Combos 
              </div>
              <div className="product-img">
              <img className='prod-img' src={`http://localhost:1000/uploads/${item.image}`} alt="" />
              </div>
              <div className="product-add-cart" onClick={()=>handlerAddtoCart(item)}>ADD</div>
            </div>
            <hr className='prod-hr'/>
            </>
          ))
         }
        </div>
      </div>
    </div>
  )
}

export default RestaurantPort
