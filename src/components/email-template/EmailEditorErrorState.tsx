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
    <BlockStack>
        <Text as="h2" variant="heading2xl">Template not found</Text>
        <Text as="p" variant="bodyLg">We couldn't load the template you're looking for. This might be due to a temporary issue or the template may no longer be available.</Text>
        <Button
          variant="primary"
          onClick={() => handleTryAgain(templateName)}
        >
          Try again
        </Button>
    </BlockStack>
  );
}
