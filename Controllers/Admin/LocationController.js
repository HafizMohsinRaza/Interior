const express = require('express');
const {Location} = require('../../Models/Admin/LocationModel');

const createLocation = async(req,res) => {
    const {country,countryCode} = req.body;

    try {
        const post = new Location({
            country,
            countryCode
        })
        await post.save().then(result => {
            res.json({location:result})
        })
        .catch(err => {
            console.log(err)
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const getLocation = async(req,res) => {
    const locations = await Location.find()
    res.json(locations)
}

const getSingleLocation = (req,res) => {
    Location.findOne({_id:req.params.id})
    .then(location => {
        res.json(location)
    })
    .catch(err => {
        return res.status(404).json({error:"Location Not Found!"})
    })
}

const updateLocation = async(req,res) => {
    const {country,countryCode} = req.body;

    const location = await Location.findById(req.params.id);

    if(location) {
        location.country = country;
        location.countryCode = countryCode;

        const updatedLocation = await location.save();
        res.json(updatedLocation)
    } else {
        res.status(404);
        throw new Error("Location not found")
    }
}

const deleteLocation = async(req,res) => {
    const location = await Location.findById(req.params.id);
    // console.log(location)
    if(location) {
        await location.deleteOne();
        res.json({message:"Location Removed"})
    } else {
        res.status(404);
        throw new Error("Location not found")
    }
}

module.exports = {createLocation,getLocation,getSingleLocation,updateLocation,deleteLocation}