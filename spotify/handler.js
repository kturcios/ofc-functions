"use strict"
const fs = require('fs');
const queryString = require('query-string');
const rp = require('request-promise');

const spotifyAuthUrl = 'https://accounts.spotify.com/api/token';
const spotifyApiUrl = 'https://api.spotify.com/v1';

module.exports = async ({ method, path, query }, context) => {
    if (method !== 'GET') {
        context.fail('Unsupported method');
        return;
    }
    try {
        let result = await login();
        let spotifyResponse = await querySpotify(JSON.parse(result), path, query);
        context.succeed(spotifyResponse);
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
        uri: spotifyAuthUrl,
        form: {
            grant_type: 'client_credentials'
        },
        headers: {
            Authorization: 'Basic ' + buff.toString('base64')
        }
    }
    return rp(options);
}

const querySpotify = ({ access_token }, path, query) => {
    if (path.length <= 1) {
        throw "No path provided";
    }
    const options = {
        method: 'GET',
        uri: spotifyApiUrl + path + '?' + queryString.stringify(query),
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    }
    return rp(options);
}
