import React from 'react';
import './Profile.css';
import { SiSwiggy } from "react-icons/si";
import { IoIosSearch } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { LuBadgeHelp } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { VscSymbolEvent } from "react-icons/vsc";
import { FaHeart } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { GoLocation } from "react-icons/go";
import { useState } from 'react';

const Profile = () => {
    const user=useSelector((state)=>state.restaurant.user);
    const usercart=useSelector((state)=>state.restaurant.usercart);
    const items=usercart[0]?.items
    const [isActive, setIsActive] = useState(false);
    const [isBlock,setBlock]=useState(0);
    const MAX_LENGTH = 70;
    const useradd=useSelector((state)=>state.restaurant.addresses);
    const truncateAddress = (address) => {
      return address.length > MAX_LENGTH 
        ? `${address.substring(0, MAX_LENGTH)}...` 
        : address;
    };

    const handleClick = () => {
      setIsActive(!isActive);
    };
  
  return (
    <div>
        <nav className='nav-items'>
        <div className="left-nav">
        <Link to='/'><SiSwiggy className='si'/></Link>
        </div>
        <div className="right-nav">
        <Link to='/search'  style={{ textDecoration: "none", color: "black" }}><div className="search"><IoIosSearch style={{height:"30px", width:"30px"}}/>Search</div></Link>
        <div className="offer"><BiSolidOffer style={{height:"30px", width:"30px"}}/>Offers</div>
        <div className="help"><LuBadgeHelp style={{height:"30px", width:"30px"}}/>Help</div>
        {
          user ? user.map((use)=><div className="sigin"><IoPersonSharp style={{height:"70px", width:"70px"}}/>{use.username}</div>)
          :(<div className="sigin"><IoPersonSharp style={{height:"30px", width:"30px"}}/>Sigin</div>)
        }
        <div className="cart"><BsCart2 style={{height:"30px", width:"30px"}}/>Cart</div>
        </div>
      </nav>
      <div className="pro-header">
       <div className="pro-details">
       {user ? user.map((use)=><><div className="pro-name">{use.username}</div>
       <div className="pro-mail">{use.email}</div>
       </>):(<div>SignIn</div>)}
       <div className="pro-edit">EDIT PROFILE</div>
       </div>
       <div className="pro-list">
        <div className="pro-options">
            <div className={`orders-block ${isActive ? "active" : ""}`}
               onClick={()=>handleClick}><BiSolidShoppingBagAlt
             style={{height:"30px",width:"30px",position:"absolute",left:"0",marginLeft:"2rem"}}/>
            <div className="orders" onClick={()=>setBlock(1)}>Orders</div>
            </div>
            <div className="swiggy-one-block"><VscSymbolEvent
            style={{height:"30px",width:"30px",position:"absolute",left:"0",marginLeft:"2rem"}}/>
              <div className="swiggy-one" onClick={()=>setBlock(2)}>Swiggy One</div>
            </div>
            <div className="favourites-block"><FaHeart 
             style={{height:"30px",width:"30px",position:"absolute",left:"0",marginLeft:"2rem"}}/>
              <div className="favourites" onClick={()=>setBlock(3)}>Favourites</div>
            </div>
            <div className="payments-pro-block"><MdOutlinePayment 
            style={{height:"30px",width:"30px",position:"absolute",left:"0",marginLeft:"2rem"}}/>
              <div className="payments-pro" onClick={()=>setBlock(4)}>Payments</div>
            </div>
            <div className="address-pro-block"><IoLocationSharp 
            style={{height:"30px",width:"30px",position:"absolute",left:"0",marginLeft:"2rem"}}/>
              <div className="address-pro" onClick={()=>setBlock(5)}>Addresses</div>
            </div>
            <div className="settings-block"><IoIosSettings 
            style={{height:"30px",width:"30px",position:"absolute",left:"0",marginLeft:"2rem"}}/>
              <div className="settings" onClick={()=>setBlock(6)}>Settings</div>
            </div>
        </div>
        {isBlock === 1 ? (<div className="orders-list">
          <div className="your-orders">Your Orders</div>
          <div className="ucart-items">
          {
            items.map((cart)=>(
              <div className="ucart-item">
                <img src={`http://localhost:1000/uploads/${cart.image}`} alt="" className='ucart-image'/>
                <div className="ucart-restname">{cart.restname}</div>
                <div className="ucart-itemname">{cart.itemname}</div>
                <div className="ucart-price">₹{cart.amount}</div>
                <div className="ucart-rating">rating:{cart.rating}</div>
              </div>
            ))
          }
          </div>
        </div>):(<></>)}
        {isBlock === 2 ? (<div className="orders-list">
          <div className="your-orders">Swigggy One</div>
        </div>):(<></>)}
        {isBlock === 3 ? (<div className="orders-list">
          <div className="your-orders">Your Favourites</div>
        </div>):(<></>)}
        {isBlock === 4 ? (<div className="orders-list">
          <div className="your-orders">Payments</div>
        </div>):(<></>)}
        {isBlock === 5 ? (
          useradd.map((addres)=>(
            <div className="orders-list">
            <div className="your-orders">Manage Addresses</div>
            <div className="your-address"><GoLocation style={{width:"25px",height:"25px",marginRight:"1rem"}}/>
            {addres.doorNo},{truncateAddress(addres.address)}
            <div className="add-pro">
            <div className="add-edit">EDIT</div>
            <div className="add-delete">DELETE</div>
            </div>
            </div>
            </div>
          ))
        ):(<></>)}
        {isBlock === 6 ? (<div className="orders-list">
          <div className="your-orders">Settings</div>
        </div>):(<></>)}
       </div>
      </div>
    </div>
  )
}

export default Profile
