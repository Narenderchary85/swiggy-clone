import React, { useState,useEffect } from 'react'
import './Homepage.css';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import { fetchRestaurants, getRestAction , getAddr, getUser, fetchCart} from '../storeRedux/cartAction';
import { IoPersonCircleSharp } from "react-icons/io5";

const Homepage = () => {
  const [scroller,setScroller]=useState(0);    
  const dispatch=useDispatch();
  const rests=useSelector((state)=>state.restaurant.restaurant);
  const uniqueitems=new Set();
  const token=localStorage.getItem("token");

  useEffect(()=>{
    dispatch(getRestAction())
    dispatch(fetchRestaurants())
    dispatch(fetchCart())
  },[dispatch])

  useEffect(()=>{
    dispatch(getAddr(token))
    dispatch(getUser(token))
  },[token])

  const filterUniqueItems=rests.filter((item)=>{
    const restItem = Array.isArray(item.restItems) ? item.restItems[0] : item.restItems;
    if(!uniqueitems.has(restItem)){
      uniqueitems.add(restItem);
      return true;
    }else{

      return false;
    }
  })

  const handlerScroll = (direction) => {
    const getitems=document.getElementById("scroller-items")
    const scrolllen=300
    if(direction==="left"){
      getitems.scrollTo({
        left:getitems.scrollLeft-scrolllen,
        behavior:"smooth"
      })
    }else if(direction==="right"){
      getitems.scrollTo({
        left:getitems.scrollLeft+scrolllen,
        behavior:"smooth"
      })
    }
  };

  const handlerLogout=(prop)=>{
    if(prop===false){
      localStorage.removeItem("token")
      console.log("logout successfully")
    }
  }

  return (
    <div>
      <div className="orange">
        <div className="nav-bar">
          <div className="swiggy-logo">Swiggy</div>
            <nav className="nav1">
                <div className="about">Swiggy Corporate</div>
                  {
                    token !== null ? (<><Link to='/profile'><div className="profile">
                      <IoPersonCircleSharp style={{height:"70px",width:"130px",borderRadius:"50%"}}/></div>
                    </Link>
                      <div className="log-out" onClick={()=>handlerLogout(false)}>logout</div>
                    </>):(<><Link to='/login' style={{textDecoration:"none"}}><div className="contact">login</div></Link>
                      <Link to='/register' style={{textDecoration:"none"}}><div className="goto">Sigin</div></Link></>)
                  }
            </nav>
        </div>
        <div className="front">
         <img src="/Veggies_new.png" className='veggies' alt="" />
        <div className="order">
            Order food & groceries. Discover best restaurants. Swiggy it!
        </div>
        <div className="enter">
          <Link to='/search'>
            <input type="text" className='inp' placeholder='Serach for restaurants ,items and more'/>
          </Link>
        </div>
        <img src="/Sushi_replace.png" className='sushi' alt="" />
        </div>
        <div className="box">
          <div className="food">
            <img className="delivery" src="/food-delivery.avif" alt="" />
            <img className="delivery" src="/food-delivery.avif" alt="" />
            <img className="delivery" src="/food-delivery.avif" alt="" />
            <img className="delivery" src="/food-delivery.avif" alt="" />
          </div>
        </div>
      </div>
       <div className="menu-container">
      <div className="menu-header">
        <h2 className='menu-h2'>Order our best food options</h2>
        <div className="arrow-buttons">
          <button onClick={() => handlerScroll("left")}>&#8592;</button>
          <button onClick={() => handlerScroll("right")}>&#8594;</button>
        </div>
      </div>
      <div className="menu-items" id='scroller-items' onScroll={(e)=>setScroller(e.target.scrollLeft)}>
       {
        filterUniqueItems.map((item)=>(
            <div key={item._id}>
           <Link  to={`/restaurants/${encodeURIComponent(
            Array.isArray(item.restItems) ? item.restItems[0] : item.restItems)}`} style={{ textDecoration: "none", color: "black" }}>
            <img className="menu-image" src={`http://localhost:1000/uploads/${item.image}`} alt="Biryani"/>
           <div className="menu-name">{Array.isArray(item.restItems) ? item.restItems[0] : item.restItems}</div>
           </Link>
          </div>
        ))
       }
      </div>
    </div>
    <div className="black">
        <img src="/App.avif" className='app' alt="" />
      </div> 
    </div>
  )
}

export default Homepage
