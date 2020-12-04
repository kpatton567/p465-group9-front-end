import React from 'react';
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import axios from "axios";
import { apiVariables } from '../../APIConstants';
import moment from "moment";

mobiscroll.settings = {
    lang: '',
    theme: 'ios',
    themeVariant: 'dark'
};

const now = new Date();
const currYear = now.getFullYear();
const currMonth = now.getMonth();
const currDay = now.getDate();
const min = new Date(currYear, currMonth, currDay);
const max = new Date(currYear, currMonth + 6, currDay);
let firstload = true;


export default class CalendarDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            colors: [],
            labels: [],
            invalid: [],
            valid: [],
            showtimes: []
        };
        
    }
    convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      }
    onPageLoadingSingle = (event, inst) => {
        this.getPrices(event.firstDay, function callback(bookings) {
            inst.settings.labels = bookings.labels
            inst.settings.invalid = bookings.invalid;
            inst.redraw();
        });
    }
    
    onPageLoadingMultiple = (event, inst) => {
        this.getBookings(event.firstDay, function callback(bookings) {
            inst.settings.labels = bookings.labels
            inst.settings.invalid = bookings.invalid;
            inst.redraw();
        });
    }
    
    getPrices = (d, callback) => {
        var invalid = [],
            labels = [];

           
            console.log(moment('2019-11-03T05:00:00.000Z').utc()._d)
                
            axios({
                "method": "POST",
                "url": apiVariables.apiUrl + '/api/home/movie_theater_showtimes?theaterId=1' + '&movieId=1' ,
                "crossdomain": "true"
            }) .then((response) => {  
                var bookings = response.data.showtimes;        
                for (var i = 0; i < bookings.length; ++i) {
                    var booking = bookings[i],
                        d = moment('2020-12-03T05:00:00.000Z').utc()._d
                        console.log(booking.date)
                        // d = new Date(booking.date);
                    if (booking.price > 0) {
                        labels.push({
                            d: d,
                            text: '$' + booking.price,
                            background: 'none',
                            color: '#e1528f'
                        });
                    } else {
                        invalid.push(d);
                    }
                }
                callback({ labels: labels, invalid: invalid });
            }, 'jsonp');
    }
    
    getBookings = (d, callback) => {
        var invalid = [],
            labels = [];

        mobiscroll.util.getJson('https://trial.mobiscroll.com/getbookings/?year=' + d.getFullYear() + '&month=' + d.getMonth(), (bookings) => {
            for (var i = 0; i < bookings.length; ++i) {
                var booking = bookings[i],
                    d = new Date(booking.d);

                if (booking.nr > 0) {
                    labels.push({
                        d: d,
                        text: booking.nr + ' SPOTS',
                        background: 'none',
                        color: '#e1528f'
                    });
                } else {
                    invalid.push(d);
                }
            }
            callback({ labels: labels, invalid: invalid });
        }, 'jsonp');
    }
    
    onInit = (event, inst) => {
        if (firstload) {
            mobiscroll.util.getJson('https://trial.mobiscroll.com/getrecbookings/', (times) => {
                // We are loading the available spots from a remote API. The data needs to be parsed and days need to be disabled.
                // In addition to that we'll have to display the number of available spots in lables plus update the time picker to only allow the valid selections.
                // The approach is to invalidate all times and override (make them valid) if that time slot is available for booking. (Think basketball court for two hours)
                var labels = [],
                    invalid = [],
                    valid = [];

                for (var i = 0; i < times.length; ++i) {
                    var time = times[i];
                    // set all times to invalid
                    invalid = invalid.concat({ d: 'w' + i, start: '00:00', end: '23:59' })

                    for (var j = 0; j < time.length; ++j) {
                        var t = time[j];
                        // override invalid values with valids
                        valid = valid.concat({ d: 'w' + i, start: t, end: t })
                    }

                    if (time.length === 0) {
                        // set day to invalid if there is no selectable time on that day
                        invalid = invalid.concat('w' + [i]);
                    } else {
                        // add the number of selectable times to labels
                        labels = labels.concat({ d: 'w' + i, text: time.length + ' SPOTS', background: 'none', color: '#e1528f' });
                    }
                }
                
                firstload = false;
                
                this.setState({
                    labels: labels,
                    invalid: invalid,
                    valid: valid
                });
            }, 'jsonp');
        }
    }
    
     onDayChange = (event, inst) => {
         this.setState({ colors:  [{ d: 'w' + event.date.getDay(), background: '#e1528f' }] });
    }

    render() {
        return (
            <mobiscroll.Form className="dms-calendar-booking">
                <mobiscroll.FormGroup>
                    <mobiscroll.FormGroupTitle>Single date & appointment booking</mobiscroll.FormGroupTitle>
                    <mobiscroll.Calendar 
                        display="inline"
                        type="hidden"
                        controls={['calendar', 'time']}
                        min={min}
                        max={max}
                        yearChange={false}
                        responsive={{
                            small: {
                                months: 1
                            },
                            large: {
                                months: 2
                            }
                        }}
                        onPageLoading={this.onPageLoadingSingle}
                    />
                </mobiscroll.FormGroup>
            </mobiscroll.Form>
        );
    }    
}
