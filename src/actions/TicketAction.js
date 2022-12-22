import axios from "axios";

export const FILTERED_TICKET = "FILTERED_TICKET"

export const getFilteredCar = (param) => {
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
                const { driver, date, capacity } = param
                
                const filter = response.data.data.filter((car) => car.available === driver && car.capacity >= capacity && (new Date(car.availableAt) <= date))
                
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