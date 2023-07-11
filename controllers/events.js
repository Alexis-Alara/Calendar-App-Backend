const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async( req, res = response ) => {

    const events = await Event.find()
                                .populate('user','name');

    res.json({
        ok: true,
        events
    });
}

const createEvent = async( req, res = response ) => {

    const event = new Event( req.body );

    try {
        event.user = req.uid;
        const saveEvent = await event.save();

        res.json({
            ok: true,
            event: saveEvent
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Talk to an administrator'
        });
    }
}

const updateEvent = async( req, res = response ) => {
    res.json({
        ok: true,
        msg: ' update Events'
    });
}

const deleteEvent = async( req, res = response ) => {
    res.json({
        ok: true,
        msg: ' delete Events'
    });
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};