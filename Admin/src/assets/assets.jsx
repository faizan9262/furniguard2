import logo from './logo.png'
import banner from './banner.jpg'
import tenyears from './10years.png'
import upload from './upload_area.png'

import h1 from './h1.png'
import h2 from './h2.png'
import h3 from './h3.png'
import h4 from './h4.png'
import h5 from './h5.jpg'

import i1 from './i1.png'
import i2 from './i2.png'
import i3 from './i3.png'
import i4 from './i4.png'

import bed1 from './bed1.jpg'
import bed2 from './bed2.jpg'
import bed3 from './bed3.jpg'
import bed4 from './bed4.jpg'

import ceiling_light from './celinglight.png'
import smartlock from './smartlock.jpg'
import soundproof from './soundproof.jpg'
import airpurifier from './airpurifier.png'

import stair1 from './stair1.jpeg'
import stair2 from './stair2.jpeg'
import stair3 from './stair3.jpeg'
import stair4 from './stair4.jpeg'
import stair5 from './stair5.jpeg'
import stair6 from './stair6.jpeg'
import stair7 from './stair7.jpeg'
import stair8 from './stair8.jpeg'
import stair9 from './stair9.jpg'
import stair10 from './stair10.jpg'
import stair11 from './stair11.jpg'
import stair12 from './stair12.jpeg'

import sofa1 from './sofa1.png'
import sofa2 from './sofa2.jpg'
import sofa3 from './sofa3.jpg'
import sofa4 from './sofa4.jpg'
import sofa5 from './sofa5.png'
import sofa6 from './sofa6.jpg'
import sofa7 from './sofa7.jpg'
import sofa8 from './sofa8.jpg'
import sofa9 from './sofa9.jpg'
import sofa10 from './sofa10.jpg'

import light1 from './light1.jpeg'
import light2 from './light2.jpg'
import light3 from './light3.jpeg'
import light4 from './light4.jpeg'
import light5 from './light5.jpeg'
import light6 from './light6.jpeg'
import light7 from './light7.jpeg'
import light8 from './light8.jpeg'
import light9 from './light9.jpeg'
import light10 from './light10.jpeg'
import light11 from './light2.jpeg'
import light12 from './light4.jpg'
import light13 from './light3.jpg'

import textile1 from './textile1.jpeg'
import textile2 from './textile2.jpeg'
import textile3 from './textile3.jpeg'
import textile4 from './textile4.jpeg'
import textile5 from './textile5.jpeg'
import textile6 from './textile6.jpeg'
import textile7 from './textile7.jpeg'
import textile8 from './textile8.jpeg'
import textile9 from './textile9.jpeg'
import textile10 from './textile10.jpeg'

import kitchen1 from './kitchen1.jpeg'
import kitchen2 from './kitchen2.jpeg'
import kitchen3 from './kitchen3.jpeg'
import kitchen4 from './kitchen4.jpeg'
import kitchen5 from './kitchen5.jpeg'
import kitchen6 from './kitchen6.jpeg'
import kitchen7 from './kitchen7.jpeg'
import kitchen8 from './kitchen8.jpeg'
import kitchen9 from './kitchen9.jpeg'
import kitchen10 from './kitchen10.jpeg'

import floor1 from './floor1.jpeg'
import floor2 from './floor2.jpeg'
import floor3 from './floor3.jpeg'
import floor4 from './floor4.jpeg'
import floor5 from './floor5.jpeg'
import floor6 from './floor6.jpeg'
import floor7 from './floor7.jpeg'
import floor8 from './floor8.jpeg'
import floor9 from './floor9.jpeg'
import floor10 from './floor10.jpeg'

import bath1 from './bath1.jpeg'
import bath2 from './bath2.jpeg'
import bath3 from './bath3.jpeg'
import bath4 from './bath4.jpeg'
import bath5 from './bath5.jpeg'
import bath6 from './bath6.jpeg'
import bath7 from './bath7.jpeg'
import bath8 from './bath8.jpeg'
import bath9 from './bath9.jpeg'
import bath10 from './bath10.jpeg'

