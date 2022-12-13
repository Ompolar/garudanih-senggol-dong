import { Link } from "react-router-dom";
import FetchingDataTicket from "./FetchingDataTicket";

export default function ContainerDataTicket() {
    return (
        <div className="p-3">
            <div className="d-flex">
                <i className="bi bi-ticket-perforated-fill text-white px-2 py-1 rounded fs-4" style={{ background: "#2F82FF" }}></i>
                <p className="fs-4 fw-bold ms-2 my-auto">List Ticket</p>
            </div>
            <div className="my-3">
                <FetchingDataTicket />
            </div>
            <Link to={"admin/user/create"} className="btn btn-primary">Create New Ticket</Link>
        </div>
    );
}