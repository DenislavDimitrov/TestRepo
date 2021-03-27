const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const express = require('express');
const auth = require('../middlewares/auth')
const cors = require('cors');


function setupExpress(app){
    app.use(cors({
        exposedHeaders: 'Authorization'
      }));
    app.engine('hbs', handlebars({
        extname: 'hbs',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
          }
    }));
    app.set('view engine', 'hbs');
    app.use(express.static('public'))
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(auth()); //must be before routes
}
module.exports = setupExpress;