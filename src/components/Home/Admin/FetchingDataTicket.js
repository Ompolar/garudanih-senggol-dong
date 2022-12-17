import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import CardSkeleton from "../../Loader/CardSkeleton";
import DetailTicket from "../../Modal/DetailTicket";

export default function FetchingDataTicket(props) {
    const [tickets, setTickets] = useState([]);
    const [modalShow, setModalShow] = useState(false)

    axios({
        method: 'GET',
        url: `https://api-ticket.up.railway.app/v1/ticket-${props.type}`,
        timeout: 120000,
    })
        .then((res) => {
            setTickets(res.data.data.tickets)
        })
        .catch((err) => {
            console.log(err)
        })

    return (
        <Row>
            {tickets.length !== 0 ? (
                tickets.map((ticket, index) => {
                    return index < 3 ? (
                        <Col md="4" key={index} className="d-flex align-items-stretch position-relative">
                            <Card className="w-100 mb-4 card-container">
                                    <Card.Body className="w-100 card-content">
                                        <p style={{ color: "#2F82FF" }}>{ticket.code}</p>
                                        <Row>
                                            <Col md="5">
                                                <p className="text-muted">From</p>
                                                <p className="fs-5 m-0">{ticket.departure.split(",")[1] || ticket.departure}</p>
                                                <p className="fw-bold" style={{ color: "#2F82FF" }}>({ticket.departureCode})</p>
                                            </Col>
                                            <Col md="2" className="text-center my-auto" style={{ rotate: "90deg", color: "#2F82FF" }}>
                                                <i className="bi bi-airplane fs-5"></i>
                                            </Col>
                                            <Col md="5">
                                                <p className="text-muted">To</p>
                                                <p className="fs-5 m-0">{ticket.destination.split(",")[1] || ticket.destination}</p>
                                                <p className="fw-bold" style={{ color: "#2F82FF" }}>({ticket.destinationCode})</p>
                                            </Col>
                                        </Row>
                                        <p>{moment(ticket.takeOff).format('ll')}</p>
                                    </Card.Body>
                                    <div class="flap" dataIndex={ticket.code}></div>
                                <Card.Footer onClick={() => setModalShow(true)}>
                                    <p className="my-auto text-white">Rp{ticket.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ) : ""
                })
            ) : <CardSkeleton md="4" />}
            <DetailTicket
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Row>
    );
}