import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoanCalculator.css';
import { LoanCalcResponse } from '../../tests/interfaces/interfaces';

interface LoanCalculatorProps {
    showLoginPopup: (amount: number, period: number, monthlyPayment: string) => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ showLoginPopup }) => {
    const [amount, setAmount] = useState<number>(500);
    const [period, setPeriod] = useState<number>(12);
    const [monthlyPayment, setMonthlyPayment] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        calculateLoan(amount, period);
    }, [amount, period]);

    const calculateLoan = async (amount: number, period: number) => {
        try {
            const response = await axios.get<LoanCalcResponse>('https://backend.tallinn-learning.ee/api/loan-calc', {
                params: { amount, period }
            });
            if (response.status === 200) {
                setMonthlyPayment(response.data.paymentAmountMonthly);
                setError(null);
            } else {
                setError("Oops, something went wrong");
            }
        } catch (error) {
            setError("Oops, something went wrong");
        }
    };

    const handleApplyNow = () => {
        showLoginPopup(amount, period, monthlyPayment);
    };

    return (
        <div className="LoanCalculator">
            <h1>Calculate your monthly payment</h1>
            <p>Estimate your monthly payments based on the chosen loan amount and time period.</p>
            <div className='input-box'>
                <label data-testid="small-loan-calculator-field-amount">Amount</label>
                <input type="text" value={amount} readOnly />
                <input type="range" min="500" max="10000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                <div className='min-max'>
                    <span>500</span>
                    <span>10000</span>
                </div>
            </div>

            <div className='input-box'>
                <label data-testid="small-loan-calculator-field-period">Period</label>
                <input type="text" value={period} readOnly />
                <input type="range" min="12" max="36" value={period} onChange={(e) => setPeriod(Number(e.target.value))} />
                <div className='min-max'>
                    <span>12</span>
                    <span>36</span>
                </div>
            </div>

            <div className="monthly-payment">Monthly payment <br/> {monthlyPayment}</div>
            {error && <div className="error">{error}</div>}
            <button onClick={handleApplyNow}>Apply Now</button>
        </div>
    );
};

export default LoanCalculator;
