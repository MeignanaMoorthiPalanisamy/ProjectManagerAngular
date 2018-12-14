export interface IUserDetail {
    User_ID: number;
    FirstName: string;
    LastName: string;
    Employee_ID: string;
    DisplayItem: string;
}

export interface ICreateProjectDetail {
    Project_Name: string;
    StartDate: string;
    EndDate: string;
    Priority: number;
    User_ID: number;
}

export interface IDisplayProjectDetail {
    Project_Name: string;
    StartDate: string;
    EndDate: string;
    Priority: number;
    User_ID: number;
    Project_Id : number;
}