import React, { useEffect, useState } from 'react';
import './Searchpage.css';
import Itemspage from './Itemspage';
import { SiSwiggy } from "react-icons/si";
import { IoIosSearch } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { LuBadgeHelp } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Searchpage = () => {
  const [search, setSearch] = useState("");
  const [restdata,setRestdata]=useState([]);
  const [viewType, setViewType] = useState("restaurants");
  const cart=useSelector((state)=>state.cart.cart);
  const rests=useSelector((state)=>state.restaurant.restaurant);
  const user=useSelector((state)=>state.restaurant.user)
  const uniqueitems=new Set();
  const [scroller,setScroller]=useState(0);  

  const handleChange = (e) => {
    setSearch(e.target.value); 
  };

  const handler=()=>{setSearch("")}

  const handleViewChange = (type) => {
    setViewType(type);
  };

  useEffect(()=>{
    axios.get('http://localhost:1000/restdetails')
    .then((response) => setRestdata(response.data))
    .catch((error) => console.error('Error fetching restaurant details:', error));
  },[])

  const filteredData=restdata.filter((item)=>(
    item.restname.toLowerCase().includes(search.toLowerCase()) ||
    item.itemname.toLowerCase().includes(search.toLowerCase())
  ))

  const filterUniqueItems=rests.filter((item)=>{
    const restItem = Array.isArray(item.restItems) ? item.restItems[0] : item.restItems;
    if(!uniqueitems.has(restItem)){
      uniqueitems.add(restItem);
      return true;
    }else{

      return false;
    }
  })

  return (
    <div>
      <nav className="nav-items">
        <div className="left-nav">
          <Link to="/" style={{textDecoration:"none"}}><SiSwiggy className="si" /></Link></div>
        <div className="right-nav">
          <div className="search"><IoIosSearch style={{ height: "30px", width: "30px" }} />Search</div>
          <div className="offer"><BiSolidOffer style={{ height: "30px", width: "30px" }} />Offers</div>
          <div className="help"><LuBadgeHelp style={{ height: "30px", width: "30px" }} />Help</div>
            {
              user ? user.map((use)=><div className="sigin"><IoPersonSharp style={{height:"70px", width:"70px"}}/>{use.username}</div>)
              :(<div className="sigin"><IoPersonSharp style={{height:"30px", width:"30px"}}/>Sigin</div>)
            }
          <Link to='/cart' style={{textDecoration:"none",color:"black"}}>
          <div className="cart"> <BsCart2 style={{ height: "30px", width: "30px" }}/>
          {cart && cart.length > 0 ? (
          <div>{cart.reduce((total,item)=>total+item.qty,0)}</div>) : (<div>0</div>)}
           Cart
           </div></Link>
        </div>
      </nav>
      <div className="text-bar">
        <div className="text-bar-2">
        <IoIosArrowBack
        onClick={handler}
         style={{ marginRight: "1rem", cursor: "pointer",width:"30px",height:"30px" }} />
          <input type="text" className="inp-bar" value={search} onChange={handleChange}  placeholder="Search for Dish and Restaurants"/>
          <div className="btn-close"><IoMdClose className='isoclose' style={{width:"30px",height:"30px"}}/></div>
        </div>
        <div className="btn-rest">
        <button className={viewType === "restaurants" ? "active" : ""}  onClick={() => handleViewChange("restaurants")}>Restaurants</button>
        <button className={viewType === "dishes" ? "active" : ""} onClick={() => handleViewChange("dishes")}>Dishes</button>
        </div>
      </div>

      <div className="bdy">
        {search.trim() === "" ? (
          <div className="popines">
            <div className="popu">Popular Cuisines</div>
                <div className="pop-items" id='scroller-items' onScroll={(e)=>setScroller(e.target.scrollLeft)} 
                  >
                 {
                  filterUniqueItems.map((item)=>(
                      <div key={item._id}>
                     <Link  to={`/restaurants/${encodeURIComponent(
                      Array.isArray(item.restItems) ? item.restItems[0] : item.restItems)}`} style={{ textDecoration: "none", color: "black" }}>
                      <img className="menu-image" src={`http://localhost:1000/uploads/${item.image}`} alt="Biryani"
                      style={{height:"150px",width:"150px"}} 
                      />
                     <div className="menu-name">{Array.isArray(item.restItems) ? item.restItems[0] : item.restItems}</div>
                     </Link>
                    </div>
                  ))
                 }
                </div>
          </div>
        ) : (
          <div className="search-bar">
            <Itemspage filteredData={filteredData}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchpage;
