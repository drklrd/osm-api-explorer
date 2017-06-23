import React from 'react';
import ReactDOM from 'react-dom';

export default class Main extends React.Component {
    render(){
        return(
            <div>
                <h1>Hello There !</h1>
            </div>
        );

    }
}

ReactDOM.render(<Main />, document.getElementById('app'));
