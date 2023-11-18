const ContactsRouter = require('express').Router();
const ContactsModel = require('../models/Contacts.models');

ContactsRouter.get('/:id', (req, res, next) => {
    const userName = req.params.id;
    ContactsModel.find({ userName })
        .then(response => {
            return res.status(200).json({
                result: response,
                success: true,
                message: "Event fetch successfully"
            })
        })
        .catch(err => {
            return res.status(401).json({
                success: false,
                message: "Event fetch failed",
                Error: err
            })
        })
})

ContactsRouter.post('/add/:id', (req, res, next) => {
    const fullName = req.params.id;
    const data = req.body;
    const newContact = ContactsModel({ ...data, userName: fullName });
    newContact.save()
        .then(response => {
            return res.status(200).json({
                result: response,
                success: true,
                message: "Contact Added Successfully"
            })
        })
        .catch(err => {
            return res.status(400).json({
                success: false,
                message: "Contact Added Failed"
            })
        })
})

ContactsRouter.patch('/edit/:id/:name', async (req, res, next) => {
    try {
        const userName = req.params.id;
        const name = req.params.name;
        const details = req.body;
        const matchedUser = await ContactsModel.findOne({ userName,name });
        if (!matchedUser) {
            res.status(400).json({ Err: "Contact not exist" });
            return;
        }
        else {
            matchedUser.name = details.name;
            matchedUser.email = details.email;
            matchedUser.number = details.number;
            matchedUser.address = details.address;
            await ContactsModel.findByIdAndUpdate(matchedUser.id, matchedUser);
            res.status(201).json({
                success: true,
                message: `${matchedUser.userName} details has beed changed sucessfully`,
            });
        }
    }
    catch (error) {
        return res.status(500).json({ err: error });
    }
})

ContactsRouter.delete('/delete/:fullName/:name', async(req,res,next) => {
    const matchedDocument = await ContactsModel.findOne({"name":req.params.name,"userName":req.params.fullName});
    await ContactsModel.findOneAndRemove({name:matchedDocument.name})
        .then(response => {
            return res.status(200).json({
                success: true,
                message: "deleted Successfully"
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                success: false,
                message: "deleted failed"
            })
        })
})

module.exports = ContactsRouter;