import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"

export default function ResultFilter() {
    const { filteredTicketResult, filteredTicketLoading, filteredTicketError } = useSelector((state) => state.TicketReducer)
    console.log(filteredTicketResult)
    return (
        <>
            {filteredTicketResult ? (
                <>
                    <b>Tiket terbaru</b>
                    <Card className="mt-3">
                        <Card.Body>
                            testing result
                        </Card.Body>
                    </Card>
                </>
            ) : (
                <>
                    <b>Tiket terbaru</b>
                    <Card className="mt-3">
                        <Card.Body>
                            testing card
                        </Card.Body>
                    </Card>
                </>
            )}
        </>

    );
}