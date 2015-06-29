import React from 'react';
import Interview from './interview';
import _ from 'lodash';

class Interviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {interviews: []};
    }

    render() {
        var propInterviews = (this.props.data && this.props.data.interviews) || [],
            interviews = [],
            that = this;

        _.forEach(propInterviews, function (interview, id) {
            interviews.push(<Interview data={ {interview: interview, globalData: that.props.data} } key={id}/>);
        });

        return (
            <div>
                <section className="interviews">{interviews}</section>
            </div>
        )
    }
}

export default Interviews;
