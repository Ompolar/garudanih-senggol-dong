import { Card, Col, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

export default function FormTransaction() {
    const { returnTicket } = useLocation().state
    const { ticketId } = useParams()
    return (
        <div>
            <h2>ticket {ticketId}</h2>
            <Row>
                {returnTicket.map((ticket, index) => {
                    return (
                        <Col md="4" key={index}>
                            <Card>
                                <b>{ticket.code}</b>
                                {ticket.bookingBy.map((user, index) => {
                                    return (
                                        <p key={index}>{user.numChair}</p>
                                    )
                                })}
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    );
}