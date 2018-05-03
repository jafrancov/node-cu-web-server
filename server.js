const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view_engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     return res.render('maintenance.hbs', {
//         pageTitle: 'We are under Maintenance',
//         backIn: '10 minutes',
//     });
// });

app.use(express.static(__dirname + '/public/'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>hello express duh!</h1>');
    // res.send({
    //     name: 'Alex',
    //     likes: [
    //         'Hiking',
    //         'Swimming'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Welcome!',
        // currentYear: new Date().getFullYear(),
        name: 'Alex',
        likes: [
            'Hiking',
            'Swimming'
        ]
    });
});

app.get('/about/', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        // currentYear: new Date().getFullYear(),
    });
});

app.get('/projects/', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects portfolio',
    });
});

app.get('/bad/', (req, res) => {
    res.send({
        errorMessage: 'Oops! some error happened'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});