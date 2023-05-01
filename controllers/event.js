const firestore = require('../config/firebase').firebase;
const users = firestore.collection('Users')
const events = firestore.collection('Events')
const event_id = 'BNdB1HQTZtAqX4AfbfEH';

exports.attend = (req, res) => {
    let uid = req.user.uid;
    let day = req.body.day;

    if(day !== undefined) {
        if(day === 'Friday' || day === 'Thursday' || day === 'Wednesday' || day === 'Tuesday' || day === 'Monday' || day === 'Saturday' || day === 'Sunday') {
            users.doc(uid).get().then(snapshot => {
                if(snapshot.exists) {
                    events.doc(event_id).get().then(snapshot => {
                        if(snapshot.exists) {
                            events.doc(event_id).collection('days').doc(day).collection('attendees').doc(uid).get().then(snapshot => {
                                if(snapshot.exists) {
                                    res.status(422).json({
                                        message : 'Event already attended'
                                    })
                                } else {
                                    events.doc(event_id).collection('days').doc(day).collection('attendees').doc(uid).set({
                                        attended : true,
                                    })
                                    users.doc(uid).collection("events").doc(event_id).collection('days').doc(day).set({
                                        attended: true,
                                    })
                                    res.status(200).json({
                                        message: "Event attended!"
                                    })
                                }
                            })
                        } else {
                            res.status(422).json({
                                message : 'Event does not exist'
                            })
                        }
                    })
                } else {
                    res.status(422).json({
                        message : 'User does not exist'
                    })
                 }
            })
        } else {
            res.status(400).json({
                message : 'Invalid day'
            })
        }
    } else {
        res.status(400).json({
            message : 'Undefined body'
        })
    }
}


exports.getAttend = (req, res) => {
    let uid = req.user.uid;
    users.doc(uid).get().then(snapshot => {
        if(snapshot.exists) {
            events.doc(event_id).get().then(snapshot => {
                if(snapshot.exists) {
                    let count = 0;
                    users.doc(uid).collection('events').doc(event_id).collection('days').get().then(snapshot => {
                        if(snapshot.size > 0) {
                            console.log(snapshot.size)
                            let array = []
                            snapshot.forEach(doc => {
                                array.push(doc.id)
                                count++;
                                if(count === snapshot.size) {
                                    res.status(200).json({
                                        data : array
                                    })
                                }
                            })
                        } else {
                            res.status(422).json({
                                message : 'Did not attend this event!'
                            })  
                        }
                    })
                } else {
                    res.status(422).json({
                        message : 'Event does not exist'
                    })
                }
            })
        } else {
            res.status(422).json({
                message : 'User does not exist'
            })
        }
    })
}


exports.cancelAttend = (req, res) => {
    let uid = req.user.uid;
    let day = req.body.day;

    if(day !== undefined) {
        if(day === 'Friday' || day === 'Thursday' || day === 'Wednesday' || day === 'Tuesday' || day === 'Monday' || day === 'Saturday' || day === 'Sunday') {
            users.doc(uid).get().then(snapshot => {
                if(snapshot.exists) {
                    events.doc(event_id).get().then(snapshot => {
                        if(snapshot.exists) {
                            events.doc(event_id).collection('days').doc(day).collection('attendees').doc(uid).get().then(snapshot => {
                                if(snapshot.exists) {

                                    events.doc(event_id).collection('days').doc(day).collection('attendees').doc(uid).delete();
                                    users.doc(uid).collection("events").doc(event_id).collection('days').doc(day).delete();

                                    res.status(200).json({
                                        message: "Event unattended!"
                                    })
                                } else {
                                    res.status(422).json({
                                        message : 'Event does not exist'
                                    })
                                }
                            })
                        } else {
                            res.status(422).json({
                                message : 'Event does not exist'
                            })
                        }
                    })
                } else {
                    res.status(422).json({
                        message : 'User does not exist'
                    })
                }
            })
        } else {
            res.status(400).json({
                message : 'Invalid day'
            })
        }
    } else {
        res.status(400).json({
            message : 'Undefined body'
        })
    }
}

exports.addFood = (req, res) => {

    let food_name = req.body.food_name;
    let category = req.body.category;
    let day = req.body.day;

    
    if(day !== undefined ||  category !== undefined || food_name !== undefined) {
        if(day === 'Friday' || day === 'Thursday' || day === 'Wednesday' || day === 'Tuesday' || day === 'Monday' || day === 'Saturday' || day === 'Sunday') {
            if(category === 'Dessert' || category === 'Main Course') {
                    events.doc(event_id).get().then(snapshot => {
                        if(snapshot.exists) {
                            events.doc(event_id).collection('days').doc(day).collection('Foods').doc('Categories')
                            .collection(category).add({
                                food_name : food_name
                            })
                            
                            res.status(200).json({
                                message: "Food added"
                            })
                        } else {
                            res.status(422).json({
                                message : 'Event does not exist'
                            })
                        }
                    })
            } else {
                res.status(400).json({
                    message : 'Invalid category'
                })
            }
        } else {
            res.status(400).json({
                message : 'Invalid day'
            })
        }
    } else {
        res.status(400).json({
            message : 'Undefined body'
        })
    }
}


