import axios from "axios";
import moment from "moment";
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { HighlightOff } from "@mui/icons-material";
import { Container } from "react-bootstrap";
import DeleteModal from '../../Modal/DeleteModal';

export default function HistoryTransaction() {
    const [rows, setRows] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [id, setId] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem("token")

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/v1/user/history`,
            timeout: 120000,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                setRows(res.data.data.transaction)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'code', headerName: 'Transaction Code', width: 170 },
        { field: 'orderBy', headerName: 'Passenger', width: 170 },
        { field: 'numChair', headerName: 'Number Seat', width: 100 },
        { field: 'ticketCode', headerName: 'Ticket Code', width: 170 },
        { field: 'ktp', headerName: 'Number Identify', width: 130 },
        { 
            field: 'createdAt',
            headerName: 'Booking Date',
            width: 210,
            valueGetter: (params) => moment(params.row.createdAt).format('LLL') },
        {
            field: "Action",
            renderCell: (cellValues) => {
                return <button onClick={() => {
                    setModalShow(true)
                    setId(cellValues.row.id)
                }} className="bg-danger border-0 text-white p-1 rounded-circle"><HighlightOff /></button>;
            }
        }
    ];

    return (
        <Container>
            <h3>Transaction History</h3>
            <p>List of transactions that you have ever made</p>
            <div style={{ height: 650, width: '100%', background: "white" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                pagination
            // onRowClick={handleRowClick}
            />
            <DeleteModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                dataid={id}
                target="transc"
            />
        </div>
        </Container>
    );
}