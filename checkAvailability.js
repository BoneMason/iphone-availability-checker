var request = require('request-promise'),
    push = require( 'pushover-notifications' ),
    _ = require('lodash');

var count = 0,
    skus = ['MKTQ2LL/A', 'MKTV2LL/A', 'MKW92LL/A', 'MKWF2LL/A'],
    models = ['64 att', '128 att', '64 sim-free', '128 sim-free']
    stores = ['R074', 'R214', 'R127', '', '', ''],
    pushover_user = '',   // pushover user key
    pushover_token = '';  // pushover application token


function getJson(url) {
    var options = {
        uri: url,
        json: true
    };

    return request(options);
}

function getStores() {
    var storesUrl = 'https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/stores.json';
    return getJson(storesUrl);
}

function getAvailability() {
    var availabilityUrl = 'https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/availability.json';
    return getJson(availabilityUrl);
}

function checkAvailability(storesArray) {
    getAvailability().then(function(availability) {
        result = [];

        stores.forEach(function(storeNumber) {
            skus.forEach(function(sku, i) {
                if (typeof availability[storeNumber] !== 'undefined' && availability[storeNumber][sku] !== 'NONE') {
                    store = _.find(storesArray, 'storeNumber', storeNumber);
                    result.push(models[i] + ' @ ' + store.storeName);
                }
            });
        });

        printAvailability(result);
    });
}

function printAvailability(availability) {
    var suffix = " Time: %s; Count: %d"
    var msg = "Sorry, no iPhones yet.";

    if (availability.length) {
        msg = "iPhone is available! (" + availability.join(", ") + ")";
	if (pushover_user.length) {
	        sendPushoverNotification(msg);
	}
    }

    console.log(msg + suffix, new Date().toLocaleTimeString(), count);
}

function sendPushoverNotification(message) {
    var p = new push( {
        user: pushover_user,
        token: pushover_token
    });

    var msg = {
        message: message,
        sound: 'magic',
        priority: 1,
        url: 'https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/availability?returnURL=http%3A%2F%2Fwww.apple.com%2Fshop%2Fbuy-iphone%2Fiphone6&channel=1&iPP=Y'
    };

    p.send( msg, function( err, result ) {
        if ( err ) {
            throw err;
        }
        console.log('Pushover result: ' + result);
    });
}

function check6sPlusAvailability() {
    count++;
    getStores().then(function(stores) {
        checkAvailability(stores.stores);
    });
}

check6sPlusAvailability();
var interval = setInterval(check6sPlusAvailability, 10 * 60 * 1000);
