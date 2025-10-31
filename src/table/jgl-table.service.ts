import type { ITableModel } from "./jgl-table.model";

// user #tbl-table.model.ts to populate an array of data 
export const dataCreator = {
    createTableData : () : Array<ITableModel> => { 
        return [
            { id: '1', name: 'John Doe', age: 28, email: 'john_doe@mail.test', address: 'Address 1 In somewhere', phone: '555-1234-567' },
            { id: '2', name: 'Jane Smith', age: 32, email: 'jane_smith@mail.test', address: 'Address 2 In somewhere', phone: '555-1234-568' },
            { id: '3', name: 'Bob Johnson', age: 25, email: 'bob_johnson@mail.test', address: 'Address 3 In somewhere', phone: '555-1234-569' },
            { id: '4', name: 'Alice Brown', age: 30, email: 'alice_brown@mail.test', address: 'Address 4 In somewhere', phone: '555-1234-570' },
            { id: '5', name: 'Charlie Wilson', age: 35, email: 'charlie_wilson@mail.test', address: 'Address 5 In somewhere', phone: '555-1234-571' },
            { id: '6', name: 'Diana Davis', age: 27, email: 'diana_davis@mail.test', address: 'Address 6 In somewhere', phone: '555-1234-572' },
            { id: '7', name: 'Ethan Miller', age: 33, email: 'ethan_miller@mail.test', address: 'Address 7 In somewhere', phone: '555-1234-573' },
            { id: '8', name: 'Fiona Garcia', age: 29, email: 'fiona_garcia@mail.test', address: 'Address 8 In somewhere', phone: '555-1234-574' },
            { id: '9', name: 'George Martinez', age: 31, email: 'george_martinez@mail.test', address: 'Address 9 In somewhere', phone: '555-1234-575' },
            { id: '10', name: 'Helen Rodriguez', age: 26, email: 'helen_rodriguez@mail.test', address: 'Address 10 In somewhere', phone: '555-1234-576' },
            { id: '11', name: 'Ivan Lopez', age: 34, email: 'ivan_lopez@mail.test', address: 'Address 11 In somewhere', phone: '555-1234-577' },
            { id: '12', name: 'Julia Gonzalez', age: 28, email: 'julia_gonzalez@mail.test', address: 'Address 12 In somewhere', phone: '555-1234-578' },
            { id: '13', name: 'Kevin Anderson', age: 37, email: 'kevin_anderson@mail.test', address: 'Address 13 In somewhere', phone: '555-1234-579' },
            { id: '14', name: 'Laura Thomas', age: 24, email: 'laura_thomas@mail.test', address: 'Address 14 In somewhere', phone: '555-1234-580' },
            { id: '15', name: 'Mike Taylor', age: 39, email: 'mike_taylor@mail.test', address: 'Address 15 In somewhere', phone: '555-1234-581' },
            { id: '16', name: 'Nina Moore', age: 32, email: 'nina_moore@mail.test', address: 'Address 16 In somewhere', phone: '555-1234-582' },
            { id: '17', name: 'Oscar Jackson', age: 28, email: 'oscar_jackson@mail.test', address: 'Address 17 In somewhere', phone: '555-1234-583' },
            { id: '18', name: 'Paula Martin', age: 36, email: 'paula_martin@mail.test', address: 'Address 18 In somewhere', phone: '555-1234-584' },
            { id: '19', name: 'Quinn Lee', age: 30, email: 'quinn_lee@mail.test', address: 'Address 19 In somewhere', phone: '555-1234-585' },
            { id: '20', name: 'Rachel White', age: 27, email: 'rachel_white@mail.test', address: 'Address 20 In somewhere', phone: '555-1234-586' },
            { id: '21', name: 'Steve Harris', age: 33, email: 'steve_harris@mail.test', address: 'Address 21 In somewhere', phone: '555-1234-587' }
        ] as Array<ITableModel>;
    }
}