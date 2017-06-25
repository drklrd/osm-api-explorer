import xml2js from 'xml2js';

export default class xmlJSONParser{

    constructor(stub) {
        this.xmlStringParser = xml2js.parseString;
        this.stub = stub;
    }

    toJSON() {
        return new Promise(function (resolve, reject){
            
            this.xmlStringParser(this.stub, function(err, result) {
                if (err) reject(err);
                resolve(result);
            })
        }.bind(this))
    }

    toXML() {
        var builder = new xml2js.Builder();
        return builder.buildObject(this.stub);
    }
}
