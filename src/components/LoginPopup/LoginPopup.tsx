import React, { useState } from 'react';
import './LoginPopup.css';
import { AuthResponse } from '../../interfaces/interfaces';

interface LoginPopupProps {
    onContinue: (data: AuthResponse) => void;
    onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onContinue, onClose }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleContinue = () => {
        const mockResponse: AuthResponse = {
            name: 'Customer-Name',
            surname: 'Customer-Surname',
            communicationLanguage: 'English',
            phoneNumber: "+3721234567",
            emailAddress: "hello@domain.com",
        };
        onContinue(mockResponse);
    };

    const isFormValid = username.length > 0 && password.length > 0;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <button className="close-button" onClick={onClose} data-testid="login-popup-close-button">×</button>
                <h2>Login</h2>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder='Username' 
                    className='login-input'
                    data-testid="login-popup-username-input"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder='Password' 
                    className='login-input'
                    data-testid="login-popup-password-input"
                />
                <button onClick={handleContinue} disabled={!isFormValid} data-testid="login-popup-continue-button">Continue</button>
            </div>
        </div>
    );
};

export default LoginPopup;
