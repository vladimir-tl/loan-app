import React, { useEffect, useRef, useState, forwardRef } from 'react';
import axios from 'axios';
import './LoanCalculator.css';
import { LoanCalcResponse } from '../../interfaces/interfaces';
import Container from "../Container/Container";

interface LoanCalculatorProps {
    showLoginPopup: (amount: number, period: number, monthlyPayment: string) => void;
}

const LoanCalculator = forwardRef<HTMLDivElement, LoanCalculatorProps>(({ showLoginPopup }, ref) => {
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
            // const response = await axios.get<LoanCalcResponse>('https://backend.tallinn-learning.ee/api/loan-calc', {
            //     params: { amount, period }
            // });
            const isLocalhost = window.location.hostname === 'localhost';
            const isCI = process.env.CI === 'true';

            const baseURL = isLocalhost && !isCI
                ? 'http://localhost:8080'
                : 'https://backend.tallinn-learning.ee';

            const response = await axios.get<LoanCalcResponse>(`${baseURL}/api/loan-calc`, {
                params: { amount, period },
            });

            // const delay = Math.random() * 500 + 1000;
            // imitate zero delay
            const delay = 0

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

    const renderOptions = () => {
        const options = [];
        for (let i = 12; i <= 36; i+=4) {
            options.push(
                <option key={i} value={i} data-testid={`ib-small-loan-calculator-button-period-option-${i - 12}`}>
                    {i}
                </option>
            );
        }
        return options;
    };

    return (
        <Container ref={ref}>
            <h1>Calculate your monthly payment</h1>
            <p>Estimate your monthly payments based on the chosen loan amount and time period.</p>
            <div className='input-box'>
                <label>Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    data-testid="id-small-loan-calculator-field-amount"
                />
                <input
                    type="range"
                    min="500"
                    max="10000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    data-testid="id-small-loan-calculator-field-amount-slider"
                />
                <div className='min-max'>
                    <span>500</span>
                    <span>10000</span>
                </div>
            </div>

            <div className='input-box'>
                <label className='period-label'>Period (month)</label>
                <select value={period} onChange={handlePeriodChange} data-testid="ib-small-loan-calculator-field-period">
                    {renderOptions()}
                </select>
                <input
                    type="range"
                    min="12"
                    max="36"
                    step={4}
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    data-testid="ib-small-loan-calculator-field-period-slider"
                />
                <div className='min-max'>
                    <span>12</span>
                    <span>36</span>
                </div>
            </div>

            <div className="monthly-payment">Monthly payment <br /> <span data-testid="ib-small-loan-calculator-field-monthlyPayment">{monthlyPayment}</span></div>
            {error && <div className="error" data-testid="id-small-loan-calculator-field-error">{error}</div>}
            <button onClick={handleApplyNow} data-testid="id-small-loan-calculator-field-apply">Apply Now</button>
        </Container>
    );
});

export default LoanCalculator;
