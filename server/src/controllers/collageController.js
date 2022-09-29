const internModel = require("../models/internModel")
const collegeModel = require('../models/collegeModel')
const { validName, validFullName, dataValidation, url } = require('../util/validator')

//----------------------------------------createCollege------------------------------------------
const createCollege = async (req, res) => {
    try {
        const reqBody = req.body;
        const { name, fullName, logoLink } = reqBody;

        //------------------------------data validation---------------------------------
        if (!dataValidation(reqBody))
            return res.status(400).send({ status: false, msg: 'Please provide some data' })

        //----------------------------name validation--------------------------------
        if (!name)
            return res.status(400).send({ status: false, msg: 'Name is\'nt present' })

        if (!validName(name))
            return res.status(400).send({ status: false, msg: 'Name is\'nt valid' })

        //---------------------------finding collage-------------------------------
        const college = await collegeModel.findOne({ name })

        if (college)
            return res.status(400).send({ status: false, msg: 'Name already exist' })

        //----------------------------fullName validation--------------------------------
        if (!validFullName(fullName))
            return res.status(400).send({ status: false, msg: 'Full Name is\'nt valid' })

        if (!fullName)
            return res.status(400).send({ status: false, msg: 'Name is\'nt present' })

        //----------------------------logoLink validation--------------------------------
        if (!url(logoLink))
            return res.status(400).send({ status: false, msg: 'This url is\'nt valid' })

        if (!logoLink)
            return res.status(400).send({ status: false, msg: 'Link is required' })

        //--------------------------------college creation-----------------------------
        const saveData = await collegeModel.create(reqBody)

        //-----------------------------as per our requirement--------------------------
        const data = {
            name: saveData.name,
            fullName: saveData.fullName,
            logoLink: saveData.logoLink,
            isDeleted: saveData.isDeleted
        }

        return res.status(201).send({ status: true, message: 'College created successfully', data: data })

    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

//--------------------------------------collegeDetails-------------------------------------------
const collegeDetails = async (req, res) => {
    
    // res.setHeader('Access-Control-Allow-Origin', '*')

    try {
        const collegeName = req.query.collegeName

        //--------------------------------data validation-----------------------------------
        if (!collegeName)
            return res.status(400).send({ status: false, msg: 'Please provide valid query' });

        //---------------------------------collage--------------------------
        const college = await collegeModel.findOne({ name: collegeName })

        if (!college)
            return res.status(404).send({ status: false, msg: 'College doesn\'t exist' })

        //-------------------------find and select some field ------------------------------
        const interns = await internModel.find({ collegeId: college._id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 });

        //--------------------as per our requirement----------------
        const data = {
            name: college.name,
            fullName: college.fullName,
            logoLink: college.logoLink,
            interns: interns
        }

        res.status(200).send({ status: true, data: data })

    } catch (err) {
        res.status(500).send({ status: false, msg: 'Error', error: err.message })
    }
}

module.exports = { createCollege, collegeDetails }
