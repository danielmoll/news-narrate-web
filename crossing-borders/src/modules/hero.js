import React from 'react';

class Hero extends React.Component {

    constructor(props){
        super(props);

        this.render = this.render.bind(this);
        this._handleResize = this._handleResize.bind(this);
        this.state = {
            showVideo: false
        };
    }

    _handleResize(e) {
        if (window.innerWidth >= 769) {
            if (!this.state.showVideo) {
                this.setState({ showVideo: true});
            }
        } else {
            if (this.state.showVideo) {
                this.setState({ showVideo: false});
            }
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this._handleResize);
        this._handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
    }

    render () {
        var video = '';

        if (this.state.showVideo) {
            video = (<video autoPlay muted loop poster="http://res.cloudinary.com/skynews/image/upload/c_scale,q_70,w_980/v1442501416/migration-crisis/GettyImages-456380920.jpg" className="hero__video">
                        <source src="http://res.cloudinary.com/skynews/video/upload/c_scale,vc_auto,w_980/v1442500439/migration-crisis/MIGRANT_PHOTO_SEQ_V3_CLIPCHAMP_keep.mp4" type="video/mp4"></source>
                    </video>);
        }

        return (<section className="hero">
                { video }
                <div className="hero__content">
                    <h1 className="hero__title">EU Migrant Crisis</h1>
                    <p className="hero__text">In-Depth: Refugee Crisis Explained</p>
                </div>
            </section>)
    }
}

export default Hero;
