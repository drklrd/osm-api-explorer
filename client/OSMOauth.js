import OsmAuth from 'osm-auth';
import xmlJSONParser from './xmljsonparser';
import config from '../config';

var auth;

export default class OSMOauth{

    constructor(config){
        auth = OsmAuth(config);
    }

    auth(){
        return new Promise((resolve,reject)=>{
            auth.xhr({
                method: 'GET',
                path: '/api/0.6/user/details'
            }, function(err, details) {
                var xmlText = new XMLSerializer().serializeToString(details);
                var parser = new xmlJSONParser(xmlText);
                parser.toJSON()
                    .then(function(res){
                        resolve(res);
                    })
            });
        })

    }

    request(options){
        return new Promise((resolve,reject)=>{
            auth.xhr({
                method : options.method,
                path : options.path,
                content: options.xml,
                options: {
                    "header": {
                        "Content-Type": "text/xml"
                    }
                }
            },function(err,response){
                if(err) reject(err.responseText || "Error in reqest. Make sure the method, params and URL are as expected !");
                resolve(response);
            });
        })
    }

    authenticated(){
        return auth.authenticated();
    }

    logout(){
        auth.logout();
    }


}
