import './user.css';
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingCircle from '../../Loader/LoadingCircle';

export default function ResultFilter() {
    const { filteredTicketResult, filteredTicketLoading, flightTicketResult } = useSelector((state) => state.TicketReducer)

    return (
        <>
            {!filteredTicketLoading ? (
                filteredTicketResult ? (
                    <>
                        <b>Seacrhing result : {filteredTicketResult.length} ticket found</b>
                        {filteredTicketResult.map((ticket, index) => {
                            return (
                                <div key={index} className="mt-3 plan-card">
                                    <h2>{ticket.class}<span>{moment(ticket.takeOff).format('LL')}</span></h2>
                                    <div className="etiquet-price">
                                        <p>{ticket.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                                        <div></div>
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-muted mb-0">From</p>
                                        <p className="m-0 text-truncate">{ticket.departure.split(",")[1]}</p>
                                        <p className="fw-bold my-0" style={{ color: "#2F82FF" }}>({ticket.departureCode})</p>
                                        <p>{moment(ticket.takeOff).format('LT')}</p>
                                    </div>
                                    <div className="mb-5">
                                        <p className="text-muted mb-0">To</p>
                                        <p className="m-0 text-truncate">{ticket.destination.split(",")[1]}</p>
                                        <p className="fw-bold my-0" style={{ color: "#2F82FF" }}>({ticket.destinationCode})</p>
                                        <p>{moment(ticket.arrive).format('LT')}</p>
                                    </div>
                                    <Link to={`${ticket.id}`} className="btn--cta">Check detail</Link>
                                </div>
                            )
                        })}
                    </>
                ) : (
                    flightTicketResult ? (
                        <>
                            <b>4 New Ticket</b>
                            {flightTicketResult.map((ticket, index) => {
                                return index < 5 ? (
                                    <div key={index} className="mt-3 plan-card">
                                        <h2>{ticket.class}<span>{moment(ticket.takeOff).format('LL')}</span></h2>
                                        <div className="etiquet-price">
                                            <p>{ticket.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                                            <div></div>
                                        </div>
                                        <div className="mt-3">
                                            <p className="text-muted mb-0">From</p>
                                            <p className="m-0 text-truncate">{ticket.departure.split(",")[1]}</p>
                                            <p className="fw-bold my-0" style={{ color: "#2F82FF" }}>({ticket.departureCode})</p>
                                            <p>{moment(ticket.takeOff).format('LT')}</p>
                                        </div>
                                        <div className="mb-5">
                                            <p className="text-muted mb-0">To</p>
                                            <p className="m-0 text-truncate">{ticket.destination.split(",")[1]}</p>
                                            <p className="fw-bold my-0" style={{ color: "#2F82FF" }}>({ticket.destinationCode})</p>
                                            <p>{moment(ticket.arrive).format('LT')}</p>
                                        </div>
                                        <Link to={`${ticket.id}`} className="btn--cta">Check detail</Link>
                                    </div>
                                ) : ""
                            })}
                        </>
                    ) : ""
                )
            ) : (
                <div className="my-5">
                    <LoadingCircle styled="d-flex justify-content-center" />
                </div>
            )}
        </>

    );
}