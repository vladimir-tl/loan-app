import React from "react";
import './ImageElement.css';
import Container from "../Container/Container";

interface ImageContainerProps {
  id: string;
  imageRef: string;
  buttonText?: string;
  onClickButton: () => void
}

const ImageElement: React.FC<ImageContainerProps> = ({ id, buttonText, imageRef, onClickButton }) => {
  return (
      <Container>
        <div className="ImageContainer" style={{ backgroundImage: `url('/images/${imageRef}')` }}>
          {buttonText && (
              <button data-testid={`id-image-element-button-${id}`} onClick={onClickButton}>
                {buttonText}
              </button>
          )}
        </div>
      </Container>
  );
}
export default ImageElement;