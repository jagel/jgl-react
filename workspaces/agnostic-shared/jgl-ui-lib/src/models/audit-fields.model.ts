export interface iAuditFields{
    createdBy: string;
    createdDate : Date;
    updatedBy: string|null;
    updatedDate : Date|null;
}

export class AuditFields implements iAuditFields {
    createdBy: string ='';
    createdDate : Date = new Date();
    updatedBy: string|null =null;
    updatedDate : Date|null = null;
}