import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import BookingAPI from '../api/bookingAPI';

function BookingData({ data }) {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>{`Booking for ${data.firstname} ${data.lastname}`}</Accordion.Header>
                <Accordion.Body>
                    <p>First Name: {data.firstname}</p>
                    <p>Last Name: {data.lastname}</p>
                    <p>Total Price: {data.totalprice}</p>
                    <p>Deposit Paid: {data.depositpaid ? "Yes" : "No"}</p>
                    <p>Check-in: {data.bookingdates.checkin}</p>
                    <p>Check-out: {data.bookingdates.checkout}</p>
                    <p>Additional Needs: {data.additionalneeds}</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [bookingData, setBookingData] = useState([]);
    const itemsPerPage = 20;

    // Função para carregar a lista de IDs dos bookings
    useEffect(() => {
        async function fetchBookingIds() {
            console.log("Fetching booking IDs...");
            const bookingIds = await BookingAPI.getBookingsIds();
            console.log("Fetched booking IDs:", bookingIds);
            setBookings(bookingIds);
        }
        fetchBookingIds();
    }, []);

    // Função para buscar dados do booking por ID
    const fetchBookingData = async (id) => {
        console.log(`Fetching data for booking ID: ${id}`);
        const data = await BookingAPI.getBookings(id);
        console.log(`Data for booking ID ${id}:`, data);
        return data;
    };

    // Atualiza os dados da página atual sempre que a página ou os bookings mudam
    useEffect(() => {
        async function fetchCurrentBookings() {
            const startIdx = currentPage * itemsPerPage;
            const currentBookings = bookings.slice(startIdx, startIdx + itemsPerPage);
            console.log(`Current page: ${currentPage}, Start index: ${startIdx}`);
            console.log("Current bookings (IDs):", currentBookings);
            
            const data = await Promise.all(currentBookings.map(id => fetchBookingData(id)));
            console.log("Booking data for current page:", data);
            setBookingData(data);
        }
        
        if (bookings.length > 0) {
            fetchCurrentBookings();
        }
    }, [currentPage, bookings]);

    // Funções de navegação
    const nextPage = () => {
        console.log("Going to next page");
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        console.log("Going to previous page");
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    return (
        <div>
            {bookingData.map((data, index) => (
                <BookingData key={index} data={data} />
            ))}

            <div>
                <button onClick={prevPage} disabled={currentPage === 0}>
                    Under
                </button>
                <button onClick={nextPage} disabled={(currentPage + 1) * itemsPerPage >= bookings.length}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default BookingList;
