require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    //isAuthenticated making sure that user is authenticated lol (logged in)
    isAuthenticated: (req, res, next) => {

        //headerToken getting authorization for logged in user
        const headerToken = req.get('Authorization')
        
        //"if (!headerToken)" sends back error if trying to go to page for only authenticated users
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        //"try" making sure that user is logged in
        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }
        
        //"if (!token)" sending an error if user isn't logged in
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}