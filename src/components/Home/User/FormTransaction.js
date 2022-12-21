import { AirlineSeatReclineExtra, AssignmentInd, Pin } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Select from "react-select";

export default function FormTransaction() {
    const { ticketId } = useParams()
    // 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
    const [data, setData] = useState(null)
    const [numberOptions, setNumberOptions] = useState([])
    const [requestBody, setRequestBody] = useState({
        ktp: "",
        orderBy: "",
        numChair: 0,
        returnTicketId: null,
        returnTicketChair: 0,
    })

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/v1/ticket/${ticketId}`,
            timeout: 120000,
        }).then((res) => {
            setData(res.data.data)

        }).catch((err) => {
            console.log(err.message)
        })

    }, [ticketId])

    useEffect(() => {
        if (data) {
            let arr = []
            for (let i = 0; i < data.ticket.totalChair; i++) {
                const found = data.ticket.bookingBy.some(el => el.numChair === i);

                if (!found) arr.push({ value: i, label: i });
            }
            setNumberOptions(arr)
        }
    }, [data])

    const onChangeHandler = (e) => {
        setRequestBody({ ...requestBody, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(requestBody)

        // setLoading(true)
        const token = localStorage.getItem("token")

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BASE_URL}/v1/trans/${ticketId}`,
            timeout: 120000,
            data: requestBody,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <div className="px-5">
            {data ? (
                <>
                    <h2>ticket {ticketId}</h2>
                    <Row>
                        <Col md="4">
                            <div className="d-flex mb-2">
                                <Pin />
                                <label className="ms-2">Identify Number</label>
                            </div>
                            <Form.Control type="text" name="ktp" value={requestBody.ktp} onChange={(e) => onChangeHandler(e)} placeholder="Nomor KTP . . ." />
                        </Col>
                        <Col md="5">
                            <div className="d-flex mb-2">
                                <AssignmentInd />
                                <label className="ms-2">Booking As</label>
                            </div>
                            <Form.Control type="text" name="orderBy" value={requestBody.orderBy} onChange={(e) => onChangeHandler(e)} placeholder="Masukan nama . . ." />
                        </Col>
                        <Col md="3">
                            <div className="d-flex mb-2">
                                <AirlineSeatReclineExtra />
                                <label className="ms-2">Seat Number</label>
                            </div>
                            {numberOptions.length !== 0 ? (
                                <Select options={numberOptions} placeholder="Choose number . . ." />
                            ) : ""}
                        </Col>
                    </Row>
                    <Row>
                        {data.returnTicket.length !== 0 ? <p>Pesan juga tiket pulang</p> : <p>Saat ini tiket pulang tidak tersedia</p>}
                        {data.returnTicket.map((ticket, index) => {
                            return (
                                <Col md="4" key={index}>
                                    <Card>
                                        <Card.Body>
                                            <input type="radio" value={ticket.id} onChange={(e) => onChangeHandler(e)} name="returnTicketId" />
                                            <b>{ticket.code}</b>
                                            <b>From</b>
                                            <p>{data.ticket.departureCode}</p>
                                            <p>{data.ticket.departure}</p>
                                            <b>To</b>
                                            <p>{data.ticket.destinationCode}</p>
                                            <p>{data.ticket.destination}</p>
                                            <p>kursi yang telah dipesan</p>
                                            <div className="d-flex">
                                                {ticket.bookingBy.map((user, index) => {
                                                    return (
                                                        <p key={index} className="bg-primary rounded p-1 text-white me-2">{user.numChair}</p>
                                                    )
                                                })}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                    {data.returnTicket.length !== 0 ? (
                        <Form.Control type="text" name="returnTicketChair" value={requestBody.returnTicketChair} onChange={(e) => onChangeHandler(e)} placeholder="Pilih nomor kursi . . ." onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} maxLength={3} />
                    ) : ""}
                    <button onClick={(e) => onSubmitHandler(e)}>Pesan Sekarang</button>
                </>
            ) : <p>Loading . . .</p>}
        </div>
    );
}