const mongoose = require('mongoose');

const restaurantsSchema=new mongoose.Schema({
    restaurantId:{
        type:String,
        required:true
    },
    restname:String,
    rating:{
        type:Number,
        required:true
    },
    min:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    imageBase:String,
    itemname:String,
    amount:{
        type:Number,
        required:true
    },
})

const Restaurants=mongoose.model('Restaurants',restaurantsSchema);

const restaurantDetails=mongoose.Schema({
    restaurantId:{
        type:String,
        required:true
    },
    restname:{
        type:String,
        required:true
    },
    restItems:{
        type:Array,
        required:true
    },
    restPlace:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    lat:{
        type:Number,
        required:true
    },
    lng:{
        type:Number,
        required:true
    },
    restRating:{
        type:Number,
        required:true
    }
})

const RestDetails=mongoose.model('RestDetails',restaurantDetails);

const UserSechema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const User=mongoose.model("User",UserSechema);

const addressSchema = new mongoose.Schema({
    user: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    doorNo: {
      type: String,
      required: false,
    },
    landmark: {
      type: String,
      required: false,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  }, { timestamps: true });
  
const Address = mongoose.model("Address", addressSchema);

const CartModel=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
      },
        items: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurants", required: true },
                restname: { type: String ,required:true},
                rating: { type: Number, required: true},
                min: {type:Number,required:true},
                image: { type: String },
                itemname: { type: String, required: true },
                amount: { type: Number, required: true },
                restaurantId: { type: String, required: true },
              },
        ],
        createdAt: { type: Date, default: Date.now },
});

CartModel.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
  });

const Cart = mongoose.model("Cart", CartModel);

const OrderSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurants", required: true },
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now },
  });
  
const Order = mongoose.model("Order", OrderSchema);
  

module.exports = {Restaurants,RestDetails,Address,User,Cart,Order};

  

