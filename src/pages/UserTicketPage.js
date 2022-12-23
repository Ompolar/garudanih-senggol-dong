import { Card, Container, Row, Col } from 'react-bootstrap';
import FormFilter from '../components/Home/User/FormFilter'
import ResultFilter from '../components/Home/User/ResultFilter'

export default function UserTicketPage() {
    return (
        <>
            <Container>
                <Row>
                    <Col md="8">
                        <b>Cari tiket pesawat anda disini</b>
                        <Card className="mt-3">
                            <Card.Body>
                                <FormFilter />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="4">
                        <ResultFilter />
                    </Col>
                </Row>
            </Container>
        </>
    );
}