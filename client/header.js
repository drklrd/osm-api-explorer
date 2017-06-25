import React from 'react';

const version = "1.0";

export default class Header extends React.Component{
    render(){
        return (
                <div>
                    <nav className="navbar navbar-inverse">
                      <div className="container-fluid">
                        <div className="navbar-header">
                          <a className="navbar-brand">
                              <span className="title">OSM API Explorer</span>
                              <span className="version-text"> {version} </span>
                          </a>
                        </div>
                        {this.props.user &&
                            <div className="pull-right user-info">
                                <span className="glyphicon glyphicon-user"></span> &nbsp;
                                Logged in as &nbsp;
                                <a className="no-styling" href={`http://www.openstreetmap.org/user/${this.props.user.display_name}`} target="blank">
                                    <span>{this.props.user.display_name}</span>
                                </a>
                            </div>
                        }
                      </div>
                    </nav>
                </div>
        );
    }
}
