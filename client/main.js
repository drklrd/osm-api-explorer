import React from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/xml';
import 'brace/theme/monokai';
import OSMOauth from './OSMOauth';
import Header from './header';
import ReactLoading from 'react-loading';
import QueryBar from './querybar';
import Axios from 'axios';
import Login from './login';
import XMLJSON from './xmljsonparser';

let auth;
Axios.get('/config')
.then(function(config){
    auth = new OSMOauth(config.data);
    ReactDOM.render(<Main />, document.getElementById('app'));
})

export default class Main extends React.Component {

    constructor(){
        super();
        this.urlRequest = this.urlRequest.bind(this);
        this.logout = this.logout.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.handleInEditorChange = this.handleInEditorChange.bind(this);
        this.toggleJSONXML = this.toggleJSONXML.bind(this);
        this.state = {
            isAuthenticated : auth.authenticated(),
            editorOut : "",
            editorIn : "",
            editorOutputMode : {
                editorIn : 'xml',
                editorOut : 'xml'
            }
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

    toggleJSONXML(editor){
        try{
            if(!(this.state[editor] && this.state[editor].length)) return;
            let outputMode = this.state.editorOutputMode;
            if(this.state.editorOutputMode[editor] === 'xml'){
                let xmltoJson = new XMLJSON(this.state[editor]);
                xmltoJson.toJSON()
                    .then((converted)=>{
                        outputMode[editor] = 'json';
                        this.setState({
                            [editor] : JSON.stringify(converted,null,'\t'),
                            editorOutputMode : outputMode
                        })
                    })
            }else{
                let xmltoJson = new XMLJSON(JSON.parse(this.state[editor]));
                let converted = xmltoJson.toXML();
                outputMode[editor] = 'xml';
                this.setState({
                    [editor] : typeof converted === "string" ? converted :  new XMLSerializer().serializeToString(converted),
                    editorOutputMode : outputMode
                })
            }
        }
        catch(e){
            alert('Make sure the data can not in right format to eb toggled !');
        }
    }

    render(){
        return(
            <div className="editor-background">
                <Header user={this.state.user} handleLogut={this.logout} />
                {this.state.isAuthenticated &&
                    <div>
                        <QueryBar urlRequest={this.urlRequest}/>
                        <br/>
                        {!this.state.loading &&
                            <div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <strong onClick={()=>{this.toggleJSONXML('editorIn')}} className="editor-title">Request XML <span className="suggest-toggle">(Click to toggle between XML and JSON format, whereever applicable)</span> </strong>
                                        <br/>
                                        <AceEditor
                                        theme="monokai" showGutter={true} width="100%" height="75vh"  mode="xml"  onChange={this.handleInEditorChange} value={this.state.editorIn} ref="editorIn" />
                                    </div>
                                    <div className="col-xs-6">
                                        <strong  onClick={()=>{this.toggleJSONXML('editorOut')}} className="editor-title">Response XML/Plain text <span className="suggest-toggle">(Click to toggle between XML and JSON format, whereever applicable)</span> </strong>
                                        <br/>
                                        <AceEditor
                                        theme="monokai"  showGutter={true} width="100%" height="75vh" mode="xml" ref="editorOut" value={this.state.editorOut} />
                                    </div>
                                </div>
                                <br/>
                                <span className="refer" >Refer to OSM API wiki for the available API endpoints, expected attributes and request/response format&nbsp;[
                                    <a className="pointer osm-api-link" href="http://wiki.openstreetmap.org/wiki/API_v0.6" target="blank">http://wiki.openstreetmap.org/wiki/API_v0.6</a>
                                    ]
                                </span>
                                <p/>
                            </div>
                        }
                        {this.state.loading &&
                            <ReactLoading className="loader" type='cubes' color='#95a5a6' height='660px' width='200px' />
                        }
                    </div> }

                {!this.state.isAuthenticated &&
                    <Login authenticate={this.authenticate.bind(this)} />
                }
            </div>
        );

    }
}
