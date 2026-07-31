import mongoose from "mongoose";
import dotenv from "dotenv";
import Officer from "./models/Officer.js";

dotenv.config();

const officers = [
  {
    name: "Vaugh Willoughby",
    position: "President",
    location: "Northwest",
    commodities: "Nursery Crops, Landscaping",
    type: "Officer",
  },
  {
    name: "Renee McPherson",
    position: "Vice-President",
    location: "Southeast",
    commodities: "Field Crops, Beef Cattle, Hay, Vegetable Plants, Cut Flowers",
    type: "Officer",
  },
  {
    name: "Ricky Reid",
    position: "Secretary/Treasurer",
    location: "Northwest",
    commodities: "Field Crops, Beef Cattle, Hay",
    type: "Officer",
  },
  {
    name: "Allison Cooper",
    position: "Member",
    location: "Southeast",
    commodities: "Beef Cattle, Poultry, Pork, Goats, Season Produce, Hay",
    type: "Member",
  },
  {
    name: "Tim Covington",
    position: "Member",
    location: "East",
    commodities: "Goats, Landscaping",
    type: "Member",
  },
  {
    name: "Doug Gilliam",
    position: "Member",
    location: "N. Central",
    commodities: "Beef Cattle, Hay",
    type: "Member",
  },
  {
    name: "Willie Holliday",
    position: "Member",
    location: "South",
    commodities: "Field Crops, Beef Cattle, Hay",
    type: "Member",
  },
  {
    name: "Eric McPherson",
    position: "Member",
    location: "South",
    commodities: "Poultry, Beef Cattle, Hay",
    type: "Member",
  },
  {
    name: "Michael McPherson",
    position: "Member",
    location: "Southeast",
    commodities: "Field Crops, Beef Cattle, Hay, Vegetable Plants, Cut Flowers",
    type: "Member",
  },
  {
    name: "Kyle Norris",
    position: "Member",
    location: "Northwest",
    commodities: "Tobacco, Field Crops",
    type: "Member",
  },
  {
    name: "Rob Stas",
    position: "Member",
    location: "West & South",
    commodities: "Field Crops",
    type: "Member",
  },
  {
    name: "Randall Smith",
    position: "Member",
    location: "Southwest",
    commodities: "Poultry, Beef Cattle, Hay",
    type: "Member",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Officer.deleteMany({});

    await Officer.insertMany(officers);

    console.log("Officers seeded successfully");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
