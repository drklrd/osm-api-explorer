# OSM API Explorer

This is a simple tool to explore OSM API. This uses osm-auth (https://github.com/osmlab/osm-auth) for OSM authentication. The editor used is the Ace-editor(https://ace.c9.io/).

# LIVE Demo

View the demo at : http://osm-api-explorer.herokuapp.com/

![Explorer Image](https://raw.githubusercontent.com/drklrd/osm-api-explorer/master/osm-api-explorer.png)

### Installation
```sh
    $ npm install
    $ cp sample-config.js config.js
```
and modify config.js according your OSM app details (DEV server)

```sh
    $ npm run development (in one terminal)
    $ node server.js (in another terminal)
```
'npm run development' in one terminal to start the client side bundling and 'node server.js' in another terminal to start the node server.
