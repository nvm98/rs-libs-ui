import React from 'react';
import { EmptyState, Button } from '@shopify/polaris';

interface SMSEditorErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function SMSEditorErrorState({
  error,
  onRetry
}: SMSEditorErrorStateProps) {
  return (
    <EmptyState
      heading="Something went wrong"
      action={{
        content: 'Try again',
        onAction: onRetry,
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>
        We couldn't load your SMS template. {error}
      </p>
    </EmptyState>
  );
}