import wall1 from './wall1.jpeg'
import wall2 from './wall2.jpeg'
import wall3 from './wall3.jpeg'
import wall4 from './wall4.jpeg'
import wall5 from './wall5.jpeg'
import wall6 from './wall6.jpeg'
import wall7 from './wall7.jpeg'
import wall8 from './wall8.jpeg'
import wall9 from './wall9.jpeg'
import wall10 from './wall10.jpeg'

import layout1 from './layout1.jpeg'
import layout2 from './layout2.jpeg'
import layout3 from './layout3.jpeg'
import layout4 from './layout4.jpeg'
import layout5 from './layout5.jpeg'
import layout6 from './layout6.jpeg'
import layout7 from './layout7.jpeg'
import layout8 from './layout8.jpeg'
import layout9 from './layout9.jpeg'
import layout10 from './layout10.jpeg'

import designer1 from './designer1.png'
import designer2 from './designer2.png'
import designer3 from './designer3.png'
import designer4 from './designer4.png'

export const assets ={
    logo,
    banner,
    h1,
    h2,
    h3,
    h4,
    h5,
    i1,
    i2,
    i3,
    i4,
    bed1,
    bed2,
    bed3,
    bed4,
    ceiling_light,
    smartlock,
    soundproof,
    airpurifier,
    stair1,
    stair2,
    stair3,
    stair4,
    stair5,
    stair6,
    stair7,
    stair8,
    stair9,
    stair10,
    stair11,
    stair12,
    tenyears,
    upload,
}

function generateRandomId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export const rooms =[
  { id: generateRandomId(), name: "Serenity Luxe Sofa", img_src: h1 },
  { id: generateRandomId(), name: "Velvet Haven Couch", img_src: h2 },
  { id: generateRandomId(), name: "CozyNest Sectiona", img_src: h3 },
  { id: generateRandomId(), name: "Urban Retreat Loveseat", img_src: h4 },
  { id: generateRandomId(), name: "Chateau Royale Sofa Couch ", img_src: h2 },
  { id: generateRandomId(), name: "Midnight Dreamer Sofa", img_src: h1 },
  { id: generateRandomId(), name: "The Cloud Lounge", img_src: h4 },
  { id: generateRandomId(), name: "Harmony Corner ", img_src: h3 },
  { id: generateRandomId(), name: "Rustic Charm Sofa", img_src: h1 },
  { id: generateRandomId(), name: "Opulence Recliner Sofa", img_src: h3 }
]

export const stairs = [
  {id: generateRandomId(), name:"Stone Steps of Eternity" , img_src:stair1},
  {id: generateRandomId(), name:"Winding Spiral Ascent" , img_src:stair2},
  {id: generateRandomId(), name:"Granite Pathway" , img_src:stair3},
  {id: generateRandomId(), name:"Marble Majesty" , img_src:stair4},
  {id: generateRandomId(), name:"Golden Ridge Staircase" , img_src:stair5},
  {id: generateRandomId(), name:"Timber Treads" , img_src:stair6},
  {id: generateRandomId(), name:"Steel Spiral" , img_src:stair7},
  {id: generateRandomId(), name:"Ivory Ascension" , img_src:stair8},
  {id: generateRandomId(), name:"Crystal Steps" , img_src:stair9},
  {id: generateRandomId(), name:"Cobblestone Climb" , img_src:stair10},
  {id: generateRandomId(), name:"Ironclad Steps" , img_src:stair11},
  {id: generateRandomId(), name:"Emerald Cascade Stairs" , img_src:stair12},
]


export const furniture = [
  { id: generateRandomId(), name: "Serenity Luxe Sofa", img_src: sofa1 },
  { id: generateRandomId(), name: "Velvet Haven Couch", img_src: sofa2 },
  { id: generateRandomId(), name: "CozyNest Sectiona", img_src: sofa3 },
  { id: generateRandomId(), name: "Urban Retreat Loveseat", img_src: sofa4 },
  { id: generateRandomId(), name: "Chateau Royale Sofa", img_src: sofa5 },
  { id: generateRandomId(), name: "Midnight Dreamer Sofa", img_src: sofa6 },
  { id: generateRandomId(), name: "The Cloud Lounge", img_src: sofa7 },
  { id: generateRandomId(), name: "Harmony Corner Sofa", img_src: sofa8 },
  { id: generateRandomId(), name: "Rustic Charm Sofa", img_src: sofa9 },
  { id: generateRandomId(), name: "Opulence Recliner Sofa", img_src: sofa10 }
];


