import React, { Component } from 'react';

export default class Login extends Component{

    constructor(){
        super();
        this.state = {
            purpose : false
        };
        this.showPurpose = this.showPurpose.bind(this);
    }

    showPurpose(){
        this.setState({
            purpose : !this.state.purpose
        })
    }

    render(){
        return(
            <div className="col-xs-offset-1 align-center">
                <h3>
                    <strong>
                         <span>
                             You need to login to OSM
                         </span>
                         <span className="dev-server">
                              dev server
                         </span>
                         <span>
                            for this
                         </span>
                    </strong>
                </h3>
                <span>The account for OSM LIVE server and OSM DEV server are different. You need to have DEV server account in order to use this tool. </span>
                <p/>
                <br/>
                <button className="btn btn-success" onClick={this.props.authenticate}> Login to OSM dev server </button>
                <p/>
                <span className="authentication">The authentication will be done via Oauth1.0</span>
                <p/>
                <div className="purpose">
                    <a onClick={this.showPurpose}>
                        <span className="glyphicon glyphicon-info-sign"></span>
                        <strong> About this tool </strong>
                    </a>
                    {
                        this.state.purpose &&
                        (<div>
                            <span>
                                When we need to develop any OSM related app and use the OSM API endpoints, we need to be sure about the requests and responses format.
                                Also before implementing on the actual app, it is advisable to test it somewhere.
                                This tool will help in testing out the API endpoints more easily on DEV server. This is actually a REST client solely for the OSM API endpoints.
                                This uses DEV server to prevent unnecessary test data/modifications on LIVE server.
                            </span>
                        </div>)
                    }
                </div>
            </div>
        );
    }
}
