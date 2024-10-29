import React, {useState} from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import LoginPopup from './components/LoginPopup/LoginPopup';
import FinalPage from './pages/FinalPage/FinalPage';
import {AuthResponse} from './interfaces/interfaces';
import LoanPage from "./pages/LoanPage/LoanPage";

const App: React.FC = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [authData, setAuthData] = useState<AuthResponse | null>(null);
    const [loanDetails, setLoanDetails] = useState<{ amount: number, period: number, monthlyPayment: string } | null>(null);
    const navigate = useNavigate();

    const handleShowPopup = () => setShowPopup(true);
    const handleClosePopup = () => setShowPopup(false);
    const handleAuthSuccess = (data: AuthResponse) => {
        setAuthData(data);
        setShowPopup(false);
        navigate('/loan-decision');
    };

    const handleLoanDetails = (amount: number, period: number, monthlyPayment: string) => {
        setLoanDetails({ amount, period, monthlyPayment });
        handleShowPopup();
    };

    return (
        <div className='App'>
            {showPopup && <LoginPopup onContinue={handleAuthSuccess} onClose={handleClosePopup} />}
            <Routes>
                <Route path="/small-loan" element={<LoanPage showLoginPopup={handleLoanDetails} />} />
                <Route path="/loan-decision" element={
                    loanDetails && authData ? 
                    <FinalPage authData={authData} {...loanDetails} /> :
                    <Navigate to="/small-loan" />
                } />
                <Route path="*" element={<Navigate to="/small-loan" />} />
            </Routes>
        </div>
    );
};

export default App;
