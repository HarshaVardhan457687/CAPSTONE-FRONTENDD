export interface Vendor {
    id: number;
    name: string;
    remainingAmount: number;
    amountPaid: number;
    contactDetails: string;
    type: 'Catering' | 'Venue' | 'Decor' | 'Photography' | 'Entertainment'; 
    eventId: string
  }
  