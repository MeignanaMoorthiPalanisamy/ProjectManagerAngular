export interface ICreateTask{
    Parent_ID: number;
    Project_ID: number;
    Task_Name: string;
    Start_Date: string;
    End_Date:string;
    Priority: number;
    Status: string;
    User_ID: number;
}

export interface IUserDetail {
    User_ID: number;
    FirstName: string;
    LastName: string;
    Employee_ID: string;
    DisplayItem: string;
}

export interface IDisplayProjectDetail {
    Project_Name: string;
    Project_Id : number;
}

export interface IDisplayParentTaskDetail {
    Parent_Task_Name: string;
    Parent_ID : number;
}

export interface IEditTask{
    Parent_ID: number;
    Project_ID: number;
    Task_Name: string;
    Task_ID: number;
    Start_Date: string;
    End_Date:string;
    Priority: number;
    Status: string;
    User_ID: number;
}