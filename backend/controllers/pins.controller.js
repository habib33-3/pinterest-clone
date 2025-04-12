import Pin from "../models/pins.model.js";

export const getPins=async(req,res)=>{
    const pins=await Pin.find();
    res.status(200).send(pins);
}