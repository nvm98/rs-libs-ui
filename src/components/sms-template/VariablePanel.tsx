import React from 'react';
import { Box, Text, Button, BlockStack } from '@shopify/polaris';

interface VariablePanelProps {
  showVariables: boolean;
  setShowVariables: (show: boolean) => void;
}

export const VariablePanel: React.FC<VariablePanelProps> = ({
  showVariables,
  setShowVariables
}) => {
  const variables = [
    { name: 'customer_name', example: 'John Doe' },
    { name: 'order_number', example: '#1001' },
    { name: 'product_name', example: 'iPhone 15' },
    { name: 'total_amount', example: '$999.00' },
    { name: 'shop_name', example: 'My Store' }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e1e3e5',
      transform: showVariables ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.3s ease',
      zIndex: 100,
      maxHeight: '40vh',
      overflowY: 'auto'
    }}>
      <Box padding="400">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Text as="h3" variant="headingSm">Available Variables</Text>
          <Button onClick={() => setShowVariables(false)} variant="plain">×</Button>
        </div>
        
        <BlockStack gap="200">
          {variables.map((variable) => (
            <div
              key={variable.name}
              style={{
                padding: '8px 12px',
                border: '1px solid #e1e3e5',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => {
                navigator.clipboard.writeText(`{{${variable.name}}}`);
              }}
            >
              <Text as="span" variant="bodyMd" fontWeight="semibold">
                {`{{${variable.name}}}`}
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Example: {variable.example}
              </Text>
            </div>
          ))}
        </BlockStack>
      </Box>
      
      <div style={{
        position: 'absolute',
        bottom: '100%',
        right: '20px',
        marginBottom: '8px'
      }}>
        <Button
          onClick={() => setShowVariables(!showVariables)}
          variant="primary"
          size="slim"
        >
          {showVariables ? 'Hide Variables' : 'Show Variables'}
        </Button>
      </div>
    </div>
  );
};
