import React from 'react';
import ForkMe from './fork-me';

const version = "1.0";

export default class Header extends React.Component{
    render(){
        return (
                <div>
                    <ForkMe />
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
                                <span >
                                    #{this.props.user.id} &nbsp;
                                    <a href={`http://www.openstreetmap.org/user/${this.props.user.display_name}`} target="blank" className="no-styling">{this.props.user.display_name}  </a>
                                    <br/>
                                </span>
                                <span className="pointer pull-right" onClick={this.props.handleLogut}>Logout</span>
                            </div>
                        }
                      </div>
                    </nav>
                </div>
        );
    }
}
