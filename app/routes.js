var locations = require('./models/parking');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.get('/api/location', function(req, res) {
        var rediusInKM = req.query.radius * 1000;
        var query = {
            position: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [Number(req.query.lng), Number(req.query.lat)]
                    },
                    $maxDistance: rediusInKM
                }
            },
            isActive: req.query.isActive == 'true'
        };
        console.log("query >>>;" + JSON.stringify(query));
        //locations.ensureIndex({ position: '2dsphere' });
        locations.find(query, function(err, loc) {
            if (err) {
                res.send(err)
            }
            res.json(loc);
        });
    });
    app.post('/api/location', function(req, res) {
        var location = {};
        var position = {};
        position.type = "Point";
        position.coordinates = [new Number(req.body.lng), new Number(req.body.lat)];
        location.position = position;
        location.desc = req.body.desc;
        location.isActive = true;
        console.log(" in post call and the req body is " + JSON.stringify(location));
        locations.create(location, function(err, loc) {
            if (err) {
                res.send(err);
            }
            locations.find(function(err, loc) {
                if (err)
                    res.send(err)
                res.json(loc);
            });
        });
    });
    app.delete('/api/location/:id', function(req, res) {
        console.log(" deleting this id " + req.params.id);
        locations.remove({
            _id: req.params.id
        }, function(err, loc) {
            if (err) {
                res.send(err)
            };
            locations.find(function(err, loc) {
                if (err) {
                    res.send(err);
                };
                res.json(loc);
            });
        });
    });
    app.put('/api/location/:id', function(req, res) {
        console.log(" updating this id " + req.params.id + " value is " + req.body.isActive);
        locations.findById(req.params.id, function(err, location) {
            location.isActive = req.body.isActive;
            return location.save(function(err) {
                if (!err) {
                    console.log("updated");
                } else {
                    res.send(err);
                }
                return locations.find(function(err, loc) {
                    if (err)
                        res.send(err)
                    res.json(loc);
                });
            });
        });
    });
};