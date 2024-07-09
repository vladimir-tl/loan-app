export interface LoanCalcResponse {
    paymentAmountMonthly: string;
}

// export interface AuthRequest {
//     username: string;
//     password: string;
// }

export interface AuthResponse {
    name: string;
    surname: string;
    communicationLanguage: string;
    phoneNumber: string;
    emailAddress: string;
}

export interface FinalPageProps {
    authData: {
        name: string;
        surname: string;
        communicationLanguage: string;
    };
    amount: number;
    period: number;
    monthlyPayment: string;
}
