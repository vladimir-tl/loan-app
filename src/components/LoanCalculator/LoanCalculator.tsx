import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './LoanCalculator.css';
import { LoanCalcResponse } from '../../tests/interfaces/interfaces';

interface LoanCalculatorProps {
    showLoginPopup: (amount: number, period: number, monthlyPayment: string) => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ showLoginPopup }) => {
    const [amount, setAmount] = useState<string>('500');
    const [period, setPeriod] = useState<string>('12');
    const [monthlyPayment, setMonthlyPayment] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
            calculateLoan(Number(amount), Number(period));
        }, 500);
    }, [amount, period]);

    const calculateLoan = async (amount: number, period: number) => {
        try {
            setLoading(true);
            const response = await axios.get<LoanCalcResponse>('https://backend.tallinn-learning.ee/api/loan-calc', {
                params: { amount, period }
            });

            const delay = Math.random() * 500 + 1000;

            setTimeout(() => {
                if (response.status === 200) {
                    setMonthlyPayment(response.data.paymentAmountMonthly);
                    setError(null);
                } else {
                    setError("Oops, something went wrong");
                }
                setLoading(false);
            }, delay);

        } catch (error) {
            setError("Oops, something went wrong");
            setLoading(false);
        }
    };

    const handleApplyNow = () => {
        showLoginPopup(Number(amount), Number(period), monthlyPayment);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPeriod(e.target.value);
    };

    const handleAmountBlur = () => {
        let value = Math.min(Math.max(Number(amount), 500), 10000).toString();
        setAmount(value);
    };

    const handlePeriodBlur = () => {
        let value = Math.min(Math.max(Number(period), 12), 36).toString();
        setPeriod(value);
    };

    return (
        <div className="LoanCalculator">
            <h1>Calculate your monthly payment</h1>
            <p>Estimate your monthly payments based on the chosen loan amount and time period.</p>
            <div className='input-box'>
                <label data-testid="small-loan-calculator-field-amount">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    onBlur={handleAmountBlur}
                />
                <input
                    type="range"
                    min="500"
                    max="10000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <div className='min-max'>
                    <span>500</span>
                    <span>10000</span>
                </div>
            </div>

            <div className='input-box'>
                <label data-testid="small-loan-calculator-field-period">Period</label>
                <input
                    type="number"
                    value={period}
                    onChange={handlePeriodChange}
                    onBlur={handlePeriodBlur}
                />
                <input
                    type="range"
                    min="12"
                    max="36"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                />
                <div className='min-max'>
                    <span>12</span>
                    <span>36</span>
                </div>
            </div>

            <div className="monthly-payment">Monthly payment <br /> {monthlyPayment}</div>
            {error && <div className="error">{error}</div>}
            <button onClick={handleApplyNow}>Apply Now</button>
        </div>
    );
};

export default LoanCalculator;
