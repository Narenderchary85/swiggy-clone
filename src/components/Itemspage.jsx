import React, { useState } from 'react';
import './Itemspage.css';
import { GiAlliedStar } from "react-icons/gi";
import { IoArrowForwardOutline, IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector} from "react-redux";
import { addToCart, savecart} from '../storeRedux/cartAction';

const Itemspage = ({filteredData}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch=useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const openPopup = (restaurant) => {
    setSelectedItem(restaurant);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setSelectedItem(null);
    setPopupVisible(false);
  };

  const handlerAddtoCart=(item)=>{
    dispatch(addToCart(item))
    const updatedcart=[...cart,item]
    dispatch(savecart(updatedcart))
  }
  
  return (
    <div className="main-items">
      {filteredData.map((restaurant) => (
        <div key={restaurant._id} className="item-box">
          <div className="img-name">{restaurant.restname}</div>
          <div className="rating">
            <GiAlliedStar style={{ color: "green", height: "15px", width: "15px", margin: "0.2rem" }} />
            {restaurant.rating} stars . {restaurant.min}-{restaurant.min + 5} mins
          </div>
          <div className="for">
            <IoArrowForwardOutline style={{ height: "25px", width: "25px", color: "rgba(0, 0, 0, 0.473)" }} />
          </div>
          <hr style={{ color: "black", margin: "10px" }} />
          <div className="img-block">
            <img
              className="img-item"
              src={`http://localhost:1000/uploads/${restaurant.image}`}
              alt={restaurant.itemname || "Item"}
            />
            <div className="item-add" 
            onClick={()=>dispatch(addToCart(restaurant))}>ADD
              </div>
          </div>
          <div className="item-name">{restaurant.itemname}</div>
          <div className="rs">₹{restaurant.amount}</div>
          <div className="more" onClick={() => openPopup(restaurant)}>More details</div>
        </div>
      ))}

      {isPopupVisible && selectedItem && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={closePopup}>
              <IoCloseCircle style={{ fontSize: "30px", color: "white" }} />
            </span>
            <img
              className="popup-image"
              src={`http://localhost:1000/uploads/${selectedItem.image}`}
              alt={selectedItem.itemname}
            />
            <div className="popup-title">{selectedItem.itemname}</div>
            <div className="popup-price">
              ₹{selectedItem.amount}
            </div>
            <div className="popup-description">
              {selectedItem.description || "No description available."}
            </div>
            <div className='btn-div'>
            <button className="popup-add-btn"  onClick={()=>handlerAddtoCart(selectedItem)}>ADD</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Itemspage;

