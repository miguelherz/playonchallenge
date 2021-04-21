import React from 'react';
import '../styles/Home.css';
import EventCard from './common/EventCard';
import {Dropdown} from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePickerComponent from './common/DatePickerComponent';
import {NextDay, FormatDate} from '../util/DateAndTimeUtil'
import {ASSOCIATION_KEYS, STATE_ASSOCIATION_DROPDOWN_OPTIONS} from '../constants/StateAssociationConstants'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {responsive} from '../constants/ResponsiveConstants'

const apiUrl = (stateAssociationKey, startDate, endDate) => 'https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=' + stateAssociationKey + '&amp;card=true&amp;size=50&amp;start=0&from=' + startDate + 'T00:00:00.000Z&to=' + endDate + 'T23:00:00.000Z';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            stateAssociationKey: ASSOCIATION_KEYS.GSHA,
            startDate: new Date(),
            endDate: NextDay(),
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this._fetchEvents()
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.stateAssociationKey !== this.state.stateAssociationKey ||
            prevState.startDate !== this.state.startDate ||
            prevState.endDate !== this.state.endDate) {
            this._fetchEvents()
        }
        if (prevState.width !== this.state.width) {
            this.updateWindowDimensions();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions.bind(this));
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    _fetchEvents = () => {
        fetch(apiUrl(this.state.stateAssociationKey, FormatDate(this.state.startDate), FormatDate(this.state.endDate)))
            .then((response) => response.json())
            .then((data) => {
                const items = data.items;
                items.forEach(item => {
                    this.setState({events: [...this.state.events, item.publishers[0].broadcasts[0]]})
                });
            });
    }

    _onSelect = (newValue) => {
        this.setState({events: [], stateAssociationKey: ASSOCIATION_KEYS[newValue.value]})
    }

    _clearEvents = () => {
        this.setState({events: []})
    }

    _renderEventCards = () => {
        return this.state.events.map(event =>
            <EventCard
                key={event.key}
                eventKey={event.key}
                eventHeadline={event.headline}
                eventSubHeadline={event.subheadline}
                eventStartTime={event.start_time}
                background={event.default_thumbnail}
            />
        )
    }

    _renderEventsFilter = () => {
        return <div className="events-filter-content">
            <div className="events-state-association-dropdown-content">
                <p className="events-state-association-dropdown-title">State Association:</p>
                <Dropdown
                    placeholder="Select an option"
                    className="events-dropdown"
                    options={STATE_ASSOCIATION_DROPDOWN_OPTIONS}
                    value={STATE_ASSOCIATION_DROPDOWN_OPTIONS[0]}
                    onSelect={(value) => this._onSelect(value)}
                />
            </div>
            <DatePickerComponent title='Start Date:' date={this.state.startDate} clearEventList={() => this._clearEvents()} setNewDate={(date) => this.setState({startDate: date})} />
            <DatePickerComponent title='End Date:' date={this.state.endDate} clearEventList={() => this._clearEvents()} setNewDate={(date) => this.setState({endDate: date})} />
        </div>
    }

    render() {
        return <div className="main">
            <section className="events-filter">
                {this._renderEventsFilter()}
            </section>
            <section className="events-carrousel">
                {this.state.width < 510 ? this._renderEventCards() : <Carousel responsive={responsive} containerClass="carousel-container">
                    {this._renderEventCards()}
                </Carousel>}
            </section>
        </div>
    }
}
export default Home;