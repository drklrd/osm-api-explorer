import React from 'react';
import ReactDOM from 'react-dom';
import OsmAuth from 'osm-auth';
import AceEditor from 'react-ace';
import xmlJSONParser from './xmljsonparser';
import Header from './header';
import ReactLoading from 'react-loading';

var auth = OsmAuth({
    oauth_consumer_key: 'KR1p7wOfpZgQogD9KvSFIXgFqGvekW4DS6R35938',
    oauth_secret: 'TeDF8MGmnIdAHts0Rmc6kPAvxEfNQo299BhD4Jsa',
    auto: true
});

export default class Main extends React.Component {

    constructor(){
        super();
        this.urlRequest = this.urlRequest.bind(this);
        this.auth = this.auth.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            isAuthenticated : auth.authenticated(),
            editorOut : "",
            editorIn : ""
        };
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
                    console.log('USER')
                    this.setState({
                        isAuthenticated : true,
                        user : res.osm.user['0']['$']
                    });
                }.bind(this))

        }.bind(this));
    }

    urlRequest(){
        this.setState({
            loading : true
        });
        auth.xhr({
            method: this.refs['method'].value,
            path: this.refs['apiUrl'].value
        },function(err,response){
            this.setState({
                editorOut : err ? "There was an error performing the request. Make sure the URL, params and method are as expected" :  new XMLSerializer().serializeToString(response),
                loading : false
            })
        }.bind(this));
    }

    logout(){
        auth.logout();
        this.setState({
            isAuthenticated : false,
            user : undefined
        })
    }

    render(){
        return(
            <div className="container">
                <Header user={this.state.user} handleLogut={this.logout} />
                {this.state.isAuthenticated &&
                    <div>
                        <div className="row">
                            <div className="col-xs-2">
                                <select className="form-control" ref="method">
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                    <option value="DELETE">DELETE</option>
                                </select>
                            </div>
                            <div className="col-xs-2">
                                <select className="form-control" ref="version">
                                    <option value="0.6">0.6</option>
                                </select>
                            </div>
                            <div className="col-xs-6">
                                <input type="text" ref="apiUrl" id="url" className="form-control " placeholder="Type URL here"></input>
                            </div>
                            <div className="col-xs-2">
                                <button className="btn btn-danger" onClick={this.urlRequest} > Go</button>
                            </div>
                        </div>
                        <br/>
                        {!this.state.loading &&
                            <div className="row">
                                <div className="col-xs-6">
                                    <AceEditor ref="editorIn" />
                                </div>
                                <div className="col-xs-6">
                                    <AceEditor ref="editorOut" value={this.state.editorOut} />
                                </div>
                            </div>
                        }
                        {this.state.loading &&
                            <ReactLoading className="loader" type='cubes' color='#95a5a6' height='660px' width='200px' />
                        }


                    </div> }

                {!this.state.isAuthenticated &&
                    <div className="col-xs-offset-2 align-center">
                            <strong> You need to login to OSM for testing </strong>
                            <br/>
                            <button className="btn btn-success" onClick={this.auth}> Login to OSM </button>
                    </div>
                }
            </div>
        );

    }
}

ReactDOM.render(<Main />, document.getElementById('app'));
