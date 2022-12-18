import "./admin.css";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function DashboardContent() {
    return (
        <div className="p-3">
            <div className="d-flex">
                <i className="bi bi-grid-1x2-fill text-white px-2 py-1 rounded fs-4" style={{ background: "#2F82FF" }}></i>
                <p className="fs-4 fw-bold ms-2 my-auto">Dashboard</p>
            </div>
            <Row className="py-3">
                <Col md="4" className="d-flex align-items-stretch">
                    <Card className="w-100 mb-2 bg-dark-pink">
                        <Card.Body>
                            <div>
                                <div className="card-icon"><i className="bi bi-people-fill"></i></div>
                                <div>
                                    <p>Total User</p>
                                    <p className="fs-1 my-0">13</p>
                                    <p>Account has registered</p>
                                </div>
                            </div>
                        </Card.Body>
                        <Link to={"/admin/user"} className="card-button fw-bold text-decoration-none" style={{ color: "#493240" }}>More Info</Link>
                    </Card>
                </Col>
                <Col md="4" className="d-flex align-items-stretch">
                    <Card className="w-100 mb-2 bg-dark-green">
                        <Card.Body>
                            <div>
                                <div className="card-icon"><i className="bi bi-ticket-perforated-fill"></i></div>
                                <div>
                                    <p>Total Ticket</p>
                                    <p className="fs-1 my-0">13</p>
                                    <p>Ticket was created</p>
                                </div>
                            </div>
                        </Card.Body>
                        <Link to={"/admin/ticket"} className="card-button fw-bold text-decoration-none" style={{ color: "#0a504a" }}>More Info</Link>
                    </Card>
                </Col>
                <Col md="4" className="d-flex align-items-stretch">
                    <Card className="w-100 mb-2 bg-dark-orange">
                        <Card.Body>
                            <div>
                                <div className="card-icon"><i className="bi bi-receipt-cutoff"></i></div>
                                <div>
                                    <p>Transactions</p>
                                    <p className="fs-1 my-0">13</p>
                                    <p>Total ever made</p>
                                </div>
                            </div>
                        </Card.Body>
                        <Link to={"/admin/transaction"} className="card-button fw-bold text-decoration-none" style={{ color: "#a86008" }}>More Info</Link>
                    </Card>
                </Col>
            </Row>
            <div className="py-3 d-flex justify-content-between align-items-center rounded" style={{ background: "#2F82FF" }}>
                <p className="px-4 fs-5 text-white my-auto fw-bold">Let's make beautiful journey and interesting offer</p>
                <Link to={"/admin/ticket/create"} className="bg-white text-black text-decoration-none mx-4 px-3 py-2 rounded">Create new ticket</Link>
            </div>
        </div>
    );
}