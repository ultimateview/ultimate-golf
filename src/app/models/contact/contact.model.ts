
export interface IContact {
    id?: string;
    createdOn?: Date;
    updatedOn?: Date;
    type: string;
    name: string;
    phone1: string;
    phoneType1: string;
    phone2?: string;
    phoneType2?: string;
    email: string;
    notes?: string;
}
