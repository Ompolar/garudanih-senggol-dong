import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

export default function DetailTicket() {
    const { id } = useParams()

    const [data, setData] = useState(null)

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:8010/v1/ticket/${id}`,
            timeout: 120000,
        }).then((res) => {
            setData(res.data.data)

        }).catch((err) => {
            console.log(err.message)
        })
    }, [id])

    return (
        <div>
            {data ? (
                <Card className="m-2">
                    <Card.Body>
                        <b>From</b>
                        <p>{data.ticket.departureCode}</p>
                        <p>{data.ticket.departure}</p>
                        <b>To</b>
                        <p>{data.ticket.destinationCode}</p>
                        <p>{data.ticket.destination}</p>
                    </Card.Body>
                    <Card.Footer>
                        <Link to={`/transaction/${data.ticket.id}`} >Booking ticket</Link>
                    </Card.Footer>
                </Card>
            ) : "Loading"}
        </div>
    );
}