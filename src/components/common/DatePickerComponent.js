import React from 'react';
import '../../styles/DatePickerComponent.css';
import DatePicker from "react-datepicker";

class DatePickerComponent extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="date-picker-content">
            <p className="date-picker-title">{this.props.title}</p>
            <DatePicker selected={this.props.date} onChange={date => {this.props.setNewDate(date); this.props.clearEventList()}} />
        </div>
    }
}
export default DatePickerComponent;