import React from 'react';
import { EmptyState, Button } from '@shopify/polaris';

interface SMSEditorEmptyStateProps {
  templateName?: string;
  onCreateTemplate: () => void;
}

export function SMSEditorEmptyState({
  templateName,
  onCreateTemplate
}: SMSEditorEmptyStateProps) {
  return (
    <div style={{
      padding: '24px'
    }}>
      <EmptyState
        heading="Create your first SMS template"
        action={{
          content: 'Create template',
          onAction: onCreateTemplate,
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>
          {templateName 
            ? `Start creating your SMS template "${templateName}" by adding content blocks.`
            : 'Start creating your SMS template by adding content blocks.'
          }
        </p>
      </EmptyState>
    </div>
  );
}
