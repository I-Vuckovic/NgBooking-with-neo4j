import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from 'angularfire2/firestore';
import { Trip } from '../models/trip.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation } from '../models/reservation.model';
import {AngularNeo4jService} from 'angular-neo4j';
import {credentials} from "../../environments/neo4j";
import { Filter } from '../models/filter.model';


@Injectable({
    providedIn: 'root'
})
export class TripService {
    private tripCollection: AngularFirestoreCollection<Trip>;

    constructor(private afs: AngularFirestore, private neo4j: AngularNeo4jService,  ) {



        this.neo4j.connect(credentials.url, credentials.username, credentials.password, credentials.encrypted)
        .then(driver => {
            if (driver){
              
            }
        })

        let query = `MATCH (n:Trip)-[:GOES_TO]->(c:City {name : 'Novi Sad'})
        MATCH (n:Trip)-[:GOES_FROM]->(d:City { name : 'Nis'})
        RETURN n`;

        // this.neo4j.run(query).then(res => {console.log(res)});
        
    }

    getAllDestinations() {
        let query = `MATCH (c:City) RETURN c `
        return this.neo4j.run(query).then(res => {
            return res;
        })
    }

    
    getFromDestinations(toDestination : string) {
        let to = toDestination == '' ? '' : `MATCH (t:Trip)-[:GOES_TO]->(c:City{name:'${toDestination}'})`;
        let query = to + `MATCH (t)-[:GOES_FROM]->(n:City) RETURN DISTINCT n`

        return this.neo4j.run(query).then(res => {
            return res
        })
    }

    getToDestinations(fromDestination : string) {
        let from = fromDestination == '' ? '' : `MATCH (t:Trip)-[:GOES_FROM]->(c:City{name:'${fromDestination}'})`;
        let query = from + `MATCH (t)-[:GOES_TO]->(n:City) RETURN DISTINCT n`

        return this.neo4j.run(query).then(res => {
            return res
        })
    }

    getTrips(fromDestination: string, toDestination: string, startDate: Date, endDate: Date) {

    
        let from = fromDestination == '' ? '' : `{name : "${fromDestination}"}`
        let to = toDestination == '' ? '' : `{name : "${toDestination}"}`

        let query = 
        `MATCH (t)-[:GOES_FROM]->(f:City ${from})
        MATCH (t)-[:GOES_TO]->(g:City ${to})
        WHERE t.time <= datetime({year:${endDate.getFullYear()}, month:${endDate.getMonth()+1}, day:${endDate.getDate()}})
        AND t.time >= datetime({year:${startDate.getFullYear()}, month:${startDate.getMonth()+1}, day:${startDate.getDate()}})
        WITH {id: ID(t), from: f.name, to: g.name, price: t.price, 
            freeSeats: t.freeSeats, extraLuggage: t.extraLuggage,
             distance: t.distance, duration: t.duration, time: t.time} as Trip
        RETURN Trip`;
        
        return this.neo4j.run(query).then(res => {
            return res;
        })
    }

    addTrip(trip : Trip) {
        
        let query = `
            CREATE (r:Trip {distance: ${trip.distance}, price: ${trip.price}, duration: "${trip.duration}", 
            freeSeats: ${trip.freeSeats}, extraLuggage: ${trip.extraLuggage}, 
            time: datetime({ year:${trip.time.getFullYear()}, month:${trip.time.getMonth()+1}, day:${trip.time.getDate()}, 
            hour:${trip.time.getHours()}, minute:${trip.time.getMinutes()} })})
            MERGE (f:City {name: "${trip.from}"})
            MERGE (t:City {name: "${trip.to}"})
            CREATE (r)-[:GOES_TO]->(t)
            CREATE (r)-[:GOES_FROM]->(f)`;
        return this.neo4j.run(query);
    }

    addNewDestination(newDestination : string) {
        let query = `CREATE (c:City {name: '${newDestination}'})`

        this.neo4j.run(query);
    }

    getTripById(id: number) {
        
        let query = 
        `MATCH (t)-[:GOES_FROM]->(f:City)
        MATCH (t)-[:GOES_TO]->(g:City)
        WHERE ID(t) = ${id}
        WITH {id: ID(t), from: f.name, to: g.name, price: t.price, 
            freeSeats: t.freeSeats, extraLuggage: t.extraLuggage,
             distance: t.distance, duration: t.duration, time: t.time} as Trip
        RETURN Trip`;

        return this.neo4j.run(query).then(res => {
            return res;
        })
    }

    updateFreeSeats(id: number) {
        
        let query = `MATCH (t:Trip ) WHERE ID(t) = ${id}
        SET t.freeSeats = t.freeSeats - 1`;

        return this.neo4j.run(query).then(res => {
            return res;
        })
    }
}