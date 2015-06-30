import React from 'react';

export default React.createClass({

    fullUrl: function () {
        return window.location;
    },
    urlEncoded: function () {
        return encodeURIComponent(this.fullUrl())
    },
    titleEncoded: function () {
        return encodeURIComponent("Sky News: London Bombings 7-7")
    },
    facebookUrl: function () {
        return "https://www.facebook.com/sharer/sharer.php?u=" + this.urlEncoded();
    },
    twitterUrl: function () {
        return "https://twitter.com/intent/tweet?url=" + this.urlEncoded() + ";text=" + this.titleEncoded();
    },
    render: function () {
        return (
            <ul className="share__list">
                <li>
                    <a className="share__social-link skycon--hover" target="_blank" href={this.facebookUrl()}>
                        <i aria-hidden="true" className="skycon skycon--facebook"></i>
                    </a>
                </li>
                <li>
                    <a className="share__social-link skycon--hover" target="_blank" href={this.twitterUrl()}>
                        <i aria-hidden="true" className="skycon skycon--twitter"></i>
                    </a>
                </li>
            </ul>
        );
    }
});


