export interface IDisplayTask{
    Parent_Task_Name: number;
    Task_ID: number;
    Task_Name: string;
    Start_Date: string;
    End_Date:string;
    Priority: number;
    Status: string;
}

export interface IDisplayProjectDetail {
    Project_Name: string;
    Project_Id : number;
}
