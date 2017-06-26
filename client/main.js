import React from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/xml';
import OSMOauth from './OSMOauth';
import Header from './header';
import ReactLoading from 'react-loading';
import QueryBar from './querybar';

var auth = new OSMOauth();

export default class Main extends React.Component {

    constructor(){
        super();
        this.urlRequest = this.urlRequest.bind(this);
        this.logout = this.logout.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.handleInEditorChange = this.handleInEditorChange.bind(this);
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
                user : user.osm.user['0']['$'],
                isAuthenticated : true
            })
        }.bind(this));
    }

    urlRequest(options){
        if(this.state['editorIn']) options.xml = this.state['editorIn'];
        this.setState({
            loading : true
        });
        auth.request(options)
        .then((response)=>{
            this.setState({
                editorOut : typeof response === "string" ? response :  new XMLSerializer().serializeToString(response),
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

    handleInEditorChange(value){
        this.setState({
            editorIn : value
        })
    }

    render(){
        return(
            <div className="container editor-background">
                <Header user={this.state.user} handleLogut={this.logout} />
                {this.state.isAuthenticated &&
                    <div>
                        <QueryBar urlRequest={this.urlRequest}/>
                        <br/>
                        {!this.state.loading &&
                            <div className="row">
                                <div className="col-xs-6">
                                    <strong className="editor-title">Request XML </strong>
                                    <br/>
                                    <AceEditor mode="xml"  onChange={this.handleInEditorChange} value={this.state.editorIn} ref="editorIn" />
                                </div>
                                <div className="col-xs-6">
                                    <strong  className="editor-title">Response XML(or plain text) </strong>
                                    <br/>
                                    <AceEditor mode="xml" ref="editorOut" value={this.state.editorOut} />
                                </div>
                            </div>
                        }
                        {this.state.loading &&
                            <ReactLoading className="loader" type='cubes' color='#95a5a6' height='660px' width='200px' />
                        }
                    </div> }

                {!this.state.isAuthenticated &&
                    <div className="col-xs-offset-1 align-center">
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
