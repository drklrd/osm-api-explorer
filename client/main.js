import React from 'react';
import ReactDOM from 'react-dom';
import OsmAuth from 'osm-auth';
import AceEditor from 'react-ace';
import xmlJSONParser from './xmljsonparser';

var auth = OsmAuth({
    oauth_consumer_key: 'KR1p7wOfpZgQogD9KvSFIXgFqGvekW4DS6R35938',
    oauth_secret: 'TeDF8MGmnIdAHts0Rmc6kPAvxEfNQo299BhD4Jsa',
    auto: true
});



export default class Main extends React.Component {

    constructor(){
        super();
        this.state = {
            isAuthenticated : auth.authenticated()
        }
    }

    componentDidMount(){
        if(this.state.isAuthenticated){
            this.auth();
        }
    }

    auth(){
        auth.xhr({
            method: 'GET',
            path: '/api/0.6/user/details'
        }, function(err, details) {
            var xmlText = new XMLSerializer().serializeToString(details);
            var parser = new xmlJSONParser(xmlText);
            parser.toJSON()
                .then(function(res){
                    console.log('$$$',res);
                })
            if(!this.state.isAuthenticated){
                this.setState({
                    isAuthenticated : true
                })
            }
        }.bind(this));
    }

    render(){


        return(
            <div className="container">
                <div className="row">
                    <h1>OSM API Explorer </h1>
                </div>
                {this.state.isAuthenticated &&
                    <div>
                        <div className="row">
                            <div className="col-xs-12">
                                <input placeholder="Type URL here"></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">
                                <AceEditor />
                            </div>
                            <div className="col-xs-6">
                                <AceEditor />
                            </div>
                        </div>
                    </div> }

                {!this.state.isAuthenticated &&
                    <div>
                        <h3> You need to login to OSM to perform API requests </h3>
                        <button className="btn btn-success" onClick={this.auth}> Auth </button>
                    </div>
                }


            </div>
        );

    }
}

ReactDOM.render(<Main />, document.getElementById('app'));
