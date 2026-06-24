import contactModel from '../models/contactModel.js';

async function addContact(req, res) {
    try {
        const instance = new contactModel(req.body);
        await instance.save();

        res.status(201).json({
            success: true,
            message: "Contact added successfully"
        });

    } catch (err) {

        // Duplicate email or mobile
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];

            return res.status(400).json({
                success: false,
                message: `${field} already exists`
            });
        }

        // Validation errors
        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map(
                error => error.message
            );

            return res.status(400).json({
                success: false,
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}
async function showContact(req, res) {
    try {
        let answer = await contactModel.find();
        res.send(answer)
    }
    catch (err) {
        res.send(err)
    }
}
async function showContactById(req, res) {
    try {
        console.log(req.params);

        let answer = await contactModel.findById(req.params.id);
        res.json(answer)
    }
    catch (err) {
        res.send(err)
    }
}
async function updateContact(req, res) {
    try {
        let updatedAnswer = await contactModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedAnswer) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json({ message: "Updated successfully", data: updatedAnswer });
    }
    catch (err) {
        res.status(500).json({ error: err.message || err });
    }
}
async function deleteContact(req, res) {
    try {
        let deletContact = await contactModel.findByIdAndDelete(
            req.params.id,
            req.body,
        );
        res.send("delete successfully");
    }
    catch (err) {
        res.status(500).json(err);
    }
}

async function showContactByName(req, res) {
    // {type:"name" , value:"tejas"}
    console.log(req.body);

    let { type, value } = req.body;
    try {
        // console.log(req.params);
        let answer = await contactModel.find({ [type]: value });
        res.json(answer)
    }
    catch (err) {
        res.send(err)
    }
}

async function paginationSearch(req,res){
    //{req.params} : {pageno:1}
    let pageNo = Number(req.params.pageno);
    let limit=3;
    let skipValue =( pageNo*limit)- pageNo;
    
     try {
        const totalRecords = await contactModel.estimatedDocumentCount();
        // console.log(totalRecords);
        
        let answer = await contactModel.find().skip(skipValue).limit(limit);
        // console.log(answer);

        let totalPages = Math.ceil(totalRecords/limit);
        console.log(totalPages);
        
        
        res.send({record:answer , count:totalRecords , pages:totalPages })
    }
    catch (err) {
        res.send(err)
    }
}

async function getContacts(req, res) {
    try {

        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 5;

        let skip = (page - 1) * limit;

        const contacts = await contactModel
            .find()
            .skip(skip)
            .limit(limit);

        const totalRecords = await contactModel.countDocuments();

        res.json({
            contacts,
            totalPages: Math.ceil(totalRecords / limit),
            currentPage: page
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
}
export {
    addContact,
    showContact,
    showContactById,
    updateContact,
    deleteContact,
    showContactByName,
    getContacts,
    paginationSearch
}