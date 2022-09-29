const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')
const { mail, dataValidation, validFullName } = require('../util/validator');

// ----------------------------------------createCollege----------------------------------------
const createIntern = async (req, res) => {

    // res.setHeader('Access-Control-Allow-Origin', '*')

    try {
        const reqBody = req.body
        let { name, email, mobile, collegeName } = reqBody

        //-------------------------------data validation---------------------------------
        if (!dataValidation(reqBody))
            return res.status(400).send({ status: false, msg: 'Please provide data' })

        //--------------------------------name validation--------------------------------
        if (!name)
            return res.status(400).send({ status: false, msg: "Please fill the name" })

        if (!validFullName(name))
            return res.status(400).send({ status: false, msg: 'Please enter a valid name' })

        //--------------------------------exitsIntern-----------------------------------
        const exitsIntern = await internModel.find()

        //------------------------------email validation---------------------------------
        if (!email)
            return res.status(400).send({ status: false, msg: 'please fill the email' })

        if (!mail(email))
            return res.status(400).send({ status: false, msg: 'Please enter a valid email' })

        //------------------------------finding duplicate email------------------------------
        for (let i = 0; i < exitsIntern.length; i++) {
            if (exitsIntern[i].email == email)
                return res.status(400).send({ status: false, msg: 'Email already registered' })
        }

        //------------------------------mobile validation---------------------------------
        if (!mobile)
            return res.status(400).send({ status: false, msg: 'please fill the mobile' })

        const ph = mobile.trim()
        if ((!(/^[ 0-9 ]{10,10}$/).test(ph)))
            return res.status(400).send({ status: false, msg: 'Please provide valid number' });

        //--------------------------------finding duplicate phone-------------------------------
        for (let i = 0; i < exitsIntern.length; i++) {
            if (exitsIntern[i].mobile == mobile)
                return res.status(400).send({ status: false, msg: 'Mobile already registered' })
        }

        //-----------------------------------college finding-----------------------------------
        const collegeNames = await collegeModel.findOne({ $or: [{ name: collegeName }, { fullName: collegeName }] })

        if (!collegeNames)
            return res.status(400).send({ status: false, msg: 'College not found' })

        reqBody.collegeId = collegeNames._id

        //-----------------------------------intern  creation-----------------------------------
        const saveData = await internModel.create(reqBody)
        const data = {
            isDeleted: saveData.isDeleted,
            name: saveData.name,
            email: saveData.email,
            mobile: saveData.mobile,
            collegeId: saveData.collegeId
        }

        res.status(201).send({ status: true, message: 'Intern created successfully', data: data });

    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
};

module.exports = { createIntern }