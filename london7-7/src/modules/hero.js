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
            video = (<video autoPlay muted loop poster="/build/img/heroBg.jpg" className="hero__video">
                        <source src="http://e0.365dm.com/sky-news-narrate/london-bombing-7-7/landingpage-bg_e0klcl.mp4" type="video/mp4"></source>
                    </video>);
        }

        return (<section className="hero">
                { video }
                <div className="hero__content">
                    <h1 className="hero__title">7 / 7 ten years on</h1>
                    <p className="hero__text">On 7 July, 2005, four suicide bombers attacked London killing 52 people. Watch the survivors’ stories and see how the day unfolded.</p>
                </div>
            </section>)
    }
}

export default Hero;
