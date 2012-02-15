/**
 * Module dependencies.
 */
var express = require('express');

var Check = require('../../models/check');
var Tag = require('../../models/tag');

var app = module.exports = express.createServer();

// middleware

app.configure(function(){
  app.use(app.router);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/checks', function(req, res) {
  res.render('checks', { route: app.route });
});

app.get('/check/:id', function(req, res, next) {
  Check.findOne({ _id: req.params.id }, function(err, check) {
    if (err) return next(err);
    if (!check) return next(new Error('failed to load check ' + req.params.id));
    res.render('check', { route: app.route, check: check, info: req.flash('info') });
  });
});

app.put('/check/:id', function(req, res, next) {
  Check.findOne({ _id: req.params.id }, function(err, check) {
    if (err) return next(err);
    if (!check) return next(new Error('failed to load check ' + req.params.id));
    check.name = req.body.name;
    check.url = req.body.url;
    check.interval = req.body.interval;
    check.maxTime = req.body.maxTime;
    check.tags = req.body.tags.replace(/\s*,\s*/g, ',').split(',');
    check.save();
    req.flash('info', 'Changes have been saved');
    res.redirect('/check/' + req.params.id);
  });
});

app.get('/tags', function(req, res) {
  res.render('tags', { route: app.route });
});

app.get('/tag/:name', function(req, res, next) {
  Tag.findOne({ name: req.params.name }, function(err, tag) {
    if (err) return next(err);
    if (!tag) return next(new Error('failed to load tag ' + req.params.name));
    res.render('tag', { route: app.route, tag: tag });
  });
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}