"use strict"
var fs = require('fs');
var rp = require('request-promise');

module.exports = async (event, context) => {
    if (event.method !== 'GET') {
        context.fail('Unsupported method');
        return;
    }
    try {
        let result = await login();
        let track = await getTrack(JSON.parse(result), event.path);
        context.succeed(track);
    } catch (err) {
        context.fail(err);
    }
}

const login = () => {
    const client_id = fs.readFileSync('/var/openfaas/secrets/client_id');
    const client_secret = fs.readFileSync('/var/openfaas/secrets/client_secret');
    let buff = new Buffer(client_id + ':' + client_secret);

    const options = {
        method: 'POST',
        uri: 'https://accounts.spotify.com/api/token',
        form: {
            grant_type: 'client_credentials'
        },
        headers: {
            Authorization: 'Basic ' + buff.toString('base64')
        }
    }
    return rp(options);
}

const getTrack = ({access_token}, track_id) => {
    if (track_id.length <= 1) {
        throw "No track id provided";
    }
    const options = {
        method: 'GET',
        uri: 'https://api.spotify.com/v1/tracks' + track_id,
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    }
    return rp(options);
}