const TodoRouter = require('express').Router();
const TodoModel = require('../models/Todo.models');

TodoRouter.get('/:id', (req, res, next) => {
    const fullName = req.params.id;
    TodoModel.find({ fullName })
        .then(response => {
            return res.status(200).json({
                result: response,
                success: true,
                message: "Todo fetch successfully"
            })
        })
        .catch(err => {
            return res.status(401).json({
                success: false,
                message: "Todo fetch failed",
                Error: err
            })
        })
})

TodoRouter.post('/add/:id', (req, res, next) => {
    const name = req.params.id;
    const data = req.body;
    const newEvent = TodoModel({ ...data, fullName: name });
    newEvent.save()
        .then(response => {
            return res.status(200).json({
                result: response,
                success: true,
                message: "Todo Added Successfully"
            })
        })
        .catch(err => {
            return res.status(400).json({
                success: false,
                message: "Todo Added Failed"
            })
        })
})

TodoRouter.patch('/edit/:id/:title', async (req, res, next) => {
    try {
        const fullName = req.params.id;
        const title = req.params.title;
        const details = req.body;
        const matchedUser = await TodoModel.findOne({title,fullName});
        if (!matchedUser) {
            res.status(400).json({ Err: "Todo not exist" });
            return;
        }
        else {
            matchedUser.description = details.description;
            matchedUser.status = details.status;
            await TodoModel.findByIdAndUpdate(matchedUser.id, matchedUser);
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

TodoRouter.delete('/delete/:fullName/:title', async(req,res,next) => {
    const matchedDocument = await TodoModel.findOne({"title":req.params.title,"fullName":req.params.fullName});
    await TodoModel.findOneAndRemove({title:matchedDocument.title})
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

module.exports = TodoRouter;