import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FlightTakeoff, FlightLand, CalendarMonth, FlightClass } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { getFilteredTicket } from '../../../actions/TicketAction'
import Select from "react-select";

export default function FormFilter() {
    const [airportOptions, setAirportOptions] = useState([])
    const [requestBody, setRequestBody] = useState({
        departure: "",
        destination: "",
        classFlight: "",
        price: 0,
        takeOff: "",
    })

    const dispatch = useDispatch()

    useEffect(() => {
        let arr = []

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/v1/ticket`,
            timeout: 120000,
        }).then((res) => {
            const result = res.data.data.tickets

            result.map((ticket) => {
                return arr.push({ value: ticket.departure, label: ticket.departure })
            })

            setAirportOptions(arr)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    const onChangeHandler = (e) => {
        setRequestBody({ ...requestBody, [e.target.name]: e.target.value })
    }

    const handleFilter = (e) => {
        e.preventDefault()

        const dateValue = new Date(requestBody.takeOff)

        dispatch(getFilteredTicket({ ...requestBody, takeOff: dateValue }))
    }

    // const handleReset = () => {
    //     console.log(requestBody)
    // }

    return (
        <Form onSubmit={(e) => handleFilter(e)}>
            <Row className="d-flex align-items-center">
                <Col md="6" className="mb-4">
                    <div className="d-flex mb-2">
                        <FlightTakeoff />
                        <label className="ms-2">Departure</label>
                    </div>
                    <Select
                        options={airportOptions}
                        onChange={(e) => setRequestBody({ ...requestBody, departure: e.value })}
                        placeholder="Airport or city . . ."
                    />
                </Col>
                <Col md="6" className="mb-4">
                    <div className="d-flex mb-2">
                        <FlightLand />
                        <label className="ms-2">Destination</label>
                    </div>
                    <Select
                        options={airportOptions}
                        onChange={(e) => setRequestBody({ ...requestBody, destination: e.value })}
                        placeholder="Airport or city . . ."
                    />
                </Col>
                <Col md="3">
                    <div className="d-flex mb-2">
                        <CalendarMonth />
                        <label className="ms-2">Take Off</label>
                    </div>
                    <Form.Control type="date" name="takeOff" value={requestBody.takeOff} onChange={(e) => onChangeHandler(e)} autoComplete="off" placeholder="Airport name . . ." required />
                </Col>
                <Col md="3">
                    <div className="d-flex mb-2">
                        <FlightClass />
                        <label className="ms-2">Class</label>
                    </div>
                    <select name="classFlight" defaultValue={requestBody.classFlight} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} required>
                        <option value="" disabled hidden>Choose class</option>
                        <option value="First Class">First Class</option>
                        <option value="Business">Business</option>
                        <option value="Economy">Economy</option>
                    </select>
                </Col>
                <Col md="3">
                    <div className="d-flex mb-2">
                        <i className="bi bi-cash-stack me-2"></i>
                        <label>Price (optional)</label>
                    </div>
                    <Form.Control type="text" name="price" value={requestBody.price} autoComplete="off" placeholder="Price ticket . . ." required
                        onChange={(e) => onChangeHandler(e)}
                        onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} />
                </Col>
                <Col md="3" className="d-flex align-self-end">
                    {/* <button type="reset" onClick={() => handleReset()} className=" btn btn-outline-danger w-100 mt-3">Clear</button> */}
                    <button type="submit" className="btn btn-primary w-100">Search flights</button>
                </Col>
            </Row>
        </Form>
    );
}