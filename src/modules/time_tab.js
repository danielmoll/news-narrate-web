import React from 'react';

class TimeTab extends React.Component {
    render () {
        var theDate = '';

        if(this.props.data) {
            var date = new Date(this.props.data),
                hours = date.getHours(),
                minutes = date.getMinutes();

            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;


            theDate = hours + '.' + minutes;
        }

        return <div className="card__time">{theDate}</div>
    }
}

export default TimeTab;