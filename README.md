[![OpenFaaS](https://img.shields.io/badge/openfaas-cloud-blue.svg)](https://www.openfaas.com)

# OpenFaaS Cloud Functions
 
This repository is for my functions hosted on the OpenFaaS Cloud Community Cluster. Find out more [here](https://github.com/openfaas/openfaas-cloud).

## Spotify
This function follows the [client credentials flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow) to query the [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

### How to use
Use the [Spotify Web API reference](https://developer.spotify.com/documentation/web-api/reference/) to extend the function path with required path parameters and/or query arguments.

For example:

To get information about a track
```bash
$ curl https://kturcios.o6s.io/spotify/tracks/{id}
```
or get the top tracks for an artist
```bash
$ curl https://kturcios.o6s.io/spotify/artists/{id}/top-tracks?country=US
```

My personal favorite is retrieving the audio features of a song to get features like the "danceability" or "energy" of a song. Check out the results for Stayin' Alive by the Bee Gees!
```bash
curl https://kturcios.o6s.io/spotify/audio-features/3mRM4NM8iO7UBqrSigCQFH
```
```json
{
  "danceability" : 0.703,
  "energy" : 0.826,
  "key" : 10,
  "loudness" : -7.179,
  "mode" : 0,
  "speechiness" : 0.0341,
  "acousticness" : 0.0322,
  "instrumentalness" : 0.00629,
  "liveness" : 0.179,
  "valence" : 0.945,
  "tempo" : 103.564,
  "type" : "audio_features",
  "id" : "3mRM4NM8iO7UBqrSigCQFH",
  "uri" : "spotify:track:3mRM4NM8iO7UBqrSigCQFH",
  "track_href" : "https://api.spotify.com/v1/tracks/3mRM4NM8iO7UBqrSigCQFH",
  "analysis_url" : "https://api.spotify.com/v1/audio-analysis/3mRM4NM8iO7UBqrSigCQFH",
  "duration_ms" : 285373,
  "time_signature" : 4
}
```

## Node Microservice
This is an example for running a microservice workload. It follows the common workload properties:
- serve HTTP traffic on TCP port 8080
- create a lock file in /tmp/.lock - removing this file signals service degradation
- assume ephemeral storage

Read more about OpenFaaS workloads [here](https://docs.openfaas.com/reference/workloads/)