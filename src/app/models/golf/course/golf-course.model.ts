import { IContact } from './../../contact/contact.model';
import { ILocationAddress } from './../../location/address.model';
import { IPoi } from '../../location/poi.model';

export interface IGolfCourse {
    id?: string;
    title: string;
    description: string;
    address?: ILocationAddress;
    contact1?: IContact;
    contact2?: IContact;
    distance?: {
        white?: number,
        yellow?: number,
        red?: number,
        blue?: number
    };
    poi?: Array<IPoi>;
    createdOn?: Date;
    updatedOn?: Date;
}
