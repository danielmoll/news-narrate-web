import React from 'react';
import Interview from './interview';
import interviews from '../data/interviews';
import _ from 'lodash';

class Interviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = { interviews: interviews };
    }

    render() {
        var interviews = [],
            id = this.props.data,
            data = this.state.interviews;

        if (id !== 'all' && data[id]) {
            interviews.push(<Interview data={data[id]} key={id} />)
        } else {
            _.forEach(data, function (interview, key) {
                interviews.push(<Interview data={interview} key={interview.key} />);
            });            
        }

        return (
            <div>
                <section className="interviews">{interviews}</section>
            </div>
        )
    }
}

export default Interviews;
