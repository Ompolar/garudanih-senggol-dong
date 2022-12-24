import './user.css';
import moment from "moment";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function ResultFilter() {
    const [showTicket, setShowTicket] = useState(null)

    const { filteredTicketResult, filteredTicketLoading, filteredTicketError } = useSelector((state) => state.TicketReducer)

    useEffect(() => {
        setShowTicket(filteredTicketResult)
    }, [filteredTicketResult])
    
    return (
        <>
            {showTicket ? (
                <>
                    <b>Hasil pencarian tiket</b>
                    {filteredTicketResult.map((ticket) => {
                        return (
                            <Card className="mt-3 card--result">
                                <Card.Body>
                                    <p className="text--side--price">Rp{ticket.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                                    <div>
                                        <p className="text-muted mb-0">From</p>
                                        <p className="m-0 text-truncate">{ticket.departure.split(",")[1]}</p>
                                        <p className="fw-bold my-0" style={{ color: "#2F82FF" }}>({ticket.departureCode})</p>
                                        <p>{moment(ticket.takeOff).format('LT')}</p>
                                    </div>
                                    <div className="mb-5">
                                        <p className="text-muted mb-0">To</p>
                                        <p className="m-0 text-truncate">{ticket.destination.split(",")[1]}</p>
                                        <p className="fw-bold my-0" style={{ color: "#2F82FF" }}>({ticket.destinationCode})</p>
                                        <p>{moment(ticket.arrive).format('LT')}</p>
                                    </div>
                                    <Link to={`${ticket.id}`} class="btn--cta">Check detail</Link>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </>
            ) : (
                <>
                    <b>Tiket terbaru</b>
                    <Card className="mt-3">
                        <Card.Body>
                            testing card
                        </Card.Body>
                    </Card>
                </>
            )}
        </>

    );
}