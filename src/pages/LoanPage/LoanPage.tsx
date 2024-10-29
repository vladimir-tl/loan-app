import React, {useRef} from 'react';
import './LoanPage.css';
import LoanCalculator from "../../components/LoanCalculator/LoanCalculator";
import ImageElement from "../../components/ImageElement/ImageElement";
import {scrollToElement} from "../../util/elementUtils";

interface LoanCalculatorProps {
  showLoginPopup: (amount: number, period: number, monthlyPayment: string) => void;
}

const LoanPage: React.FC<LoanCalculatorProps> = ({showLoginPopup}) => {

  const loanCalculatorRef = useRef<HTMLDivElement>(null);

  return (
      <div className="LoanPage">
        <LoanCalculator ref={loanCalculatorRef}
                        showLoginPopup={showLoginPopup}/>
        <ImageElement id={'image-1'}
                      buttonText={'Apply for loan'}
                      imageRef={'photo-1.jpg'}
                      onClickButton={scrollToElement(loanCalculatorRef)}/>
        <ImageElement id={'image-2'}
                      buttonText={'Apply for loan'}
                      imageRef={'photo-2.jpg'}
                      onClickButton={scrollToElement(loanCalculatorRef)}/>
      </div>
  );
};

export default LoanPage;