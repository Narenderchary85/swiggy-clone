const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const {Image, Restaurants, RestDetails,Address,User, Cart} = require('./ItemModel.js'); 
const cors=require('cors');
const fs = require('fs');
const jwt = require("jsonwebtoken");

const app = express();
const port = 1000;
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post('/restaurants', upload.single('image'), async (req, res) => {
  try {
    const { restaurantId,restname, rating, min, itemname, amount } = req.body;

    if (!restname || !rating || !min || !itemname || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    const imagePath = req.file.path;
    const imageData = fs.readFileSync(imagePath);
    const encodedImage = imageData.toString('base64');
    const newRest = new Restaurants({
      restaurantId,
      restname,
      rating,
      min,
      image: req.file.filename,
      imageBase64: encodedImage,
      itemname,
      amount,
    });

    await newRest.save();

    return res.status(200).json({ message: "Restaurant details uploaded successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to upload restaurant details" });
  }
});

app.post('/restaurantpostdetails', upload.single('image'),async (req, res) => {
  try {
    const { restaurantId, restname, restItems, restPlace, lat, lng, restRating} = req.body;

    if (!restaurantId || !restname || !restItems || !restPlace) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRestDetails = new RestDetails({
      restaurantId,
      restname,
      restItems,
      restPlace,
      image:req.file.filename,
      lat,
      lng,
      restRating
    });

    await newRestDetails.save();
    return res.status(200).json({ message: "Successfully uploaded" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to upload place" });
  }
});


app.get('/restdetails', async (req, res) => {
  try {
    const restaurants = await Restaurants.find();
    res.status(200).json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

app.get('/restaurantgetdetails',async (req,res)=>{
  try{
    const restdetails=await RestDetails.find();
    res.status(200).json(restdetails);
  }catch(err){
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

const secretkey="test12";

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secretkey);

    if (!decoded.userId || typeof decoded.userId !== "string") {
      return res.status(400).json({ message: "Invalid user ID format in token" });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

module.exports = validateToken;

app.get("/addresses", validateToken,async (req, res) => {
  try {
    const userId=req.userId;
    const addresses = await Address.find();
    const userAddress=addresses.filter((address)=>address.user.toString()===userId)
    if(userAddress.length > 0){
      res.status(200).json(userAddress);
    }else{
      res.status(404).json({message:"Address not Found"})
    }
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getuser",validateToken,async (req,res)=>{
  try{
    const userId=req.userId;
    const existsuser=await User.find({_id:userId});
    res.status(200).json(existsuser);
  }catch(err){
    console.log(err)
  }
})


app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All values are required" });
  }

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = jwt.sign({ userId:newUser._id }, secretkey, { expiresIn: "3h" }); // Generate token with expiration
    return res.status(200).json({ message: "Signup successful", token });
  } catch (err) {
    console.error("Error during signup:", err);
    return res.status(500).json({ message: "Signup failed" });
  }
});

app.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All values are required" });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (existingUser.email !== email) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isPasswordCorrect = existingUser.password === password; // Password comparison logic
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId:existingUser._id }, secretkey, { expiresIn: "3h" }); // Generate token with expiration
    return res.status(200).json({ message: "Login successful", token ,user:existingUser._id});
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const validateUserId = (userId) => {
  return mongoose.Types.ObjectId.isValid(userId);
};


app.post("/save-address", validateToken, async (req, res) => {
  const { address, doorNo, landmark, latitude, longitude } = req.body;
  const userId = req.userId;
 
  if (!validateUserId(userId)) {
    return res.status(400).json({ message: "Invalid user ID format in token" });
  }

  if (!address || !latitude || !longitude || !doorNo) {
    console.log("Missing required fields:", { address, latitude, longitude });
    return res.status(400).json({ error: "Address, latitude, and longitude are required." });
  }

  try {
    const userObjectId =new mongoose.Types.ObjectId(userId);
    const newAddress = new Address({
      user: userObjectId,
      address,
      doorNo,
      landmark,
      latitude,
      longitude,
    });

    console.log("New Address Object:", newAddress);
    await newAddress.save();
    return res.status(201).json({ message: "Address saved successfully!" });
  } catch (error) {
    console.error("Error saving address:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/usercart',async(req,res)=>{
  const {userId,items}=req.body;
  console.log(userId)
  console.log(items)
  try{
    const existsuser= await Cart.findOne({userId});
    if(existsuser){
      existsuser.items=items;
      await existsuser.save()
    }else{
      await Cart.create({userId,items})
    }
    res.status(200).json({message: "Scuccessfully uploaded"})
  }catch(err){
    res.status(400).json({message: "Unscuccessfully uploaded"})
    console.log(err)
  }
});

app.get('/usercartget/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log("Received userId:", userId);
  try {
    const cart = await Cart.find({ userId });
    console.log("Cart Query Result:", cart);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'No cart found' });
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

app.post("/order", async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const newOrder = await OrderModel.create({
      userId,
      items: cart.items,
      totalAmount,
    });

    await CartModel.findOneAndDelete({ userId });

    res.status(200).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Error placing order" });
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


