var Beacon = require('../../../models/beacon');
var express = require('express')
var router = express.Router()

router.get('/', function(req, resp) {
    console.log("getting beacons");
    Beacon.getAllBeacons(function (err, beacons) {
        if (err) {
            console.log(err);
            resp.send("could not retrieved beacons");
        } else {
            resp.send(beacons);
        }
    });
});
router.post('/', function(req, resp) {
    var body = req.body;
    console.log(body);
    var beacon = new Beacon.beaconModel({
        userId: body.userId,
        internalName: body.beaconName,
        internalId: body.beaconId,
        dateOrdered: Date.now()
    });

    if (Beacon.isValid(beacon)) {
        Beacon.save(beacon, function(err) {
            if (err) {
                console.log(err);
                resp.send("could not save beacon");
            } else {
                resp.send(beacon);
            }
        });
    } else {
        resp.send("parameters not valid");
    }
});

router.get('/:beacon_id', function(req, resp) {
    Beacon.getBeacon(req.params.beacon_id, function(err, beacon) {
        if (err) {
            console.log(err);
            resp.send("could not retrieved")
        } else {
            resp.send(beacon);
        }
    });
})

router.delete('/:beacon_id', function(req, resp) {
    var id = req.params.beacon_id;
    if (!id) {
        resp.send("need paramter beacon_id");
        return;
    }
    Beacon.delete(id, function(err, beacon) {
       if (err) {
           console.log(err);
           resp.send(id + " could not be deleted");
       }  else {
           resp.send(beacon);
       }
    });
});



module.exports = router;