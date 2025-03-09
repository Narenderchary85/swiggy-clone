import React, { useState } from "react";
import "./GeoLoc.css";
import axios from "axios";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { closeAdd } from "../storeRedux/cartAction";

const GeoLoc = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");
  const [doorNo, setDoorNo] = useState("");
  const [landmark, setLandmark] = useState("");
  const dispatch = useDispatch();
  const MAX_LENGTH = 70;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCLVkr_OXWVy0s5CXYd2JEnFA8tGSdVvUA", 
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const truncateAddress = (address) => {
    return address.length > MAX_LENGTH 
      ? `${address.substring(0, MAX_LENGTH)}...` 
      : address;
  };


  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);
          reverseGeocode(lat, lon);
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const reverseGeocode = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    try {
      const response = await axios.get(url);
      if (response.data && response.data.display_name) {
        const addr = response.data.display_name;
        console.log("Address: ", addr);
        setAddress(addr); 
      } else {
        console.error("No results found for the given coordinates.");
      }
    } catch (error) {
      console.error("Error fetching address: ", error);
    }
  };

  const saveAddress = async () => {
    console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token"); 
    if (!token) {
      alert("You must be logged in to save an address.");
      return;
    }

    console.log("Token retrieved from localStorage:", token);
    
    const addressData = {
      address,
      doorNo,
      landmark,
      latitude,
      longitude
    };
    console.log("Address Data:", addressData);

    try {
      const response = await axios.post(
        "http://localhost:1000/save-address",
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Address saved:", response.data);
      alert("Address saved successfully!");
    } catch (err) {
      console.error("Error saving address:", err);
      alert("Failed to save address. Please try again.");
    }
  };

  const onClickHandler = () => {
    saveAddress();
  };

  return (
    <>
      <div className="geo-main">
        <div className="google-block">
          <GoogleMap
            center={{ lat: latitude || 0, lng: longitude || 0 }}
            zoom={14}
            mapContainerStyle={{ width: "100%", height: "400px" }}
          >
            {latitude && longitude && <Marker position={{ lat: latitude, lng: longitude }} />}
          </GoogleMap>
        </div>
        {address && (
          <div className="geo-block">
            <div className="geo-adres">Address</div>
            <div className="geo-add">{truncateAddress(address)}</div>
          </div>
        )}
        <div className="overall-add" onClick={()=>getLocation()}>
          <div className="door-add">
            <input
              type="text"
              className="door-inp"
              placeholder="Door no."
              style={{ textDecoration: "none" }}
              value={doorNo}
              onChange={(e) => setDoorNo(e.target.value)}
            />
          </div>
          <div className="door-add">
            <input
              type="text"
              className="door-inp"
              placeholder="LandMark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
        </div>
        <div className="select-place">
          <div className="home-place" onClick={() => onClickHandler()}>Home</div>
          <div className="work-place">Work</div>
          <div className="other-place" onClick={()=>dispatch(closeAdd(false))}>Other</div>
          <div>
          <button className="locbtn" onClick={() => onClickHandler()}>
          SAVE ADDRESS & PROCEED
        </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeoLoc;
