import * as ReservationActions from '../actions/reservation.actions';
import { Reservation } from 'src/app/models/reservation.model';

export interface ReservationState {
    reservation: Reservation;
    processing: boolean;
    processed: boolean;
    fetchingReservation: boolean;
    fetchingReservationSucess: boolean;
    fetchingReservationFail: boolean;
}

const initialState: ReservationState = {
    reservation: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
    },
    processing: false,
    processed: false,
    fetchingReservation: false,
    fetchingReservationSucess: false,
    fetchingReservationFail: false,
}

export function reservationReducer(state: ReservationState = initialState,
    action: ReservationActions.ReservationActions): ReservationState {

    switch (action.type) {

        case ReservationActions.RESERVE_SEAT:
            return {
                ...state,
                processing: true,
                processed: false,
            }

        case ReservationActions.RESERVE_SEAT_SUCESS:
            return {
                ...state,
                processing: false,
                processed: true,
            }

        case ReservationActions.RESERVE_SEAT_FAIL:
            return {
                ...state,
                processing: false,
                processed: false,
            }

        case ReservationActions.FETCH_RESERVATION:
            return {
                ...state,
                fetchingReservation: true,
            }

        case ReservationActions.FETCH_RESERVATION_FAIL:
            return {
                ...state,
                fetchingReservation: false,
                fetchingReservationFail: true,
                fetchingReservationSucess: false,
            }

        case ReservationActions.FETCH_RESERVATION_SUCESS:
            return {
                ...state,
                fetchingReservation: false,
                fetchingReservationFail: false,
                fetchingReservationSucess: true,
                reservation: action.payload
            }

        default:
            return state;
    }
}
