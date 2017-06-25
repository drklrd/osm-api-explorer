import React from 'react';

export default class QueryBar extends React.Component{

    constructor(){
        super();
        this.urlRequest = this.urlRequest.bind(this);
    }

    urlRequest(e){
        e.preventDefault();
        this.props.urlRequest({method:this.refs['method'].value,path:this.refs['apiUrl'].value});
    }

    render(){
        return(
            <form onSubmit={this.urlRequest}>
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
                        <input spellCheck="false" type="text" ref="apiUrl" id="url" className="form-control " placeholder="Type URL here"></input>
                    </div>
                    <div className="col-xs-2">
                        <button type="submit" className="btn btn-danger"  > Go</button>
                    </div>
                </div>

            </form>

        );
    }
}
