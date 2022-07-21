import React from 'react';
import ButtonPrimary from './ButtonPrimary';

export default function PageTitleButton({
  title, onClick, disabled, color,
}) {
  return (
    <div className="ml-4 mt-2 flex-shrink-0">
      <ButtonPrimary disabled={disabled} onClick={onClick} color={color}>
        {title}
      </ButtonPrimary>
    </div>
  );
}
