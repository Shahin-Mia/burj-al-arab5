import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [booking, setBooking] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        fetch(`http://localhost:4000/bookings?email=${loggedInUser.email}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setBooking(data));
    }, [])

    return (
        <div>
            <h3>Users Total Bookings: {booking.length}</h3>
            {
                booking.map(item => <li>{item.displayName} from: {item.checkInDate} to: {item.checkOutDate}</li>)
            }
        </div>
    );
};

export default Bookings;