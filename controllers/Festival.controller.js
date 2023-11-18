const FestivalRouter = require('express').Router();
const axios = require('axios');
const FestivalModel = require('../models/Festival.models')

FestivalRouter.post('/', async (req, res) => {
    try {
        const apiKey = `${process.env.FESTIVAL_FOR_HOLIDAY_API_KEY}`; // Replace with your actual API key
        const country = 'IN'; // Country code (India)
        const year = '2023'; // Year for which you want to fetch holidays

        const response = await axios.get('https://calendarific.com/api/v2/holidays', {
            params: {
                api_key: apiKey,
                country: country,
                year: year,
            },
        });

        const holidays = response.data.response.holidays;

        await FestivalModel.insertMany(holidays)

        return res.status(200).json({
            result: holidays,
            success: true,
            message: 'Festival fetch successful',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Festival fetch failed',
            error: error.message,
        });
    }
});


FestivalRouter.get('/get', (req,res,next) => {
    FestivalModel.find({})
        .then(response => {
            return res.status(200).json({
                result : response,
                success : true,
            })
        })
        .catch(err => {
            return res.status(401).json({
                success : false,
                Error : err
            })
        })
})

module.exports = FestivalRouter;
