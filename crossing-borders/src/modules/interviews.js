import React from 'react';
import Interview from './interview';
import _ from 'lodash';
import DocumentMeta from 'react-document-meta';

class Interviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interviews: [],
            title: "July 7 bombings - Timeline and key interviews"
        };
    }

    render() {

        var propInterviews = (this.props.data && this.props.data.interviews) || [],
            interviews = [],
            interviewsToSort = {},
            id = this.props.id,
            newDocTitle,
            ogImage;

        if (id !== 'all' && propInterviews[id]) {
            newDocTitle = 'July 7 bombings - Sky News speaks to ' + propInterviews[id].name;
            ogImage = propInterviews[id].thumbnail;
            interviews.push(<Interview data={ {interview: propInterviews[id], globalData: this.props.data, expanded: true} } key={ 'interview_' + id} />)

        } else {
            _.forEach(propInterviews, function (interview, key) {
                if (interview) {
                    interview.id = key;
                    interviewsToSort[key] = interview;
                }
            });

            _.forEach(_.sortBy(interviewsToSort, 'order'), function (interview, key) {
                if (interview) {
                    interviews.push(<Interview data={ {interview: interview, globalData: this.props.data} } key={ 'interview_' + key }/>);
                }
            }.bind(this));

        }

        const metaData = {
            title: newDocTitle || this.state.title,
            meta: {
                'og:image': ogImage || '',
                'og:title': newDocTitle || this.state.title
            },
            extend: true
        };
        return (
            <div>
                <DocumentMeta {...metaData} />
                <section className="interviews" key="interviews">{interviews}</section>
            </div>
        )
    }
}

export default Interviews;
