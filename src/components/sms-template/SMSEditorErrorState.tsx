import React from 'react';
import { EmptyState, Button } from '@shopify/polaris';
import { useTranslation } from 'react-i18next';

interface SMSEditorErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function SMSEditorErrorState({
  error,
  onRetry
}: SMSEditorErrorStateProps) {
  const { t } = useTranslation('sms-template');
  return (
    <EmptyState
      heading={t('errorState.heading')}
      action={{
        content: t('errorState.tryAgainButton'),
        onAction: onRetry,
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>
        {t('errorState.description', { error })}
      </p>
    </EmptyState>
  );
}
