import { Filter } from 'src/app/models/filter.model';
import * as FilterActions from '../actions/filter.actions';


export interface FilterState {
    to: string;
    from: string;
    startDate: Date;
    endDate: Date;
}

const intitialState: FilterState = {
    to: '',
    from: '',
    startDate: new Date(0),
    endDate: new Date(2025, 0, 0, 0, 0, 0, 0),
}

export function filterReducer(state: FilterState = intitialState, action: FilterActions.FilterActions): FilterState {

    switch (action.type) {

        case FilterActions.CHANGE_TO_DESTINATION:
            return {
                ...state,
                to: action.payload
            }

        case FilterActions.CHANGE_FROM_DESTINATION:
            return {
                ...state,
                from: action.payload
            }

        case FilterActions.CHANGE_START_DATE:
            return {
                ...state,
                startDate: action.payload
            }

        case FilterActions.CHANGE_END_DATE:
            return {
                ...state,
                endDate: action.payload
            }

        default:
            return state;
    }
}

export const getFromDestination = (state: FilterState) => state.from;
export const getToDestination = (state: FilterState) => state.to;
export const getStartDate = (state: FilterState) => state.startDate;
export const getEndDate = (state: FilterState) => state.endDate;