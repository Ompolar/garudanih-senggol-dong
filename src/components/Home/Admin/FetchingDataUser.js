import "./admin.css";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";

export default function FetchingDataUser() {
    const [rows, setRows] = useState([])

    const token = localStorage.getItem("token");

    axios({
        method: 'GET',
        url: 'https://api-ticket.up.railway.app/v1/admin/all',
        timeout: 120000,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then((res) => {
        setRows(res.data.data.user)
    })
    .catch((err) => {
        console.log(err)
    })

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'role',
            headerName: 'Role',
            type: 'number',
            width: 130,
        },
    ];

    return (
        <div style={{ height: 400, width: '100%', background: "white" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                pagination
            />
        </div>
    )
}