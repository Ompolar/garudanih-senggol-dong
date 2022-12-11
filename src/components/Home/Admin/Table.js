import "./home.css"

export default function Table() {
    return (
        <table>
            <thead className="header">
                <tr>
                    <th>Nama</th>
                    <th>Gender</th>
                    <th>Tanggal</th>
                </tr>
            </thead>
            <tbody className="show">
                <tr>
                    <td>Kak Ros</td>
                    <td>Perempuan</td>
                    <td>11-11-2021</td>
                </tr>
            </tbody>
        </table>
    )
}