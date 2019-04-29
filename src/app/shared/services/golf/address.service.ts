import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap, take, switchMap, mergeMap, expand, takeWhile } from 'rxjs/operators';

import { ILocationAddress } from './../../../models/location/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService<ILocationAddress> {

  constructor(afs: AngularFirestore) {
    const path = 'addresses';
    super(path, afs);
  }

  getByCourseId(identifier: string): Observable<ILocationAddress> {
    // this.logger.logVerbose(`[BaseService] get: ${identifier}`);

    // const q = this.collection.ref.where('courseId', '==', identifier);
    // return q.get().then(function(querySnapshot) {
    //     return querySnapshot.docChanges().map(doc => {
    //         const data = doc.doc.data() as any;
    //         const id = doc.doc.id;
    //         return { id, ...data };
    //     });
    // }) as Observable<ILocationAddress>;

    return this.collection
        .doc<ILocationAddress>(identifier)
        .snapshotChanges()
        .pipe(
            map(doc => {
                if (doc.payload.exists) {
            /* workaround until spread works with generic types */
                    const data = doc.payload.data() as any;
                    const id = doc.payload.id;
                    return { id, ...data };
                }
            })
        );
    }
}
