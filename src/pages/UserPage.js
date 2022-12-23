import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavUser from '../components/Nav/NavUser';

export default function UserPage() {
    return (
        <div>
            <div className="bg--airplane">
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
        </div>
    );
}