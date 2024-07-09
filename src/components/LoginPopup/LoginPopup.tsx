import React, { useState } from 'react';
import './LoginPopup.css';
import { AuthResponse } from '../../tests/interfaces/interfaces';

interface LoginPopupProps {
    onContinue: (data: AuthResponse) => void;
    onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onContinue, onClose }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleContinue = () => {
        const mockResponse: AuthResponse = {
            name: 'Илья',
            surname: 'Исаенко',
            communicationLanguage: 'Russian',
            phoneNumber: "+79277507400",
            emailAddress: "ilya@gmail.com",
        };
        onContinue(mockResponse);
    };

    const isFormValid = username.length > 0 && password.length > 0;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Login</h2>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder='Username' 
                    className='login-input'
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder='Password' 
                    className='login-input'
                />
                <button onClick={handleContinue} disabled={!isFormValid}>Continue</button>
            </div>
        </div>
    );
};

export default LoginPopup;
