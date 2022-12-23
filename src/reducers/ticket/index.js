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
                filteredTicketResult: action.payload.data,
                filteredTicketLoading: action.payload.loading,
                filteredTicketError: action.payload.errorMessage
            }
        default:
            return state
    }
}

export default tickets;