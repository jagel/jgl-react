export interface ITableModel {
    // column for action buttons : - align : left, disable sort
    id: string; // Id , align : left , disable sort, 
    name: string; // Name, align : left
    age: number; // Age, aling : right
    email: string; // E-Mail, align: left
    address: string; // Address - align : left
    phone: string; // Phone - align : right
    isInternal: boolean; // ignore in table
}