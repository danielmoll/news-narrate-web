import React from 'react';
import Videos from './videos';
import Image from './image';

class Interview extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = { expanded: false };
    }

    handleClick() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        var imageUrl = (this.props.data.thumbnail) ? this.props.data.thumbnail : '',
            text = this.props.data.body;

        return <article className="interview">
            <div className="interview__body">
                <Image data={imageUrl} classNames="interview__interviewee" />
                <p className="interview__text">{ text }</p>
            </div>
            <div className="interview__videos">
                <Videos data={ {videos: this.props.data.videos} }></Videos>
            </div>
        </article>
    }
}

export default Interview;
