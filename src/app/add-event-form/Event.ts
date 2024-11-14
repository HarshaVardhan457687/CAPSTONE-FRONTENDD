export class Event {
    id: any;
    userId: string;
    name: string;
    location: string;
    startDate: string; 
    endDate: string; 
    type: number;
    status: number; 
    description: string;
    totalTask:number
    taskCompleted: number
    totalGuests: number

  
    constructor(
      id: any,
      userId: string,
      name: string,
      location: string,
      startDate: string,
      endDate: string,
      type: number,
      status: number, 
      description: string, 
      totalTask:number,
      taskCompleted: number,
      totalGuests: number,
    ) {
      this.id = id;
      this.userId = userId;
      this.name = name;
      this.location = location;
      this.startDate = startDate;
      this.endDate = endDate;
      this.type = type;
      this.status = status; 
      this.description = description; 
      this.totalTask = totalTask
      this.taskCompleted = taskCompleted
      this.totalGuests = totalGuests
    }
  }
  
  