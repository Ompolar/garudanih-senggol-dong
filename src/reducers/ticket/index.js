import { FILTERED_TICKET } from '../../actions/TicketAction'

export const initialState = {
    filteredTicketResult: false,
    filteredTicketLoading: false,
    filteredTicketError: false,
}

const tickets = (state = initialState, action) => {
    switch (action.type) {
        case FILTERED_TICKET:
            return {
                ...state,
                filteredCarsResult: action.payload.data,
                filteredCarsLoading: action.payload.loading,
                filteredCarsError: action.payload.errorMessage
            }
        default:
            return state
    }
}

export default tickets;