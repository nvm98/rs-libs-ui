import React from 'react';
import { EmptyState, Button } from '@shopify/polaris';
import { useTranslation } from 'react-i18next';

interface SMSEditorEmptyStateProps {
  templateName?: string;
  onCreateTemplate: () => void;
}

export function SMSEditorEmptyState({
  templateName,
  onCreateTemplate
}: SMSEditorEmptyStateProps) {
  const { t } = useTranslation('sms-template');
  return (
    <div style={{
      padding: '24px'
    }}>
      <EmptyState
        heading={t('emptyState.heading')}
        action={{
          content: t('emptyState.createButton'),
          onAction: onCreateTemplate,
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>
          {templateName
            ? t('emptyState.descriptionWithName', { templateName })
            : t('emptyState.description')
          }
        </p>
      </EmptyState>
    </div>
  );
}
