import React from 'react';
import Interview from './interview';
import interviews from '../data/interviews';
import _ from 'lodash';

class Interviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {interviews: interviews};
    }

    render() {
        var interviews = [];

        _.forEach(this.state.interviews, function (interview, id) {
            interviews.push(<Interview data={interview} key={id}/>);
        });

        return (
            <div>
                <section className="interviews">{interviews}</section>
            </div>
        )
    }
}

export default Interviews;
