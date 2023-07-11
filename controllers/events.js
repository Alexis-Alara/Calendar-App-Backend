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

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Event.findById( eventId );

        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'The event doesnt exist'
            });
        }

        if ( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to edit this event'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );
        res.json({
            ok: true,
            msg: updatedEvent
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Talk to an administrator'
        });
    }

}

const deleteEvent = async( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Event.findById( eventId );

        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'The event doesnt exist'
            });
        }

        if ( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to edit this event'
            });
        }

        await Event.findByIdAndDelete( eventId );
        res.json({
            ok: true
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Talk to an administrator'
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};