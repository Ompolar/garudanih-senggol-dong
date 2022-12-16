import './modal.css';
import axios from "axios"
import { Modal, Button } from "react-bootstrap"

export default function DetailTicket(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="border-0 text-danger">
                <Modal.Title id="contained-modal-title-vcenter">
                    Warning!!!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure want to delete <span className="text-danger fw-bold">TESTING</span> account permanently ?</p>
            </Modal.Body>
            <Modal.Footer className="d-flex flex-nowrap border-0">
                <Button onClick={props.onHide} className="w-100" style={{ borderRadius: "0 10px 0 10px" }}>Cancel</Button>
                <Button variant="secondary" onClick={props.onHide} className="w-100" style={{ borderRadius: "10px 0 10px 0" }}>Yes, sure</Button>
            </Modal.Footer>
        </Modal>
    );
}