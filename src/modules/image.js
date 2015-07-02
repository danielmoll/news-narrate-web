import React from 'react';

class Image extends React.Component {

    resizedSource(src) {
        var width = window.innerWidth;
        if (width > 1000) {
            return src.replace('upload/', 'upload/q_80/');
        } else if (width > 800) {
            return src.replace('upload/', 'upload/c_scale,w_800,q_80/');
        } else if (width > 600) {
            return src.replace('upload/', 'upload/c_scale,w_600,q_80/');
        } else {
            return src.replace('upload/', 'upload/c_scale,w_500,q_80/');
        }
    }

    render() {

        var classNames = (this.props.classNames ? ' ' + this.props.classNames : '');
        return (
            <div className={classNames}><img className="image" src={this.resizedSource(this.props.data)}/></div>
        )
    }
}

export default Image;
