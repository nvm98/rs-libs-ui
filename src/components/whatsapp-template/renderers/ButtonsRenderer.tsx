import React from 'react';
import { WhatsAppButton } from '../types/whatsapp-block-type.type';

interface ButtonsRendererProps {
  block: {
    buttons: WhatsAppButton[];
  };
}

export const ButtonsRenderer: React.FC<ButtonsRendererProps> = ({ block }) => {
  if (!block.buttons || block.buttons.length === 0) {
    return null;
  }

  // Giới hạn tối đa 3 button như WhatsApp thật
  const buttons = block.buttons.slice(0, 3);

  return (
    <div>
      {buttons.map((button, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px 6px',
            backgroundColor: 'transparent',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            // borderBottom: index < buttons.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            color: '#21C063',
            fontSize: '14.2px',
            fontWeight: '400',
            cursor: 'pointer',
            textAlign: 'center',
            minHeight: '44px',
            position: 'relative',
            transition: 'background-color 0.1s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {/* Icon based on button type */}
          <span style={{
            marginRight: '8px',
            fontSize: '16px'
          }}>
            <svg viewBox="0 0 19 18" height="18" width="19" preserveAspectRatio="xMidYMid meet" version="1.1"><title>launch</title><path d="M14,5.41421356 L9.70710678,9.70710678 C9.31658249,10.0976311 8.68341751,10.0976311 8.29289322,9.70710678 C7.90236893,9.31658249 7.90236893,8.68341751 8.29289322,8.29289322 L12.5857864,4 L10,4 C9.44771525,4 9,3.55228475 9,3 C9,2.44771525 9.44771525,2 10,2 L14,2 C15.1045695,2 16,2.8954305 16,4 L16,8 C16,8.55228475 15.5522847,9 15,9 C14.4477153,9 14,8.55228475 14,8 L14,5.41421356 Z M14,12 C14,11.4477153 14.4477153,11 15,11 C15.5522847,11 16,11.4477153 16,12 L16,13 C16,14.6568542 14.6568542,16 13,16 L5,16 C3.34314575,16 2,14.6568542 2,13 L2,5 C2,3.34314575 3.34314575,2 5,2 L6,2 C6.55228475,2 7,2.44771525 7,3 C7,3.55228475 6.55228475,4 6,4 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,13 C4,13.5522847 4.44771525,14 5,14 L13,14 C13.5522847,14 14,13.5522847 14,13 L14,12 Z" fill="currentColor" fillRule="nonzero"></path></svg>
          </span>
          {button.text}
        </div>
      ))}
    </div>
  );
};
