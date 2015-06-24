import React from 'react';
import _ from 'lodash';

class Hero extends React.Component {
    render () {
        return <section className="hero">
            <div className="hero__content">
                <h1>7 / 7 ten years on</h1>
                <p>On July 7 2005, four suicide bmbers attacked central London, killing 52 people and injuring hundreds more.</p>
                <button>Scroll down for full story</button>
            </div>
        </section>
    }
}

export default Hero;