const express = require("express");
const {ManagePages} = require("../../Models/Admin/ManagePages");

const createManagePages = async(req,res) => {
    const data = req.body;

  try {
    const pageId = req.params.pageId; // Assuming you pass the page ID in the URL

    const managepage = await ManagePages.findByIdAndUpdate(
      pageId,
      data,
      { new: true, upsert: true }
    );

    res.json(managepage);
  } catch (error) {
    res.status(500).json({ error: 'Error while saving Manage Pages.' });
  }
}

const getAllManagePages = (req,res) => {
    ManagePages.find()
    .then(managepage => {
        res.json(managepage)
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = {createManagePages,getAllManagePages}