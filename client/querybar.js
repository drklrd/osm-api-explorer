import React from 'react';

export default class QueryBar extends React.Component{

    constructor(){
        super();
        this.urlRequest = this.urlRequest.bind(this);
    }

    urlRequest(e){
        e.preventDefault();
        this.props.urlRequest({method:this.refs['method'].value,path:this.refs['apiUrl'].value,server:this.refs['server'].value});
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
                        <select className="form-control" ref="server">
                            <option value="live">Live Server</option>
                            <option value="dev">Dev Server</option>
                        </select>
                    </div>
                    <div className="col-xs-6">
                        <input autoComplete="false"  spellCheck="false" type="text" ref="apiUrl" id="url" className="form-control " placeholder="Type URL here"></input>
                    </div>
                    <div className="col-xs-2">
                        <button type="submit" className="btn btn-danger"  > Go</button>
                    </div>
                </div>

            </form>

        );
    }
}
