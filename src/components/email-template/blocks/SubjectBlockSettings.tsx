import {
  BlockStack,
  TextField,
  Text,
  Divider
} from "@shopify/polaris";
import { BlockSettingsComponentProps } from './types/BlockSettingsTypes';
import { SubjectBlock } from "@email-template/types";

export function SubjectBlockSettings({
  block,
  updateContent
}: BlockSettingsComponentProps<SubjectBlock>) {
  return (
    <BlockStack gap="300">
      <Text as="h4" variant="headingXs">Email Subject</Text>
      
      <TextField
        label="Subject Line"
        value={block.content.subjectLine || ''}
        onChange={(value) => updateContent({ ...block.content, subjectLine: value })}
        placeholder="Enter email subject line"
        autoComplete="off"
        helpText="This will be displayed as the email subject"
      />

      <TextField
        label="Preview Text"
        value={block.content.previewText || ''}
        onChange={(value) => updateContent({ ...block.content, previewText: value })}
        placeholder="Enter preview text"
        autoComplete="off"
        helpText="This text appears in the email preview in most email clients"
        multiline={2}
      />
    </BlockStack>
  );
}
