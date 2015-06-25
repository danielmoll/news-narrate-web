import React from 'react';
import _ from 'lodash';

import interviews from '../data/interviews';

class Interviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {interviews: interviews};
    }

    render() {
        var interviews = _.map(this.state.interviews, function (interview) {
            return <Interview data={interview} key={interview.id}/>
        });

        return (
            <div>
                <section className="interviews">{interviews}</section>
            </div>
        )
    }
}

export default Interviews;
