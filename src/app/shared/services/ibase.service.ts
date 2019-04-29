import { Observable } from 'rxjs';

export interface IBaseService<T> {
    get(id: string): Observable<T>;
    getBy(identifier: string, val: any): any;
    list(): Observable<T[]>;
    add(item: T): Promise<T>;
    update(item: T): Promise<T>;
    delete(id: string): void;
}
