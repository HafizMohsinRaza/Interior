const express = require('express');
const {Places} = require('../../Models/Admin/PlacesModel');

const createPlaces = async(req,res) => {
    const {place,pincode,city,country} = req.body;

    try {
        const post = new Places({
            place,
            pincode,
            city,
            country
        })
        await post.save().then(result => {
            res.json({place:result})
        })
        .catch(err => {
            console.log(err)
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const getPlaces = async(req,res) => {
    const places = await Places.find()
    res.json(places)
}

const getSinglePlaces = (req,res) => {
    Places.findOne({_id:req.params.id})
    .then(place => {
        res.json(place)
    })
    .catch(err => {
        return res.status(404).json({error:"Place Not Found!"})
    })
}

const updatePlaces = async(req,res) => {
    const {place,pincode,city,country} = req.body;

    const post = await Places.findById(req.params.id);

    if(post) {
        post.place = place;
        post.pincode = pincode;
        post.city = city;
        post.country = country

        const updatedPlaces = await post.save();
        res.json(updatedPlaces)
    }else {
        res.status(404);
        throw new Error("Places not found")
    }
}

const deletePlaces = async(req,res) => {
    const place = await Places.findById(req.params.id);

    if(place) {
        await place.deleteOne()
        res.json({message:"Place Removed"})
    }else {
        res.status(404)
        throw new Error("Place not found")
    }
}

module.exports = {createPlaces,getPlaces,getSinglePlaces,updatePlaces,deletePlaces}