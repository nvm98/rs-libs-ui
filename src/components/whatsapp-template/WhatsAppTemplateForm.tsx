import React, { useState, useEffect } from 'react';
import {
  Card,
  FormLayout,
  TextField,
  Select,
  Checkbox,
  Button,
  ButtonGroup,
  Text,
  Divider,
  InlineStack,
  BlockStack
} from '@shopify/polaris';
import { WhatsAppTemplate, WhatsAppTemplateConfig, WhatsAppButton } from './types';

interface WhatsAppTemplateFormProps {
  template?: WhatsAppTemplate;
  onTemplateChange: (template: WhatsAppTemplate) => void;
}

export function WhatsAppTemplateForm({ template, onTemplateChange }: WhatsAppTemplateFormProps) {
  const [config, setConfig] = useState<WhatsAppTemplateConfig>({
    body: { text: '' }
  });

  const [templateData, setTemplateData] = useState<Partial<WhatsAppTemplate>>({
    name: '',
    category: 'UTILITY',
    language: 'en',
    status: 'PENDING'
  });

  // Initialize form data when template prop changes
  useEffect(() => {
    if (template) {
      setTemplateData({
        name: template.name,
        category: template.category,
        language: template.language,
        status: template.status,
        description: template.description
      });
      setConfig(template.template || { body: { text: '' } });
    }
  }, [template]);

  // Update parent when form data changes
  useEffect(() => {
    const updatedTemplate: WhatsAppTemplate = {
      ...template,
      ...templateData,
      template: config,
      locale: templateData.language || 'en',
      type: 'whatsapp',
      is_active: true
    } as WhatsAppTemplate;
    
    onTemplateChange(updatedTemplate);
  }, [config, templateData, template, onTemplateChange]);

  const handleTemplateDataChange = (field: keyof WhatsAppTemplate, value: any) => {
    setTemplateData(prev => ({ ...prev, [field]: value }));
  };

  const handleHeaderToggle = (enabled: boolean) => {
    if (enabled) {
      setConfig(prev => ({
        ...prev,
        header: { type: 'TEXT', text: '' }
      }));
    } else {
      setConfig(prev => {
        const { header, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleFooterToggle = (enabled: boolean) => {
    if (enabled) {
      setConfig(prev => ({
        ...prev,
        footer: { text: '' }
      }));
    } else {
      setConfig(prev => {
        const { footer, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleButtonsToggle = (enabled: boolean) => {
    if (enabled) {
      setConfig(prev => ({
        ...prev,
        buttons: [{ type: 'QUICK_REPLY', text: '' }]
      }));
    } else {
      setConfig(prev => {
        const { buttons, ...rest } = prev;
        return rest;
      });
    }
  };

  const addButton = () => {
    setConfig(prev => ({
      ...prev,
      buttons: [...(prev.buttons || []), { type: 'QUICK_REPLY', text: '' }]
    }));
  };

  const removeButton = (index: number) => {
    setConfig(prev => ({
      ...prev,
      buttons: prev.buttons?.filter((_, i) => i !== index)
    }));
  };

  const updateButton = (index: number, button: WhatsAppButton) => {
    setConfig(prev => ({
      ...prev,
      buttons: prev.buttons?.map((b, i) => i === index ? button : b)
    }));
  };

  const categoryOptions = [
    { label: 'Marketing', value: 'MARKETING' },
    { label: 'Utility', value: 'UTILITY' },
    { label: 'Authentication', value: 'AUTHENTICATION' }
  ];

  const headerTypeOptions = [
    { label: 'Text', value: 'TEXT' },
    { label: 'Image', value: 'IMAGE' },
    { label: 'Video', value: 'VIDEO' },
    { label: 'Document', value: 'DOCUMENT' }
  ];

  const buttonTypeOptions = [
    { label: 'Quick Reply', value: 'QUICK_REPLY' },
    { label: 'URL', value: 'URL' },
    { label: 'Phone Number', value: 'PHONE_NUMBER' }
  ];

  return (
    <BlockStack gap="400">
      {/* Template Basic Info */}
      <Card>
        <BlockStack gap="400">
          <Text variant="headingMd" as="h3">Template Information</Text>
          <FormLayout>
            <TextField
              autoComplete='off'
              label="Template Name"
              value={templateData.name || ''}
              onChange={(value) => handleTemplateDataChange('name', value)}
              placeholder="e.g., order_confirmation"
              helpText="Use lowercase letters, numbers, and underscores only"
            />
            <TextField
              autoComplete='off'
              label="Description"
              value={templateData.description || ''}
              onChange={(value) => handleTemplateDataChange('description', value)}
              placeholder="Brief description of this template"
            />
            <Select
              label="Category"
              options={categoryOptions}
              value={templateData.category || 'UTILITY'}
              onChange={(value) => handleTemplateDataChange('category', value)}
            />
          </FormLayout>
        </BlockStack>
      </Card>

      {/* Header Component */}
      <Card>
        <BlockStack gap="400">
          <InlineStack align="space-between">
            <Text variant="headingMd" as="h3">Header (Optional)</Text>
            <Checkbox
              label="Enable header"
              checked={!!config.header}
              onChange={handleHeaderToggle}
            />
          </InlineStack>
          
          {config.header && (
            <FormLayout>
              <Select
                label="Header Type"
                options={headerTypeOptions}
                value={config.header.type}
                onChange={(value) => setConfig(prev => ({
                  ...prev,
                  header: { ...prev.header!, type: value as any }
                }))}
              />
              
              {config.header.type === 'TEXT' ? (
                <TextField
                  autoComplete='off'
                  label="Header Text"
                  value={config.header.text || ''}
                  onChange={(value) => setConfig(prev => ({
                    ...prev,
                    header: { ...prev.header!, text: value }
                  }))}
                  placeholder="Header text (can include variables like {{1}})"
                />
              ) : (
                <TextField
                  autoComplete='off'
                  label="Media URL"
                  value={config.header.media_url || ''}
                  onChange={(value) => setConfig(prev => ({
                    ...prev,
                    header: { ...prev.header!, media_url: value }
                  }))}
                  placeholder="URL to your media file"
                />
              )}
            </FormLayout>
          )}
        </BlockStack>
      </Card>

      {/* Body Component */}
      <Card>
        <BlockStack gap="400">
          <Text variant="headingMd" as="h3">Body (Required)</Text>
          <TextField
            autoComplete='off'
            label="Body Text"
            value={config.body.text}
            onChange={(value) => setConfig(prev => ({
              ...prev,
              body: { ...prev.body, text: value }
            }))}
            multiline={4}
            placeholder="Your message text. Use {{1}}, {{2}}, etc. for variables"
            helpText="This is the main content of your message. Variables like {{1}} will be replaced with actual values when sent."
          />
        </BlockStack>
      </Card>

      {/* Footer Component */}
      <Card>
        <BlockStack gap="400">
          <InlineStack align="space-between">
            <Text variant="headingMd" as="h3">Footer (Optional)</Text>
            <Checkbox
              label="Enable footer"
              checked={!!config.footer}
              onChange={handleFooterToggle}
            />
          </InlineStack>
          
          {config.footer && (
            <TextField
              autoComplete='off'
              label="Footer Text"
              value={config.footer.text}
              onChange={(value) => setConfig(prev => ({
                ...prev,
                footer: { text: value }
              }))}
              placeholder="Footer text (no variables allowed)"
              helpText="Footer text must be static - no variables allowed"
            />
          )}
        </BlockStack>
      </Card>

      {/* Buttons Component */}
      <Card>
        <BlockStack gap="400">
          <InlineStack align="space-between">
            <Text variant="headingMd" as="h3">Buttons (Optional)</Text>
            <Checkbox
              label="Enable buttons"
              checked={!!config.buttons}
              onChange={handleButtonsToggle}
            />
          </InlineStack>
          
          {config.buttons && (
            <BlockStack gap="300">
              {config.buttons.map((button, index) => (
                <Card key={index} background="bg-surface-secondary">
                  <BlockStack gap="300">
                    <InlineStack align="space-between">
                      <Text as='p' variant="bodyMd" fontWeight="medium">Button {index + 1}</Text>
                      {config.buttons!.length > 1 && (
                        <Button variant="plain" tone="critical" onClick={() => removeButton(index)}>
                          Remove
                        </Button>
                      )}
                    </InlineStack>
                    
                    <FormLayout>
                      <Select
                        label="Button Type"
                        options={buttonTypeOptions}
                        value={button.type}
                        onChange={(value) => updateButton(index, { ...button, type: value as any })}
                      />
                      
                      <TextField
                        autoComplete='off'
                        label="Button Text"
                        value={button.text}
                        onChange={(value) => updateButton(index, { ...button, text: value })}
                        placeholder="Button label"
                      />
                      
                      {button.type === 'URL' && (
                        <TextField
                          autoComplete='off'
                          label="URL"
                          value={button.url || ''}
                          onChange={(value) => updateButton(index, { ...button, url: value })}
                          placeholder="https://example.com (can include variables like {{1}})"
                        />
                      )}
                      
                      {button.type === 'PHONE_NUMBER' && (
                        <TextField
                          autoComplete='off'
                          label="Phone Number"
                          value={button.phone_number || ''}
                          onChange={(value) => updateButton(index, { ...button, phone_number: value })}
                          placeholder="+1234567890"
                        />
                      )}
                    </FormLayout>
                  </BlockStack>
                </Card>
              ))}
              
              {config.buttons.length < 3 && (
                <Button onClick={addButton} variant="secondary">
                  Add Button
                </Button>
              )}
            </BlockStack>
          )}
        </BlockStack>
      </Card>
    </BlockStack>
  );
}
