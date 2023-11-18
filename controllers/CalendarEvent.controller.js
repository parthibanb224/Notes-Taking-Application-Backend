const CalendarEventRouter = require('express').Router();
const CalendarEventModel = require('../models/CalendarEvent.models');

CalendarEventRouter.get('/:id', (req, res, next) => {
    const fullName = req.params.id;
    CalendarEventModel.find({ fullName })
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

CalendarEventRouter.post('/add/:id', (req, res, next) => {
    const name = req.params.id;
    const data = req.body;
    const newEvent = CalendarEventModel({ ...data, fullName: name });
    newEvent.save()
        .then(response => {
            return res.status(200).json({
                result: response,
                success: true,
                message: "Event Added Successfully"
            })
        })
        .catch(err => {
            return res.status(400).json({
                success: false,
                message: "Event Added Failed"
            })
        })
})

CalendarEventRouter.patch('/edit/:id/:title', async (req, res, next) => {
    try {
        const fullName = req.params.id;
        const title = req.params.title;
        const details = req.body;
        const matchedUser = await CalendarEventModel.findOne({ fullName,title });
        if (!matchedUser) {
            res.status(400).json({ Err: "Event not exist" });
            return;
        }
        else {
            matchedUser.title = details.title;
            matchedUser.date = details.date;
            matchedUser.time = details.time;
            matchedUser.type = details.type;
            matchedUser.details = details.details;
            matchedUser.day = details.day;
            matchedUser.start = details.start;
            matchedUser.end = details.end;
            await CalendarEventModel.findByIdAndUpdate(matchedUser.id, matchedUser);
            res.status(201).json({
                success: true,
                message: `${matchedUser.fullName} details has beed changed sucessfully`,
            });
        }
    }
    catch (error) {
        return res.status(500).json({ err: error });
    }
})

CalendarEventRouter.delete('/delete/:fullName/:title', async(req,res,next) => {
    const matchedDocument = await CalendarEventModel.findOne({"title":req.params.title,"fullName":req.params.fullName});
    await CalendarEventModel.findOneAndRemove({title:matchedDocument.title})
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

module.exports = CalendarEventRouter;