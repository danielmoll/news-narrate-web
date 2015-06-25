import React from 'react';
import _ from 'lodash';

import Videos from './videos';

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
        return <article className="cf scene scene--timeline">
            <div className={ contentClassString }>
                { image }
                { text }
                { name }
            </div>

            <Videos></Videos>
        </article>
    }
}

export default Interview;
