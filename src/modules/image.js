import React from 'react';

class Image extends React.Component {

    resizedSource(src) {
        var width = window.innerWidth;
        if (width > 1000) {
            return src.replace('upload/', 'upload/q_80/');
        } else if (width > 800) {
            return src.replace('upload/', 'upload/q_80/');
        } else if (width > 600) {
            return src.replace('upload/', 'upload/q_60/');
        } else {
            return src.replace('upload/', 'upload/q_50/');
        }
    }

    render() {

        var classNames = 'image' + (this.props.classNames ? ' ' + this.props.classNames : '');

        return (
            <img className={ classNames } src={this.resizedSource(this.props.data)}/>
        )
    }
}

export default Image;
