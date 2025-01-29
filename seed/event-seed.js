const db = require('../config/database');
const Event = require('../models/Event');

let newEvents = [
    new Event({
        title: "beach cleaning at Muscat 1",
        description: "Lorem ipsum dolor sit amet , consectetur elit, sed to do eiusmod",
        location: "Yemen",
        date: Date.now(),
        created_at:Date.now()
    }),
    new Event({
        title: "beach cleaning at Muscat 2",
        description: "Lorem ipsum dolor sit amet , consectetur elit, sed to do eiusmod",
        location: "Yemen",
        date: Date.now(),
        created_at:Date.now()
    }),
    new Event({
        title: "beach cleaning at Muscat 3",
        description: "Lorem ipsum dolor sit amet , consectetur elit, sed to do eiusmod",
        location: "Yemen",
        date: Date.now(),
        created_at:Date.now()
    }),
    new Event({
        title: "beach cleaning at Muscat 4",
        description: "Lorem ipsum dolor sit amet , consectetur elit, sed to do eiusmod",
        location: "Yemen",
        date: Date.now(),
        created_at:Date.now()
    }),
    new Event({
        title: "beach cleaning at Muscat 5",
        description: "Lorem ipsum dolor sit amet , consectetur elit, sed to do eiusmod",
        location: "Yemen",
        date: Date.now(),
        created_at:Date.now()
    }),
    new Event({
        title: "beach cleaning at Muscat",
        description: "Lorem ipsum dolor sit amet , consectetur elit, sed to do eiusmod",
        location: "Yemen",
        date: Date.now(),
        created_at:Date.now()
    }),
    new Event({
        title: "beach cleaning at Muscat",
        description: "Lorem ipsum dolor sit amet , consectetur elit, sed to do eiusmod",
        location: "Yemen",
        date: Date.now(),
        created_at:Date.now()
    }),
    new Event({
        title: "beach cleaning at Muscat 6",
        description: "Lorem ipsum dolor sit amet , consectetur elit, sed to do eiusmod",
        location: "Yemen",
        date: Date.now(),
        created_at:Date.now()
    }),
];
newEvents.forEach((event) => {
    event.save().then((res) => {
        console.log("successfully add");
    }).catch((err) => {
        console.log("there is error through insert");
    });
});
// let newEvent = new Event({
//     title: "this is event 1",
//     description: "this is the best event in the world",
//     location: "ibb",
//     date:Date.now()
// });

// newEvent.save().then((res) => {
//     console.log("success to add");
// }).catch((err) => {
//     console.log(err);
// });