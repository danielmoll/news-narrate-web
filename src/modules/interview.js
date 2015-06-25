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
            text = this.props.data.body,
            name = this.props.data.name;

        return  <article className="interview">
                    <Image data={imageUrl} classNames="interview__interviewee" />
                    
                    <div className="interview__body">
                        <blockquote className="interview__text">{text}</blockquote>
                        <div className="interview__name">{name}</div>
                    </div>

                    <div className="interview__button"></div>
                </article>
    }
}

export default Interview;
