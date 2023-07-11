/*
    Events routes
    host+/api/events
*/
const { check } = require('express-validator')
const { Router } = require('express');
const router = Router();

const { JWTValidators } = require('../middlewares/JWT-validators');
const { fieldValidators } = require('../middlewares/field-validators');
const { isDate } = require('../helpers/isDate');
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");


router.use( JWTValidators );


// Get events
router.get('/', getEvents);

// Create event
router.post('/',
    [
        check('title', 'The title is required').not().isEmpty(),
        check('start', 'The start date is required').custom( isDate ),
        check('end', 'The end date is required').custom( isDate ),
        fieldValidators
    ],
    createEvent);

// Update event
router.put('/:id', updateEvent);

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;