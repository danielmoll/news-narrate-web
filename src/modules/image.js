import React from 'react';

class Image extends React.Component {
    render() {
    	var classNames = (this.props.classNames ? ' ' + this.props.classNames : '');
        return (
            <div className={classNames}><img className="image" src={this.props.data} /></div>
        )
    }
}

export default Image;
