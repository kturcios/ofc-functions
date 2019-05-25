"use strict"
var fs = require('fs');

const client_id = fs.readFileSync('/var/openfaas/secrets/client_id', 'utf8');
const redirect_uri = 'https://kturcios.o6s.io/spotify/authorized';

module.exports = (event, context) => {
    let scopes = 'user-read-private user-read-email';
    
    if (event.path == '/authorized') {
        context.succeed('User authorized: ' + event.query);
    } else {
        const spotifyAuthUrl = 'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' + client_id +
            (scopes ? ' &scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' + encodeURIComponent(redirect_uri);

        context
            .headers({'Location': spotifyAuthUrl})
            .status(307) // Temporary
            .succeed('Authorizing...')
    }
}


    
