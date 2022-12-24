import '../components/Home/User/user.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';
import NavUser from '../components/Nav/NavUser';

export default function UserPage() {
    const location = useLocation().pathname

    return (
        <div>
            <div className={location === "/" ? "bg--home" : "bg--airplane"}>
                <NavUser />
                <Container className="intro--user">
                    <Row>
                        <Col>
                            <div className="title">Transaksi cepet, Gak pake ribet</div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Outlet />
            <div className="footer--user">
                <Container>
                    <Row>
                        <Col md="4">
                            <div className="d-flex flex-column">
                                <p>Menu</p>
                                <Link to={"/"}>Home</Link>
                                <Link to={"/"}>Ticket</Link>
                                <Link to={"/"}>Transaction</Link>
                            </div>
                        </Col>
                        <Col md="4">

                        </Col>
                        <Col md="4">

                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}