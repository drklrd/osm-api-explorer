import React from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import OSMOauth from './OSMOauth';
import Header from './header';
import ReactLoading from 'react-loading';

var auth = new OSMOauth();

export default class Main extends React.Component {
    constructor(){
        super();
        this.urlRequest = this.urlRequest.bind(this);
        this.logout = this.logout.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.state = {
            isAuthenticated : auth.authenticated(),
            editorOut : "",
            editorIn : ""
        };
    }

    componentDidMount(){
        if(this.state.isAuthenticated){
            auth.auth()
            .then(function(response){
                this.setState({
                    isAuthenticated : true,
                    user : response.osm.user['0']['$']
                });
            }.bind(this))
        }
    }

    authenticate(){
        auth.auth()
        .then(function(user){
            this.setState({
                user : user.osm.user['0']['$']
            })
        }.bind(this));
    }

    urlRequest(){
        this.setState({
            loading : true
        });
        auth.request({method:this.refs['method'].value,path:this.refs['apiUrl'].value})
        .then((response)=>{
            this.setState({
                editorOut : new XMLSerializer().serializeToString(response),
                loading : false
            });
        })
        .catch((err)=>{
            this.setState({
                editorOut : JSON.stringify(err),
                loading : false
            })
        });

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
                        <button className="btn btn-success" onClick={this.authenticate}> Login to OSM </button>
                    </div>
                }
            </div>
        );

    }
}

ReactDOM.render(<Main />, document.getElementById('app'));