export const lighting = [
  { id: generateRandomId(), name: "Elysium Pendant", img_src: light1 },
  { id: generateRandomId(), name: "Luna Chandelier", img_src: light2 },
  { id: generateRandomId(), name: "Solstice Table Lamp", img_src: light3 },
  { id: generateRandomId(), name: "Nimbus Floor Lamp", img_src: light4 },
  { id: generateRandomId(), name: "Aurora Wall Sconce", img_src: light5 },
  { id: generateRandomId(), name: "Zenith Track Light", img_src: light6 },
  { id: generateRandomId(), name: "Harmony Lantern", img_src: light7 },
  { id: generateRandomId(), name: "Serenity Flush Mount", img_src: light8 },
  { id: generateRandomId(), name: "Cascade LED Strip", img_src: light9 },
  { id: generateRandomId(), name: "Radiance Arc Lamp", img_src: light10 },
  { id: generateRandomId(), name: "Echo Recessed Light", img_src: light11 },
  { id: generateRandomId(), name: "Vista Candle Holder", img_src: light12 },
  { id: generateRandomId(), name: "Twilight Hanging Light", img_src: light13 },
];

export const textile = [
  { id: generateRandomId(), name: 'Linen Luxe', img_src: textile1 },
  { id: generateRandomId(), name: 'Velvet Elegance', img_src: textile2 },
  { id: generateRandomId(), name: 'Brocade Beauty', img_src: textile3 },
  { id: generateRandomId(), name: 'Cotton Canvas', img_src: textile4 },
  { id: generateRandomId(), name: 'Chenille Charm', img_src: textile5 },
  { id: generateRandomId(), name: 'Taffeta Touch', img_src: textile6 },
  { id: generateRandomId(), name: 'Jute Natural', img_src: textile7 },
  { id: generateRandomId(), name: 'Satin Sheen', img_src: textile8 },
  { id: generateRandomId(), name: 'Microfiber Magic', img_src: textile9 },
  { id: generateRandomId(), name: 'Wool Warmth', img_src: textile10 }
];

// You can apply the same function to other arrays like kitchen, floor, bathroom, and wall
export const kitchen =[
  {id: generateRandomId(),name:"Farmhouse Kitchen",img_src:kitchen1},
  {id: generateRandomId(),name:"Farmhouse Kitchen",img_src:kitchen2},
  {id: generateRandomId(),name:"Industrial Chic Kitchen",img_src:kitchen3},
  {id: generateRandomId(),name:"Coastal Retreat Kitchen",img_src:kitchen4},
  {id: generateRandomId(),name:"Rustic Charm Kitchen",img_src:kitchen5},
  {id: generateRandomId(),name:"Gourmet Chef’s Kitchen",img_src:kitchen6},
  {id: generateRandomId(),name:"Scandinavian Style Kitchen",img_src:kitchen7},
  {id: generateRandomId(),name:"Open Concept Kitchen",img_src:kitchen8},
  {id: generateRandomId(),name:"Classic Traditional Kitchen",img_src:kitchen9},
  {id: generateRandomId(),name:"Contemporary Urban Kitchen",img_src:kitchen10},
]



export const floor =[
  {id: generateRandomId(),name:"Hardwood Flooring" , img_src:floor1},
  {id: generateRandomId(),name:"Laminate Flooring" , img_src:floor2},
  {id: generateRandomId(),name:"Vinyl Flooring" , img_src:floor3},
  {id: generateRandomId(),name:"Ceramic Tile Flooring" , img_src:floor4},
  {id: generateRandomId(),name:"Porcelain Tile Flooring" , img_src:floor5},
  {id: generateRandomId(),name:"Carpet Flooring" , img_src:floor6},
  {id: generateRandomId(),name:"Bamboo Flooring" , img_src:floor7},
  {id: generateRandomId(),name:"Cork Flooring" , img_src:floor8},
  {id: generateRandomId(),name:"Natural Stone Flooring" , img_src:floor9},
  {id: generateRandomId(),name:"Engineered Wood Flooring" , img_src:floor10},
]

