import React from 'react';
import Interview from './interview';
import _ from 'lodash';

class Interviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = { interviews: [] };
    }

    render() {
        var propInterviews = (this.props.data && this.props.data.interviews) || [],
            interviews = [],
            id = this.props.id;

        if (id !== 'all' && propInterviews[id]) {
            interviews.push(<Interview data={ {interview: propInterviews[id], globalData: this.props.data} } key={id} />)
        } else {
            _.forEach(propInterviews, function (interview, key) {
                interviews.push(<Interview data={ {interview: interview, globalData: this.props.data} } key={ interview.id }/>);
            }.bind(this));
        }

        return (
            <div>
                <section className="interviews">{interviews}</section>
            </div>
        )
    }
}

export default Interviews;
