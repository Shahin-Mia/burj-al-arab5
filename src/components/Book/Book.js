import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        checkInDate: new Date(),
        checkOutDate: new Date()
    });

    const handleCheckInDate = (date) => {
        const newDate = { ...selectedDate };
        newDate.checkInDate = date;
        setSelectedDate(newDate)
    }
    const handleCheckOutDate = (date) => {
        const newDate = { ...selectedDate };
        newDate.checkOutDate = date;
        setSelectedDate(newDate)
    }

    const handleBooking = () => {
        const newBooking = { ...loggedInUser, ...selectedDate };
        fetch(`http://localhost:4000/addBooking`, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newBooking)
        })
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Hi, {loggedInUser.displayName}! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="check-in-date"
                        value={selectedDate.checkInDate}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        variant="inline"
                        id="date-picker-dialog"
                        label="check-out-date"
                        format="MM/dd/yyyy"
                        value={selectedDate.checkOutDate}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <Button
                variant="contained"
                color="primary"
                onClick={handleBooking}
            >
                Book Now
                </Button>
            <Bookings></Bookings>
        </div>
    );
};


export default Book;