export const bathroom = [
  {id: generateRandomId(),name:"Spa Retreat Bathroom", img_src:bath1},
  {id: generateRandomId(),name:"Modern Luxe Bathroom", img_src:bath2},
  {id: generateRandomId(),name:"Vintage Charm Bathroom", img_src:bath3},
  {id: generateRandomId(),name:"Coastal Breeze Bathroom", img_src:bath4},
  {id: generateRandomId(),name:"Rustic Elegance Bathroom", img_src:bath5},
  {id: generateRandomId(),name:"Minimalist Serenity Bathroom", img_src:bath6},
  {id: generateRandomId(),name:"Bold and Bright Bathroom", img_src:bath7},
  {id: generateRandomId(),name:"Industrial Style Bathroom", img_src:bath8},
  {id: generateRandomId(),name:"Zen Sanctuary Bathroom", img_src:bath9},
  {id: generateRandomId(),name:"Classic Elegance Bathroom", img_src:bath10},
]

export const wall = [
  {id: generateRandomId(),name:"Floral Pattern Wallpaper",img_src:wall1},
  {id: generateRandomId(),name:"Geometric Print Wallpaper",img_src:wall2},
  {id: generateRandomId(),name:"Geometric Print Wallpaper",img_src:wall3},
  {id: generateRandomId(),name:"Damask Design Wallpaper",img_src:wall4},
  {id: generateRandomId(),name:"Stripes and Lines Wallpaper",img_src:wall5},
  {id: generateRandomId(),name:"Abstract Art Wallpaper",img_src:wall6},
  {id: generateRandomId(),name:"Tropical Paradise Wallpaper",img_src:wall7},
  {id: generateRandomId(),name:"Vintage Retro Wallpaper",img_src:wall8},
  {id: generateRandomId(),name:"Metallic Foil Wallpaper",img_src:wall9},
  {id: generateRandomId(),name:"Metallic Foil Wallpaper",img_src:wall10},
]

export const layout =[
  {id: generateRandomId(),name:"Open Concept Layout", img_src:layout1},
  {id: generateRandomId(),name:"L-Shaped Layout", img_src:layout2},
  {id: generateRandomId(),name:"U-Shaped Layout", img_src:layout3},
  {id: generateRandomId(),name:"Galley Layout", img_src:layout4},
  {id: generateRandomId(),name:"Center Island Layout", img_src:layout5},
  {id: generateRandomId(),name:"Split-Level Layout", img_src:layout6},
  {id: generateRandomId(),name:"Circular Layout", img_src:layout7},
  {id: generateRandomId(),name:"Zoned Layout", img_src:layout8},
  {id: generateRandomId(),name:"Flow-Through Layout", img_src:layout9},
  {id: generateRandomId(),name:"Multi-Functional Layout", img_src:layout10},
]

export const products = [
  furniture,
  lighting,
  textile,
  kitchen,
  floor,  
  bathroom,
  wall,
  stairs,
]

export const designers = [
  {
    name: "Zaha Hadid",
    id: "dsr1",
    profile_img: designer1,
    type: "Architect",
    experience: "15 Years",
  },
  {
    name: "Frank Lloyd",
    id: "dsr2",
    profile_img: designer2,
    type: "Architect",
    experience: "25 Years",
  },
  {
    name: "Kelly Hoppen",
    id: "dsr3",
    profile_img: designer3,
    type: "Designer",
    experience: "20 Years",
  },
  {
    name: "Peter Marino",
    id: "dsr4",
    profile_img: designer4,
    type: "Designer",
    experience: "15 Years",
  },
  {
    name: "Jean-Louis Deniot",
    id: "dsr5",
    profile_img: designer1,
    type: "Architect",
    experience: "15 Years",
  },
];

