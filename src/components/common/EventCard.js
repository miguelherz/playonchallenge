import React from 'react';
import '../../styles/EventCard.css';
import dateFormat from 'dateformat';

class EventCard extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="card-content">
            <div style={{backgroundImage: `url(${this.props.background})`, backgroundSize: 'cover'}}>
                <div className="event-card-header">
                    <p className="event-headline">{this.props.eventHeadline}</p>
                    <p className="event-subheadline">{this.props.eventSubHeadline}</p>
                    <p className="event-key">{this.props.eventKey}</p>
                </div>
            </div>
            <div className="event-card-bottom">
                <p className="event-start-time">{dateFormat(this.props.eventStartTime, " mmm d, yyyy | UTC:h:MM TT Z")}</p>
            </div>
        </div>
    }
}
export default EventCard;