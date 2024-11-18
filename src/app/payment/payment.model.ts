export class Payment {
    id: string | null;
    vendorId: string;
    amount: number;
    paymentDate: string;
    paymentStatus: string; 
    paymentType: string;  
    referenceNumber: string  

    constructor(    id: string | null,
        vendorId: string,
        amount: number,
        paymentDate: string,
        paymentStatus: string, 
        paymentType: string,  
        referenceNumber: string ){  

            this.id = id; 
            this.vendorId = vendorId 
            this.amount = amount 
            this.paymentDate = paymentDate 
            this.paymentStatus = paymentStatus 
            this.paymentType = paymentType 
            this.referenceNumber = referenceNumber
    }
}