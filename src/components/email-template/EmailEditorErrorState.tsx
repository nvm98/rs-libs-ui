import { Box, BlockStack, InlineStack, Text, Button } from "@shopify/polaris";
import { useTranslation } from "react-i18next";

interface EmailEditorErrorStateProps {
  templateName: string;
  handleTryAgain: (templateName: string) => void;
}

export function EmailEditorErrorState({
  templateName,
  handleTryAgain,
}: EmailEditorErrorStateProps) {
  const { t } = useTranslation('email-template');

  return (
    <Box paddingBlockStart={'800'}>
      <BlockStack gap={'400'}>
        <Box padding={'200'}>
          <BlockStack gap={'200'}>
            <Text as="h2" alignment="center" variant="headingLg">{t('errorState.title')}</Text>
            <Text as="p" alignment="center" variant="bodyLg">{t('errorState.description')}</Text>
          </BlockStack>
        </Box>
        <InlineStack align="center">
          <Button
            variant="primary"
            onClick={() => handleTryAgain(templateName)}
          >
            {t('errorState.tryAgainButton')}
          </Button>
        </InlineStack>
      </BlockStack>
    </Box>
  );
}
