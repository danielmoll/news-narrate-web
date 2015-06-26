import React from 'react';
import Videos from './videos';
import Image from './image';
import locations from '../data/locations';

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
        var imageUrl = (this.props.data.thumbnail) ? this.props.data.thumbnail : false,
            image,
            text = this.props.data.body,
            name = this.props.data.name,
            location = locations[this.props.data.location].locationName;

        if (imageUrl) {
            image = <Image data={imageUrl} classNames="interview__interviewee" />
        }

        return  <article className="interview">
                    {image}

                    <div className="interview__body">
                        <blockquote className="interview__text">{text}</blockquote>
                        <div className="interview__name">{name}</div>
                        <div className="interview__location">{location}</div>
                    </div>

                    <div className="interview__button"></div>
                </article>
    }
}

export default Interview;
