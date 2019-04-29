import { IBaseService } from './ibase.service';
import { AngularFirestoreCollection, AngularFirestore,
    DocumentSnapshotDoesNotExist, Action, DocumentSnapshotExists } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap, take, switchMap, mergeMap, expand, takeWhile } from 'rxjs/operators';
import { BaseEntity } from 'src/app/models/base-entity.model';

export abstract class BaseService<T extends BaseEntity> implements IBaseService<T> {

    protected collection: AngularFirestoreCollection<T>;

    constructor(protected path: string, protected afs: AngularFirestore) {
        this.collection = this.afs.collection(path);
    }

    get(identifier: string): Observable<T> {
        // this.logger.logVerbose(`[BaseService] get: ${identifier}`);

        return this.collection
            .doc<T>(identifier)
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

    getBy(identifier: string, val: any): Observable<T> {
        return this.collection
            .doc<T>(identifier)
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

    // getBy(identifier: string, val: any): Promise<any> {
    //     // this.logger.logVerbose(`[BaseService] get: ${identifier}`);
    //     // afs.collection('people', ref => ref.where('age', '==', 5) .where('name', '==', 'jeff')

    //     return this.collection.ref.where(identifier, '==', val).get();
    //     //     .snapshotChanges()
    //     //     .pipe(map(users => {
    //     //         const user = users[0];
    //     //         if (user) {
    //     //             const data = user.payload.doc.data() as T;
    //     //             const id = user.payload.doc.id;
    //     //             return { id, ...data };
    //     //         } else {
    //     //             return null;
    //     //         }
    //     // }));
    // }

    list(): Observable<T[]> {
        // this.logger.logVerbose(`[BaseService] list`);

        return this.collection
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(a => {
                        const data = a.payload.doc.data() as T;
                        data.id = a.payload.doc.id;
                        return data;
                    });
                })
            );
    }

    add(item: T): Promise<T> {
        // this.logger.logVerbose('[BaseService] adding item', item);

        const promise = new Promise<T>((resolve, reject) => {
            item.createdOn = new Date();
            this.collection.add(item).then(ref => {
                const newItem = {
                    id: ref.id,
                    createdOn: new Date(),
                    /* workaround until spread works with generic types */
                    ...(item as any)
                };
                resolve(newItem);
            });
        });
        return promise;
    }

    // upsert(ref: Promise<T>, data: any): Promise<void> {
    //     const doc = this.collection.ref.doc
    //       .snapshotChanges()
    //       .pipe(take(1))
    //       .toPromise();
    //     return doc.then((snap: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>) => {
    //       return (snap.payload.exists ? this.update(data) : this.add(data));
    //     });
    // }

    upsert(item: T): Promise<T> {
        const doc = this.collection.doc(this.path)
          .snapshotChanges()
          .pipe(take(1))
          .toPromise();
        return doc.then((snap: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>) => {
          return snap.payload.exists ? this.update(item) : this.add(item);
        });
    }

    update(item: T): Promise<T> {
        // this.logger.logVerbose(`[BaseService] updating item ${item.id}`);

        const promise = new Promise<T>((resolve, reject) => {
        item.updatedOn = new Date();
        const docRef = this.collection
            .doc<T>(item.id)
            .set(item)
            .then(() => {
                resolve({
                    ...(item as any)
                });
            });
        });
        return promise;
    }

    delete(id: string): void {
        // this.logger.logVerbose(`[BaseService] deleting item ${id}`);

        const docRef = this.collection.doc<T>(id);
        docRef.delete();
    }

}
