import { Box, BlockStack, InlineStack, Text, Button } from "@shopify/polaris";

interface EmailEditorErrorStateProps {
  handleTryAgain: (templateName: string) => void;
  templateName: string;
}

export function EmailEditorErrorState({
  handleTryAgain,
  templateName
}: EmailEditorErrorStateProps) {

  return (
    <Box paddingBlockStart={'800'}>
      <BlockStack gap={'400'}>
        <BlockStack gap={'200'}>
          <Text as="h2" alignment="center" variant="headingLg">Template not found</Text>
          <Text as="p" alignment="center" variant="bodyLg">We couldn't load the template you're looking for. This might be due to a temporary issue or the template may no longer be available.</Text>
        </BlockStack>
        <InlineStack align="center">
          <Button
            variant="primary"
            onClick={() => handleTryAgain(templateName)}
          >
            Try again
          </Button>
        </InlineStack>
      </BlockStack>
    </Box>
  );
}
