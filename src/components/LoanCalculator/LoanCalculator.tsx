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
                    setMonthlyPayment(response.data.paymentAmountMonthly + " €");
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

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setPeriod(e.target.value);
    };

    const handleAmountBlur = () => {
        let value = Math.min(Math.max(Number(amount), 500), 10000).toString();
        setAmount(value);
    };

    const renderOptions = () => {
        const options = [];
        for (let i = 12; i <= 36; i++) {
            options.push(
                <option key={i} value={i} data-testid={`ib-small-loan-calculator-button-period-option-${i - 12}`}>
                    {i}
                </option>
            );
        }
        return options;
    };

    return (
        <div className="LoanCalculator">
            <h1>Calculate your monthly payment</h1>
            <p>Estimate your monthly payments based on the chosen loan amount and time period.</p>
            <div className='input-box'>
                <label>Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    onBlur={handleAmountBlur}
                    data-testid="id-small-loan-calculator-field-amount"
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
                <label>Period</label>
                <select value={period} onChange={handlePeriodChange} data-testid="ib-small-loan-calculator-field-period">
                    {renderOptions()}
                </select>
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

            <div className="monthly-payment">Monthly payment <br /> <span>{monthlyPayment}</span></div>
            {error && <div className="error">{error}</div>}
            <button onClick={handleApplyNow} data-testid="id-small-loan-calculator-field-apply">Apply Now</button>
        </div>
    );
};

export default LoanCalculator;
