export class Guest {
    id: any;
    name: string;
    contactEmail: string;
    dietaryPreference: number;  
    rsvpStatus: number;         
    eventId: string;
  
    constructor(
      id: any,
      name: string,
      contactEmail: string,
      dietaryPreference: number,
      rsvpStatus: number,
      eventId: string
    ) {
      this.id = id;
      this.name = name;
      this.contactEmail = contactEmail;
      this.dietaryPreference = dietaryPreference;
      this.rsvpStatus = rsvpStatus;
      this.eventId = eventId;
    }
  }