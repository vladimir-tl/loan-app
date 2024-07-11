import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinalPage.css';
import { FinalPageProps } from '../../tests/interfaces/interfaces';

const FinalPage: React.FC<FinalPageProps> = ({ authData, amount, period, monthlyPayment }) => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState(authData.communicationLanguage);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleContinue = () => {
        setShowSuccessPopup(true);
    };

    const handleOk = () => {
        setShowSuccessPopup(false);
        navigate('/');
    };

    return (
        <div className="FinalPage">
            <h1>Loan Details</h1>
            <p className='score'>Amount: <span>{amount} €</span></p>
            <p className='score'>Monthly Payment: <span>{monthlyPayment} €</span></p>
            <p className='score'>Period: <span>{period} months</span></p>
            <h1>Your Information</h1>
            <div className='input-box'>
                <label className='full-name'>Full Name</label>
                <input type="text" value={`${authData.name} ${authData.surname}`} disabled />
            </div>

            <div className='input-box'>
            <label id='lang'>Communication Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} data-testid="ib-small-loan-calculator-field-language">
                    <option value="English" data-testid="ib-small-loan-calculator-field-language-option-en">English</option>
                    <option value="Russian" data-testid="ib-small-loan-calculator-field-language-option-ru">Russian</option>
                    <option value="Estonian" data-testid="ib-small-loan-calculator-field-language-option-est">Estonian</option>
                </select>
            </div>

            <button onClick={handleContinue}>Continue</button>
            {showSuccessPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <p>Success!</p>
                        <button onClick={handleOk} data-testid="ib-small-loan-calculator-field-ok">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinalPage;
