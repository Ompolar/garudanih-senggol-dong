import axios from "axios";

export const FILTERED_TICKET = "FILTERED_TICKET"

export const getFilteredTicket = (param) => {
    const { reset } = param
    
    if (reset) {
        return (dispatch) => {
            dispatch({
                type: FILTERED_TICKET,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: false
                }
            })
        }
    }

    return (dispatch) => {
        dispatch({
            type: FILTERED_TICKET,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/v1/ticket`,
            timeout: 120000
        })
            .then((response) => {
                const { departure, destination, takeOff, classFlight, price } = param
                
                const filter = response.data.data.tickets.filter((ticket) => ticket.departure === departure && ticket.destination === destination && ticket.class === classFlight && ticket.price >= price && (new Date(ticket.takeOff) <= takeOff))
                
                dispatch({
                    type: FILTERED_TICKET,
                    payload: {
                        loading: false,
                        data: filter,
                        errorMessage: false
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: FILTERED_TICKET,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: err.message
                    }
                })
            })
    }
}