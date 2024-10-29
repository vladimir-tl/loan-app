import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinalPage.css';
import { FinalPageProps } from '../../interfaces/interfaces';

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
            <p className='score'>Amount: <span data-testid="final-page-amount">{amount} €</span></p>
            <p className='score'>Monthly Payment: <span data-testid="final-page-monthly-payment">{monthlyPayment}</span></p>
            <p className='score'>Period (month): <span data-testid="final-page-period">{period} months</span></p>
            <h1>Your Information</h1>
            <div className='input-box'>
                <label className='full-name'>Full Name</label>
                <input type="text" value={`${authData.name} ${authData.surname}`} disabled data-testid="final-page-full-name" />
            </div>

            <div className='input-box'>
                <label id='lang'>Communication Language</label>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    data-testid="final-page-communication-language"
                >
                    <option value="English" data-testid="final-page-communication-language-option-en">English</option>
                    <option value="Russian" data-testid="final-page-communication-language-option-ru">Russian</option>
                    <option value="Estonian" data-testid="final-page-communication-language-option-est">Estonian</option>
                </select>
            </div>

            <button onClick={handleContinue} data-testid="final-page-continue-button">Continue</button>
            {showSuccessPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <p>Success!</p>
                        <button onClick={handleOk} data-testid="final-page-success-ok-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinalPage;
