import React from 'react';
import './Checkouts.css';
import { GoLocation } from "react-icons/go";
import { useDispatch, useSelector} from 'react-redux';
import { openAdd, openDel } from '../storeRedux/cartAction';

const Checkouts = () => {
  const dispatch=useDispatch();
  const MAX_LENGTH = 70;
  const useradd=useSelector((state)=>state.restaurant.addresses)

  const truncateAddress = (address) => {
    return address.length > MAX_LENGTH 
      ? `${address.substring(0, MAX_LENGTH)}...` 
      : address;
  };


  return (
    <div>
      {useradd.length >0 ? (
        useradd.map((addres,index)=>(
          <div key={index}>
          <div className="select">Select delivery address</div>
          <div className="you">You have a address saved in this location</div>
          <div className="other">
          <div className="loc"><GoLocation style={{width:"25px",height:"25px"}}/></div>
          <div className="address-box">
            <div className="other2">Other</div>
            <div className="user-address">{addres.doorNo},{truncateAddress(addres.address)}</div>
          </div>
          <div className="minutes">
            <div className="min">17 MINS</div>
            <button
           style={{width:"150px",height:"45px",backgroundColor:"green",
           marginTop:"1rem",borderRadius:"10px",
           color:"white",fontSize:"12px",fontWeight:"800",
           position:"absolute",left:"0",marginLeft:"0rem"}} onClick={()=>dispatch(openDel(true))}>DELIVERY HERE</button>
          </div>
      </div>
      <div className="add-new">
      <div className="loc"><GoLocation style={{width:"25px",height:"25px"}}/></div>
        <div className="address-box">
          <div className="other2" >Add New Address</div>
          <div className="user-address">DNE-12, 9CFQ+83H, Girkapalli, Karwan East, Hyderabad, Telangana 500264, India</div>
        </div>
        <div className="minutes">
          <button
           style={{width:"150px",height:"45px",backgroundColor:"white",
           marginTop:"1rem",borderRadius:"10px",
           color:"green",fontSize:"12px",fontWeight:"800",
           position:"absolute",left:"0",marginLeft:"0rem",
           border:"1px solid green"}}  onClick={()=>dispatch(openAdd(true))}>ADD NEW</button>
        </div>
      </div>
          </div>
        ))
      ):(
        <div className="add-new2">
        <div className="loc"><GoLocation style={{width:"25px",height:"25px"}}/></div>
          <div className="address-box">
            <div className="other2" >Add New Address</div>
            <div className="user-address">DNE-12, 9CFQ+83H, Girkapalli, Karwan East, Hyderabad, Telangana 500264, India</div>
          </div>
          <div className="minutes">
            <button
             style={{width:"150px",height:"45px",backgroundColor:"white",
             marginTop:"1rem",borderRadius:"10px",
             color:"green",fontSize:"12px",fontWeight:"800",
             position:"absolute",left:"0",marginLeft:"0rem",
             border:"1px solid green"}}  onClick={()=>dispatch(openAdd(true))}>ADD NEW</button>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default Checkouts
