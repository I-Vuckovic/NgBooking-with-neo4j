import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Reservation } from '../models/reservation.model';
import {AngularNeo4jService} from 'angular-neo4j';
import {credentials} from "../../environments/neo4j";


@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    constructor( private neo4j: AngularNeo4jService) {

        this.neo4j.connect(credentials.url, credentials.username, credentials.password, credentials.encrypted)
        .then(driver => {
            if (driver){
              
            }
        })

    }

    getReservation(id: number) {
        let query = `MATCH (r:Reservation )-[:RESERVED_SEAT]->(t:Trip)
        WHERE ID(r) = ${id}
        RETURN r { .firstName, .lastName, tripId: ID(t), .finalPrice, .email, .phoneNumber}`;

        return this.neo4j.run(query).then(res => {
            return res;
        })
    }


    reserveSeat(reservation: Reservation) {

        let query = `MATCH (t:Trip) WHERE ID(t)= ${reservation.tripId} 
        CREATE (r:Reservation {firstName: '${reservation.firstName}', lastName: '${reservation.lastName}',
        phoneNumber: '${reservation.phoneNumber}', email: '${reservation.email}', finalPrice: ${reservation.finalPrice}})
        -[:RESERVED_SEAT]->(t)
        WITH {tripId: ID(t), reservationId: ID(r)} as ReturnIDs RETURN ReturnIDs`;



        return this.neo4j.run(query).then(res => {
            return res;
        })
    }
}