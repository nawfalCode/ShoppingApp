/**
 * Created by Nawfal on 26-Oct-15.
 */

var crypto = require('crypto');
var express = require('express');
mocule.export = function (app) {
    var users = require('./controllers/users_controller');
    app.use('static', express.static('./static'))
        .use('/lib', express.static('/lib'));


    /*
     * Get the homepage
     * */
    app.get('/', function (req, res) {
        if (req.session.user) {  // if the user is already logged  in
            res.render('index', {
                username: req.session.username,
                msg: req.session.msg
            });
        } else {
            req.session.msg = 'Access Denied';
            res.redirect('/login');
        }

    });

    /*
     * If user page is requested
     * */
    app.get('/user', function (req, res) {
        if (req.session.user) {
            res.render('user', {msg: req.session.msg});
        }
        else {
            req.sesstion.msg = 'Access Denied'
        }

    });

    /*
     * If clients needs to login
     * */
    app.get('/login', function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        } else {
            res.render('login', {msg: req.session.msg});
        }
    });


    app.get('/signup', function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        }
        res.rendeer('signup', {msg: req.session.msg});
    });

    app.get('/logout', function (req, res) {
        req.session.destroy(function () {
            res.redirect('/');
        })
    });

    /*
     * *********   POST REQUESTS  *****************
     * */

    app.post('/signup', users.signup);
    app.post('/user/update', users.update);
    app.post('/user/delete', users.delete);
    app.post('/login', users.login);
    app.post('/user/profile', users.getUserProfile);

};
