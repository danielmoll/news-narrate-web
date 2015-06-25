import React from 'react';

class TimeTab extends React.Component {
    render () {
        var theDate = '';

        if(this.props.data) {
            var date = new Date(this.props.data),
                hours = date.getUTCHours(),
                minutes = date.getUTCMinutes();

            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;


            theDate = hours + '.' + minutes;
        }

        return <div className="scene__time">{theDate}</div>
    }
}

export default TimeTab;