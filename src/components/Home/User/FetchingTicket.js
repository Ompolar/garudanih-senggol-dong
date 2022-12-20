import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";

export default function FetchingTicket() {
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:8010/v1/ticket-doms`,
            timeout: 120000,
        }).then((res) => {
            setTickets(res.data.data.tickets)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    return (
        <Row>
            {tickets.length !== 0 ? (
                tickets.map((ticket, index) => {
                    return (
                        <Col md="4" key={index}>
                            <Card>
                                <Card.Body>
                                    <b>From</b>
                                    <p>{ticket.departureCode}</p>
                                    <b>To</b>
                                    <p>{ticket.destinationCode}</p>
                                </Card.Body>
                                <Card.Footer>
                                    <Link to={`ticket/${ticket.id}`} >Detail</Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                })
            ) : <LoadingSpinner />}
        </Row>
    );
}