exports.getFood = (req, res) => {
    let arrayDessert = []
    let arrayMainCourse = []

    let day = req.params.day;
    
    if(day !== undefined ) {
        if(day === 'Friday' || day === 'Thursday' || day === 'Wednesday' || day === 'Tuesday' || day === 'Monday' || day === 'Saturday' || day === 'Sunday') {
            events.doc(event_id).get().then(snapshot => {
                if(snapshot.exists) {
                    getFoods(day, "Dessert", result => {
                            arrayDessert = result
                            getFoods(day, "Main Course", result1 => {
                                arrayMainCourse = result1
                                res.status(200).json({
                                    "Dessert" : arrayDessert,
                                    "MainCourse" : arrayMainCourse
                                })
                            })
                    })
                } else {
                    res.status(422).json({
                        message : 'Event does not exist'
                    })
                }
            })
        } else {
            res.status(400).json({
                message : 'Invalid day'
            })
        }
    } else {
        res.status(400).json({
            message : 'Undefined body'
        })
    }
}

async function getFoods(day, category, callback) {
    let count = 0;
    let array = [];
    await events.doc(event_id).collection('days').doc(day)
    .collection('Foods').doc('Categories').collection(category).get().then(snapshot => {
        if(snapshot.size > 0) {
            snapshot.forEach(doc => {
                array.push({food_name: doc.data().food_name, id: doc.id})
                count++;
                if(count === snapshot.size) {
                    callback(array);
                }
            })
        } else {
            callback(array)
        }
    })
}


exports.editFood = (req, res) => {

    let food_id = req.body.food_id;
    let day = req.body.day;
    let category = req.body.category;
    let new_name = req.body.new_name;

    if(food_id !== undefined || day !== undefined || category !== undefined || new_name !== undefined) {
        if(day === 'Friday' || day === 'Thursday' || day === 'Wednesday' || day === 'Tuesday' || day === 'Monday' || day === 'Saturday' || day === 'Sunday') {
            events.doc(event_id).get().then(snapshot => {
                if(snapshot.exists) {
                    if(category === 'Dessert' || category === 'Main Course') {              
                         events.doc(event_id).collection('days').doc(day)
                        .collection('Foods').doc('Categories').collection(category).doc(food_id).get().then(snapshot => {
                        if(snapshot.exists) {
                            events.doc(event_id).collection('days').doc(day)
                            .collection('Foods').doc('Categories').collection(category).doc(food_id).update({
                                food_name : new_name
                                })
                            res.status(200).json({
                                message: "Food name changed to " + new_name
                            })
                        } else {
                            res.status(422).json({
                                message : 'Food does not exist'
                            })
                        }
                    })
                    } else {
                        res.status(400).json({
                            message : 'Invalid category'
                        })
                    }
                } else {
                    res.status(422).json({
                        message : 'Event does not exist'
                    })
                }
            })
        } else {
            res.status(400).json({
                message : 'Invalid day'
            })
        }
    } else {
        res.status(400).json({
            message : 'Undefined body'
        })
    }
}

exports.deleteFood = (req, res) => {
    let food_id = req.params.food_id;
    let day = req.params.day;
    let category = req.params.category;

    if(food_id !== undefined || day !== undefined || category !== undefined) {
        if(day === 'Friday' || day === 'Thursday' || day === 'Wednesday' || day === 'Tuesday' || day === 'Monday' || day === 'Saturday' || day === 'Sunday') {
            events.doc(event_id).get().then(snapshot => {
                if(snapshot.exists) {
                    if(category === 'Dessert' || category === 'Main Course') {              
                         events.doc(event_id).collection('days').doc(day)
                        .collection('Foods').doc('Categories').collection(category).doc(food_id).get().then(snapshot => {
                        if(snapshot.exists) {
                            events.doc(event_id).collection('days').doc(day)
                            .collection('Foods').doc('Categories').collection(category).doc(food_id).delete()
                            res.status(200).json({
                                message: food_id + " was deleted"
                            })
                        } else {
                            res.status(422).json({
                                message : 'Food does not exist'
                            })
                        }
                    })
                    } else {
                        res.status(400).json({
                            message : 'Invalid category'
                        })
                    }
                } else {
                    res.status(422).json({
                        message : 'Event does not exist'
                    })
                }
            })
        } else {
            res.status(400).json({
                message : 'Invalid day'
            })
        }
    } else {
        res.status(400).json({
            message : 'Undefined body'
        })
    }
}