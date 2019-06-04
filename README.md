[![OpenFaaS](https://img.shields.io/badge/openfaas-cloud-blue.svg)](https://www.openfaas.com)

# OpenFaaS Cloud Functions
 
This repository is for my functions hosted on the OpenFaaS Cloud Community Cluster. Find out more [here](https://github.com/openfaas/openfaas-cloud).

## Spotify
This function will query the [Spotify Web API](https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/) to retrieve data about a track.

### To use
Provide a track id to retrieve information about it.

Read about how to get the track id [here](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
```bash
$ curl https://kturcios.o6s.io/spotify/{track_id}
```
For example:
```bash
$ curl https://kturcios.o6s.io/spotify/6DCZcSspjsKoFjzjrWoCdn
```

## Node Microservice
This is an example for running a microservice workload. It follows the common workload properties:
- serve HTTP traffic on TCP port 8080
- create a lock file in /tmp/.lock - removing this file signals service degradation
- assume ephemeral storage

Read more about OpenFaaS workloads [here](https://docs.openfaas.com/reference/workloads/)