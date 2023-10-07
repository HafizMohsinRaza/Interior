const express = require('express');
const {City} = require('../../Models/Admin/CityModel');

const createCity = async(req,res) => {
    const {city,country} = req.body;

    try {
        const post = new City({
            city,
            country
        })
        await post.save().then(result => {
            res.json({city:result})
        })
        .catch(err => {
            console.log(err)
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const getCity = async(req,res) => {
    const city = await City.find()
    res.json(city)
}

const getSingleCity = (req,res) => {
    City.findOne({_id:req.params.id})
    .then(city => {
        res.json(city)
    })
    .catch(err => {
        return res.status(404).json({error:"City Not Found!"})
    })
}
const updateCity = async(req,res) => {
    const {city,country} = req.body;

    const post = await City.findById(req.params.id);

    if(post) {
        post.city = city;
        post.country = country;

        const updatedCity = await post.save();
        res.json(updatedCity)
    } else {
        res.status(404);
        throw new Error("City not found")
    }
}

const deleteCity = async(req,res) => {
    const city = await City.findById(req.params.id);

    if(city) {
        await city.deleteOne()
        res.json({message:"City Removed"})
    } else {
        res.status(404)
        throw new Error("Location not found")
    }
}

module.exports = {createCity,getCity,getSingleCity,updateCity,deleteCity}