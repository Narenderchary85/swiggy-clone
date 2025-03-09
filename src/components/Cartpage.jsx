import React from 'react';
import './Cartpage.css';
import { SiSwiggy } from "react-icons/si";
import { IoIosSearch } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { LuBadgeHelp } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { Link } from 'react-router';
import Bill from './Bill';
import Checkouts from './Checkouts';
import { useDispatch, useSelector } from 'react-redux';
import { closeAdd, closeDel } from '../storeRedux/cartAction';
import { IoMdClose } from "react-icons/io";
import GeoLoc from './GeoLoc';

const Cartpage = () => {
  const open=useSelector((state)=>state.cart.open);
  const opend=useSelector((state)=>state.cart.opendel);
  const MAX_LENGTH = 70;
  const dispatch=useDispatch();
  const useradd=useSelector((state)=>state.restaurant.addresses);
  const user=useSelector((state)=>state.restaurant.user)
  
    const truncateAddress = (address) => {
      return address.length > MAX_LENGTH 
        ? `${address.substring(0, MAX_LENGTH)}...` 
        : address;
    };

  return (
    <div className='cart-container'>
      <nav className="nav-items">
        <div className="left-nav">
          <Link to="/" style={{ textDecoration: "none" }}><SiSwiggy className="si" /></Link>
        </div>
        <div className="right-nav">
          <div className="search"><IoIosSearch style={{ height: "30px", width: "30px" }} />Search</div>
          <div className="offer"><BiSolidOffer style={{ height: "30px", width: "30px" }} />Offers</div>
          <div className="help"><LuBadgeHelp style={{ height: "30px", width: "30px" }} />Help</div>
         {
          user ? user.map((use)=><div className="sigin"><IoPersonSharp style={{height:"70px", width:"70px"}}/>{use.username}</div>)
          :(<div className="sigin"><IoPersonSharp style={{height:"30px", width:"30px"}}/>Sigin</div>)
           }
          <Link to='/cart' style={{ textDecoration: "none", color: "black" }}>
            <div className="cart">
              <BsCart2 style={{ height: "30px", width: "30px" }} />
              Cart 
            </div>
          </Link>
        </div>
      </nav>
      <div className="cart-content">
          {opend ? (
           useradd.map((addres)=>(
            <div className="delivery-process">
            <div className="del-top">Delivery address</div>
            <div className="change" onClick={()=>dispatch(closeDel(false))}>CHANGE</div>
            <div className="deli-add">
              <div className="del-other">Other</div>
              <div className="deliv-add">{addres.doorNo},{truncateAddress(addres.address)}</div>
              <div className="deliv-time">48 min</div>
            </div>
            <div className="payment2-main">
            <div className="pay2">Choose payment method</div>
            <div className="proceed-pay">PROCEED TO PAY</div>
            </div>
          </div>
           ))
          ):(
            <div className="checkout-main">
            <Checkouts />
            <div className="payment1-main">
            <div className="pay">Payment</div>
            </div>
            </div>      
          )}
          <div className="bill-main">
            <Bill />
          </div>
        </div>
      {open ? <div className="geolocation">
        <div className="cont">
          <div className="wrong" onClick={() => { console.log('Close button clicked');  dispatch(closeAdd(false));}}>
            <IoMdClose style={{width:"25px",height:"25px"}}/></div>
        </div>
         <GeoLoc/> 
      </div> : <></>}
    </div>
  )
}

export default Cartpage;
