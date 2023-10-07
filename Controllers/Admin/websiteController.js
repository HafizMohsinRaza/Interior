const express = require('express');
const {WebsiteSetting} = require("../../Models/Admin/WebsiteModel")

const createWebsiteSetting = async(req,res) => {
  try {
    const updatedSettings = req.body;
    await WebsiteSetting.findOneAndUpdate({}, updatedSettings, { upsert: true });
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

const getAllWebsiteSetting = async(req,res) => {
  try {
    const settings = await WebsiteSetting.findOne();
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {createWebsiteSetting,getAllWebsiteSetting}