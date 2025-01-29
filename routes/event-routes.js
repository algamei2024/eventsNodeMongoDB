const express = require("express");
const router = express.Router();
const moment = require("moment");
const { check, validationResult } = require('express-validator');
const Event = require('../models/Event');
const { event } = require("jquery");
//====authenticate from user
isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/users/login");
}
//========
router.get('/create', isAuthenticated, (req, res) => {
    res.render('event/create', {
        errors: req.flash('errors')
    });
});
//route to home events
router.get('/:pageNo?', (req, res) => {
    let pageNo = 1;
    if (req.params.pageNo) {
        pageNo = req.params.pageNo;
    }
    if (req.params.pageNo == 0) {
        pageNo = 1;
    }
    let q = {
        skip: 5 * (pageNo - 1),
        limit:5
    }
    //find total documents
    let totalDocs = 0;
    Event.countDocuments({}).then((total) => {
        totalDocs = parseInt(total);
        Event.find({}, {},q).then((events) => {
            //res.json(events);
            let chunk = [];
            let chunkSize = 3;
            for (let i = 0; i < events.length; i += chunkSize) {
                chunk.push(events.slice(i, chunkSize + i));
            }
            //res.json(chunk);
            res.render('event/index', {
                chunk: chunk,
                message: req.flash("info"),
                total: totalDocs,
                pageNo: pageNo
            });
        }).catch((err) => {
            console.log("there is problem through get data");
        });
    }).catch((err) => {
        
    });
});

//show single event
router.post('/create', [
    check("title").isLength({ min: 5 }).withMessage("Title should be more than 5"),
    check("description").isLength({ min: 5 }).withMessage("Description should be more than 5"),
    check("location").isLength({ min: 5 }).withMessage("Location should be more than 5"),
    check("date").isLength({ min: 5 }).withMessage("Date should be more than 5"),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        res.redirect("/events/create");
    }
    else {
        let newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            user_id: req.user.id,
            created_at: Date.now()
        });
        newEvent.save().then((event) => {
            req.flash("info", "The event was created successfully");
            res.redirect('/events');
        }).catch((err) => {
            console.log(err);
        });
    }
});

router.get('/show/:id', (req, res) => {
    Event.findOne({ _id: req.params.id }).then((event) => {
        res.render('event/show', {
            event: event
        });
    }).catch((err) => {
        console.log('error in get data');
    });
});
//edit route
router.get("/edit/:id", isAuthenticated, (req, res) => {
    Event.findOne({ _id: req.params.id }).then((event) => {
        res.render('event/edit', {
            event: event,
            eventDate: moment(event.date).format('YYYY-MM-DD'),
            errors: req.flash("errors"),
            message:req.flash("info")
        });
    }).catch((err) => {
        req.flash("info", "Sorry no event in this id");
        res.redirect('/events');
    });
});
router.post("/update",[
    check("title").isLength({ min: 5 }).withMessage("Title should be more than 5"),
    check("description").isLength({ min: 5 }).withMessage("Description should be more than 5"),
    check("location").isLength({ min: 5 }).withMessage("Location should be more than 5"),
    check("date").isLength({ min: 5 }).withMessage("Date should be more than 5")]
    ,isAuthenticated, (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash("errors", errors.array());
            res.redirect("/events/edit/"+req.body.id);
        }
        else {
            let newfeilds = {
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                location: req.body.location,
            };
            let query = { _id: req.body.id };
            Event.updateOne(query,newfeilds).then((event) => {
                req.flash("info", "Data edited successfully");
                res.redirect("/events/edit/" + req.body.id);
            }).catch((err) => {
                console.log("error in dit data");
            });
        }
    });
//delete event
router.delete('/delete/:id', isAuthenticated, (req, res) => {
    console.log(req.params.id);
    let query = { _id: req.params.id };
    Event.deleteOne(query).then((result) => {
        res.status(200).json('delete');
    }).catch((err) => {
        res.status(400).json("there was an error event was not deleted");
    });
});
module.exports = router;