import React from 'react';
import { Button } from '@shopify/polaris';
import { EditIcon } from '@shopify/polaris-icons';

interface FloatingEditButtonProps {
  onClick: () => void;
}

export const FloatingEditButton: React.FC<FloatingEditButtonProps> = ({ onClick }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        zIndex: 40,
        transition: 'all 0.2s ease'
      }}
    >
      <Button
        onClick={onClick}
        icon={EditIcon}
        accessibilityLabel="Edit template"
      />
    </div>
  );
};
