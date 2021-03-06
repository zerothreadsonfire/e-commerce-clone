import mongoose from "mongoose";
import dotenv from 'dotenv';
import products from "../data/products.js";
import users from "../data/users.js";
import User from "../models/userModel.js";
import Product from "../models/ProductModel.js";
import Order from "../models/orderModel.js";
import connectDB from "./db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try{
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    
    const adminUserId = createdUsers[0]._id;
    const sampleProducts = products.map(product => {
      return {
        ...product,
        user: adminUserId
      }
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch(e) {
    console.error(`Error: ${e}`);
    process.exit(1);
  }
}

const destroyData = async () => {
  try{
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch(e) {
    console.error(`Error: ${e}`);
    process.exit(1);
  }
}

if(process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
