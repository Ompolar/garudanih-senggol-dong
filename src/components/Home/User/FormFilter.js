import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";

export default function FormFilter() {
    const [data, setData] = useState(null)
    const [airportOptions, setAirportOptions] = useState([])
    const [requestBody, setRequestBody] = useState({
        departure: "",
        destination: "",
        class: "",
        price: 0,
    })

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
            console.log(airportOptions);
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    return (
        <Container className="p-3 shadow rounded bg-white form-filter" style={{position: 'relative', zIndex:10, marginTop: "-60px"}}>
                {/* <Form onSubmit={(e) => handleFilter(e)}>
                    <Row className="d-flex align-items-center">
                        <Col>
                            <p>Departure</p>
                            <select defaultValue={driver} onChange={(e) => setDriver(e.target.value)} style={{ width: "100%", height: "40px" }} required>
                                <option value="" disabled hidden>Pilih Driver</option>
                                <option value="true">Dengan Driver</option>
                                <option value="false">Lepas Kunci (Lepas Kunci)</option>
                            </select>
                        </Col>
                        <Col md="2">
                            <p>Tanggal</p>
                            <input type="date" value={date} placeholder="masukan nama mobil" onChange={(e) => setDate(e.target.value)} style={{ width: "100%", height: "40px" }} />
                        </Col>
                        <Col md="2">
                            <p>Waktu Jemput/Ambil</p>
                            <select defaultValue={time} onChange={(e) => setTime(e.target.value)} style={{ width: "100%", height: "40px" }} required>
                                <option value="" disabled hidden>Pilih Waktu</option>
                                <option value="09:00:00">09.00</option>
                                <option value="10:00:00">10.00</option>
                                <option value="11:00:00">11.00</option>
                                <option value="12:00:00">12.00</option>
                            </select>
                        </Col>
                        <Col>
                            <p>Jumlah Penumpang (opsional)</p>
                            <input type="text" value={capacity} placeholder="Jumlah Penumpang" onChange={(e) => setCapacity(e.target.value)}
                                onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} style={{ width: "100%", height: "40px" }} />
                        </Col>
                        <Col>
                            <button type="submit" className="btn btn-success w-100">Cari Mobil</button>
                            <button type="reset" onClick={() => handleReset()} className=" btn btn-outline-danger w-100 mt-3">Clear</button>
                        </Col>
                    </Row>
                </Form> */}
            </Container>
    );
}