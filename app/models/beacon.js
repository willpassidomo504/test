var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beaconSchema = new Schema({
    userId: String,
    internalName: String,
    internalId: String,
    batteryLife: Number,
    dateOrdered: Date
});

var beaconModel = mongoose.model('Beacon', beaconSchema);

module.exports = {
    beaconModel: beaconModel,
    isValid: function(beacon) {
        var isValid = beacon.userId != null && beacon.userId.length > 0 && beacon.internalName != null && beacon.internalName.length > 0;
        if (isValid) {
            console.log("yes,it is valid");
        }
        return isValid;
    },
    getAllBeacons: function(cb) {
        beaconModel.find({}, cb);
    },
    getBeacons: function(userId, cb) {
        beaconModel.find({userId: new RegExp(userId, 'i')}, cb);
    },
    save: function(beacon, cb){
        beacon.save(beacon, cb);
    },
    delete: function (beaconId, cb) {
        beaconModel.find({_id: beaconId}).remove(cb);
    }

}

