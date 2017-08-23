import React, { Component } from 'react';

export default class Login extends Component{

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
                <button className="btn btn-success" onClick={this.props.authenticate}> Login to OSM dev server </button>
                <p/>
                <span className="authentication">The authentication will be done via Oauth1.0</span>
            </div>
        );
    }
}
