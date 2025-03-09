import React from 'react';
import './Restpage.css'
import { SiSwiggy } from "react-icons/si";
import { IoIosSearch } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { LuBadgeHelp } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { GiAlliedStar } from "react-icons/gi";
import { Link, useParams } from 'react-router';
import { useSelector } from 'react-redux';

const Restpage = () => {
  const rests=useSelector((state)=>state.restaurant.restaurant);
  const {restID}=useParams();
  const user=useSelector((state)=>state.restaurant.user)

  const filteredRestaurants = rests.filter((item) =>
    Array.isArray(item.restItems)
      ? item.restItems.includes(decodeURIComponent(restID))
      : item.restItems === decodeURIComponent(restID)
  );

  return (
    <div className='main'>
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
      <div className="items">
        <div className="name">{restID}</div>
        <div className="desc">Satisfy your cravings with these fresh and flavoursome burgers.</div>
        <div className="rest">Restaurants to explore</div>
        <div className="resturants">
        {filteredRestaurants.map((restaurant) => (
            <div key={restaurant._id} className="item">
              <>
              <Link to={`/restaurants/${restaurant.restItems}/restaurantport/${encodeURIComponent(
                Array.isArray(restaurant.restaurantId) ? restaurant.restaurantId[0] : restaurant.restaurantId
              )}`} style={{textDecoration:"none",color:"black"}}>
              <div className="image-container">
                  <img className="item-img" src={`http://localhost:1000/uploads/${restaurant.image}`} alt={restaurant.restname}/>
                  <div className="overlay-box"><div className="overlay-text">60% OFF UPTO ₹120</div></div>
              </div>
              <div className="img-name">{restaurant.restname}</div>
              <div className="rating">
                <GiAlliedStar style={{ color: 'green', height: '25px', width: '25px', margin: '0.2rem' }} />4.1 - 41-45
                min
              </div>
              <div className="rest-item">{restaurant.restItems}</div>
              <div className="rest-place">{restaurant.restPlace}</div>
              </Link>
              </>
            </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Restpage;
