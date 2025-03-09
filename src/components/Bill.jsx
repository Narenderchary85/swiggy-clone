import React from 'react';
import './Bill.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeAddQty, changeRemoveQty } from '../storeRedux/cartAction';

const Bill = () => {
  const cart = useSelector((state) => state.cart.cart);
  const rests = useSelector((state) => state.restaurant.restaurant);
  const dispatch = useDispatch();

  const filterRestName = rests.filter((rest) =>
    cart.some((item) => rest.restaurantId === item.restaurantId)
  );

  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = [];
    }
    acc[item.restaurantId].push(item);
    return acc;
  }, {});

  return (
    <div className="rest-bill">
      {filterRestName.map((rest, index) => (
        <div key={index}>
          <div className="rest-bill-top">
            <img
              className="img-bill"
              src={`http://localhost:1000/uploads/${rest.image}`}
              alt=""
            />
            <div className="rest-bill-name">{rest.restname}</div>
            <div className="rest-bill-add">Hyderabad</div>
            <hr
              className="hr1"
              style={{
                width: '55px',
                height: '1px',
                backgroundColor: 'black',
                border: '1px solid black',
                borderRadius: '1px',
              }}
            />
          </div>
        </div>
      ))}

      {Object.entries(groupedCart).map(([restaurantId, items]) => (
        <div key={restaurantId} >
        <div className="rest-overbill">
          {items.map((item, index) => (
            <div key={index} className="cart-count">
              <div className="cart-item-name">{item.itemname}</div>
              <div className="count-box">
                <div  className="minus"  onClick={() => dispatch(changeRemoveQty(item))}> -</div>
                <div className="num">{item.qty}</div>
                <div  className="plus"  onClick={() => dispatch(changeAddQty(item))}> +</div>
              </div>
              <div className="cart-price">₹{item.amount * item.qty}</div>
            </div>
          ))}
          <div className="suggestion-box">
            <div className="anysug">Any suggestion? we will pass it on</div>
            <div className="sub-box">
              <input type="checkbox" className="check" />
              Opt in for No-contact Delivery<br />
              Our delivery partner will call to confirm. Please ensure that your
              address has all the required details.
            </div>
          </div>
          <div className="bill-box">
            <div className="bill-details">Bill Details</div>
            <div className="bill-box-price"> ₹
              {items.reduce((acc, item) => acc + item.amount * item.qty, 0)}
            </div>
            <div className="item-total">Item Total</div>
            <div className="delivery-km">Delivery | 2.8km</div>
            <div className="delivery-price">
              ₹
              {Math.round(
                (30 + 5 * 3 + 10 - items[0].amount * 0.1 + 10) * 100
              ) / 100}
            </div>
            <hr
              style={{
                color: 'rgba(0, 0, 0, 0.16)',
                width: '100%',
                marginTop: '2rem',
              }}/>
          </div>
          <div className="delivery-box">
            <div className="delivery-tip">Delivery Tip</div>
            <div className="plat">Platform fee</div>
            <div className="gst">GST and Restaurant charges</div>
            <div className="add-tip">Add tip</div>
            <div className="plat-fee">6</div>
            <div className="gst-price">
              ₹
              {Math.floor(
                (items.reduce((acc, item) => acc + item.amount * item.qty, 0) *
                  18) /
                  (100 + 18) *
                  100
              ) / 100}
            </div>
          </div>

          </div>
          <hr style={{backgroundColor: 'black',border: '1px solid black',width: '90%',marginTop: '0rem',marginLeft: '2rem',}}/>
          <div className="topay">TO PAY</div>
          <div className="to-pay-price">
            ₹
            {Math.floor(
              items.reduce(
                (acc, item) => acc + item.amount * item.qty,
                0
              ) +
                (30 + 5 * 3 + 10 - items[0].amount * 0.1 + 10) +
                (items.reduce(
                  (acc, item) => acc + item.amount * item.qty,
                  0
                ) *
                  18) /
                  (100 + 18) +
                6
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bill;
