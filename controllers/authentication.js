const firestore = require('../config/firebase').firebase;
const auth = require('../config/firebase').auth;
const users = firestore.collection('Users')


exports.register = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;  
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;

    if(email === undefined && password === undefined && firstName === undefined && lastName === undefined) {
        res.status(400).json({
            message : 'undefined body'
        })
    } else {
        if(firstName[0] !== firstName[0].toUpperCase()) {
            res.status(400).json({
                message : 'First name must start with an Uppercase letter'
            })
        } else if(lastName[0] !== lastName[0].toUpperCase()) {
            res.status(400).json({
                message : 'Last name must start with an Uppercase letter'
            })
        } else if(firstName.length > 30) {
            res.status(400).json({
                message : 'First must be less than 30 characters'
            })
        } else if(lastName.length > 30) {
            res.status(400).json({
                message : 'Last must be less than 30 characters'
            })
        } else if(hasNumber(firstName) || hasNumber(lastName)) {
            res.status(400).json({
                message : 'No numbers allowed'
            })
        } else {
            auth.createUser({
                email: email,
                emailVerified: false,
                password: password,
                displayName: firstName + ' ' + lastName,
                disabled: false
              }).then(data => {
                  users.doc(data.uid).set({
                      displayName : firstName + ' ' + lastName,
                  })
                  res.status(200).json({
                      message : 'Successfully created new user:' + data.uid
                  })
              }).catch(error => {
                res.status(422).json({
                      message : error.message
                  })
              });
        }
    }
}


function hasNumber(myString) {
    return /\d/.test(myString);
}