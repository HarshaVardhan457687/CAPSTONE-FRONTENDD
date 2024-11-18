export class Task {
    constructor(
        public id: any,
        public name: string,
        public description: string,
        public status: string,      
        public startDateTime: string,  
        public endDateTime: string,     
        public eventId: string
    ) {}

    isCompleted(): boolean {
        return this.status === 'COMPLETED';
    }

    isPending(): boolean {
        return this.status === 'PENDING';
    }

    isInProgress(): boolean {
        return this.status === 'IN_PROGRESS';
    }

    isCancelled(): boolean {
        return this.status === 'CANCELLED';
    }
}

export type CreateTaskDTO = Omit<Task, 'id'>;