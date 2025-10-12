import {
  BlockStack,
  TextField,
  Text,
  Divider,
  RangeSlider,
  Box,
  InlineStack,
  Button,
  Select,
} from "@shopify/polaris";
import {
  DeleteIcon,
} from "@shopify/polaris-icons";
import { BlockSettingsComponentProps } from './types/BlockSettingsTypes';
import { SocialLink } from '../types/footer-block.type';
import { useState } from 'react';
import { parsePaddingValue, parsePixelValue } from "@shared/utils/common.util";

// Social media platform options
const socialPlatformOptions = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'TikTok', value: 'tiktok' },
];

// Helper function to get platform icon
const getSocialIcon = (platform: string): any => {
  const icons: Record<string, any> = {
    facebook: <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24ZM26.5016 38.1115V25.0542H30.1059L30.5836 20.5546H26.5016L26.5077 18.3025C26.5077 17.1289 26.6192 16.5001 28.3048 16.5001H30.5581V12H26.9532C22.6231 12 21.0991 14.1828 21.0991 17.8536V20.5551H18.4V25.0547H21.0991V38.1115H26.5016Z" fill="black"/></svg>,
    twitter: <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24ZM23.2812 19.5075L23.3316 20.338L22.4922 20.2363C19.4369 19.8465 16.7677 18.5245 14.5013 16.3043L13.3934 15.2027L13.108 16.0162C12.5036 17.8296 12.8897 19.7448 14.1488 21.0328C14.8203 21.7446 14.6692 21.8463 13.5109 21.4226C13.108 21.287 12.7554 21.1854 12.7219 21.2362C12.6044 21.3548 13.0072 22.8971 13.3262 23.5072C13.7627 24.3546 14.6524 25.1851 15.6261 25.6766L16.4487 26.0664L15.475 26.0833C14.5349 26.0833 14.5013 26.1003 14.6021 26.4562C14.9378 27.5578 16.264 28.7272 17.7413 29.2357L18.7822 29.5916L17.8756 30.1339C16.5326 30.9135 14.9546 31.3542 13.3766 31.3881C12.6211 31.405 12 31.4728 12 31.5237C12 31.6931 14.0481 32.6422 15.24 33.0151C18.8157 34.1167 23.063 33.6422 26.2526 31.7609C28.5189 30.422 30.7852 27.7612 31.8428 25.1851C32.4136 23.8123 32.9844 21.304 32.9844 20.1007C32.9844 19.3211 33.0347 19.2194 33.9748 18.2872C34.5288 17.7449 35.0492 17.1517 35.15 16.9822C35.3178 16.6602 35.3011 16.6602 34.4449 16.9483C33.018 17.4568 32.8165 17.389 33.5216 16.6263C34.042 16.084 34.6631 15.101 34.6631 14.8129C34.6631 14.762 34.4113 14.8468 34.1259 14.9993C33.8238 15.1688 33.1523 15.423 32.6486 15.5756L31.7421 15.8637L30.9195 15.3044C30.4663 14.9993 29.8283 14.6604 29.4926 14.5587C28.6364 14.3214 27.327 14.3553 26.5548 14.6265C24.4563 15.3891 23.1301 17.3551 23.2812 19.5075Z" fill="black"/></svg>,
    instagram: <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.0018 0C17.4837 0 16.6657 0.0285005 14.1056 0.145C11.5506 0.262 9.8066 0.6665 8.28059 1.26C6.70207 1.873 5.36306 2.693 4.02904 4.0275C2.69403 5.3615 1.87402 6.7005 1.25901 8.2785C0.664007 9.805 0.259003 11.5495 0.144002 14.1035C0.0300004 16.6635 0 17.482 0 24C0 30.518 0.0290008 31.3335 0.145002 33.8935C0.262503 36.4485 0.667007 38.1925 1.26001 39.7185C1.87352 41.297 2.69353 42.636 4.02804 43.97C5.36156 45.305 6.70057 46.127 8.27809 46.74C9.8051 47.3335 11.5496 47.738 14.1041 47.855C16.6642 47.9715 17.4817 48 23.9993 48C30.5178 48 31.3333 47.9715 33.8934 47.855C36.4484 47.738 38.1944 47.3335 39.7214 46.74C41.2994 46.127 42.6364 45.305 43.97 43.97C45.305 42.636 46.125 41.297 46.74 39.719C47.33 38.1925 47.735 36.448 47.855 33.894C47.97 31.334 48 30.518 48 24C48 17.482 47.97 16.664 47.855 14.104C47.735 11.549 47.33 9.805 46.74 8.279C46.125 6.7005 45.305 5.3615 43.97 4.0275C42.6349 2.6925 41.2999 1.8725 39.7199 1.26C38.1899 0.6665 36.4449 0.262 33.8899 0.145C31.3298 0.0285005 30.5148 0 23.9947 0H24.0018ZM21.8487 4.325C22.4877 4.324 23.2007 4.325 24.0018 4.325C30.4098 4.325 31.1693 4.348 33.6999 4.463C36.0399 4.57 37.3099 4.961 38.1559 5.2895C39.2759 5.7245 40.0744 6.2445 40.9139 7.0845C41.7539 7.9245 42.2739 8.7245 42.7099 9.8445C43.0385 10.6895 43.43 11.9595 43.5365 14.2995C43.6515 16.8295 43.6765 17.5895 43.6765 23.9945C43.6765 30.3995 43.6515 31.1595 43.5365 33.6895C43.4295 36.0295 43.0385 37.2995 42.7099 38.1445C42.2749 39.2645 41.7539 40.062 40.9139 40.9015C40.0739 41.7415 39.2764 42.2615 38.1559 42.6965C37.3109 43.0265 36.0399 43.4165 33.6999 43.5235C31.1698 43.6385 30.4098 43.6635 24.0018 43.6635C17.5932 43.6635 16.8337 43.6385 14.3036 43.5235C11.9636 43.4155 10.6936 43.0245 9.8471 42.696C8.72709 42.261 7.92708 41.741 7.08707 40.901C6.24707 40.061 5.72706 39.263 5.29106 38.1425C4.96255 37.2975 4.57105 36.0275 4.46455 33.6875C4.34955 31.1575 4.32655 30.3975 4.32655 23.9885C4.32655 17.5795 4.34955 16.8235 4.46455 14.2935C4.57155 11.9535 4.96255 10.6835 5.29106 9.8375C5.72606 8.7175 6.24707 7.9175 7.08707 7.0775C7.92708 6.2375 8.72709 5.7175 9.8471 5.2815C10.6931 4.9515 11.9636 4.5615 14.3036 4.454C16.5177 4.354 17.3757 4.324 21.8487 4.319V4.325Z" fill="black"/><path d="M36.7613 8.25105C36.1916 8.25105 35.6348 8.41998 35.1611 8.73648C34.6875 9.05299 34.3183 9.50284 34.1004 10.0291C33.8824 10.5555 33.8254 11.1346 33.9367 11.6933C34.0479 12.252 34.3223 12.7651 34.7251 13.1679C35.128 13.5706 35.6413 13.8448 36.2 13.9558C36.7588 14.0668 37.3379 14.0097 37.8641 13.7915C38.3903 13.5734 38.8401 13.2041 39.1564 12.7304C39.4728 12.2566 39.6415 11.6997 39.6413 11.13C39.6413 9.54004 38.3513 8.25105 36.7613 8.25105Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23.9501 11.616C17.1436 11.616 11.625 17.1345 11.625 23.941C11.625 30.7475 17.1436 36.2635 23.9501 36.2635C30.7567 36.2635 36.2738 30.7475 36.2738 23.941C36.2738 17.1345 30.7567 11.616 23.9501 11.616ZM24 31.875C28.3493 31.875 31.875 28.3493 31.875 24C31.875 19.6508 28.3493 16.125 24 16.125C19.6508 16.125 16.125 19.6508 16.125 24C16.125 28.3493 19.6508 31.875 24 31.875Z" fill="black"/></svg>,
    linkedin: <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.98693 0C3.57587 0 0 3.58172 0 8V40C0 44.4183 3.57587 48 7.98693 48H39.0131C43.4241 48 47 44.4183 47 40V8C47 3.58172 43.4241 0 39.0131 0H7.98693ZM6.45044 10.7376C6.45044 13.151 8.27723 14.9147 10.5306 14.9147C12.7844 14.9147 14.6112 13.151 14.6112 10.7376C14.6112 8.32453 12.7844 6.55884 10.5306 6.55884C8.27723 6.55884 6.45044 8.32453 6.45044 10.7376ZM33.0838 41.2525H40.1612V26.9552C40.1612 19.8941 35.8936 17.4858 31.9445 17.4858C28.2929 17.4858 25.8122 19.9153 25.1274 21.3385V18.1355H18.321V41.2525H25.3984V28.7192C25.3984 25.3774 27.4569 23.7522 29.557 23.7522C31.5434 23.7522 33.0838 24.9011 33.0838 28.6264V41.2525ZM14.0692 18.1177V41.2347H6.99214V18.1177H14.0692Z" fill="black"/></svg>,
    youtube: <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0ZM11.3362 13.3353C13.875 12.6757 23.99 12.6757 23.99 12.6757C23.99 12.6757 34.1251 12.6757 36.6637 13.3753C38.0431 13.7352 39.1424 14.8345 39.5022 16.2138C40.2018 18.7525 40.1819 24.03 40.1819 24.03C40.1819 24.03 40.1818 29.2875 39.5022 31.8063C39.1424 33.2056 38.0431 34.2849 36.6637 34.6647C34.1251 35.3244 23.99 35.3244 23.99 35.3244C23.99 35.3244 13.895 35.3244 11.3362 34.6447C9.95692 34.2649 8.85761 33.1656 8.4778 31.7863C7.81813 29.2875 7.81812 24.01 7.81812 24.01C7.81812 24.01 7.81813 18.7525 8.4778 16.2138C8.85761 14.8345 9.97691 13.7152 11.3362 13.3353ZM29.1875 24.01L20.7716 19.1525V28.8475L29.1875 24.01Z" fill="black"/></svg>,
    tiktok: <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.4706 37.3231C15.4211 37.8246 16.4797 38.0864 17.5543 38.086C21.1338 38.086 24.0559 35.2387 24.1878 31.69L24.201 0H32.1076C32.1083 0.673085 32.1709 1.34468 32.2945 2.00632H26.5053V2.00742H34.4129C34.4118 4.65963 35.3731 7.22216 37.1185 9.21918L37.1207 9.22173C38.9011 10.3848 40.9821 11.0032 43.1088 11.0012V12.7622C43.8531 12.9216 44.6227 13.0065 45.4142 13.0065V20.9152C41.4667 20.9198 37.6179 19.6821 34.413 17.3775V33.4468C34.413 41.4709 27.8839 48 19.8586 48C17.8601 48.0005 15.883 47.5882 14.0512 46.7889C12.2207 45.9903 10.5749 44.8224 9.21653 43.3584L9.21355 43.3563C5.46035 40.7212 3 36.3633 3 31.4404C3 23.4151 9.52906 16.885 17.5543 16.885C18.2106 16.8881 18.8658 16.9359 19.5156 17.0279V18.9001C19.5613 18.8992 19.6067 18.8976 19.6523 18.8961C19.7207 18.8937 19.7893 18.8913 19.8586 18.8913C20.5148 18.8944 21.1701 18.9422 21.8198 19.0342V27.1068C21.1998 26.9122 20.5435 26.7989 19.8586 26.7989C18.0962 26.801 16.4066 27.5021 15.1605 28.7484C13.9144 29.9947 13.2136 31.6844 13.2119 33.4467C13.212 34.8387 13.6519 36.1951 14.4689 37.3222L14.4706 37.3231ZM6.26428 38.6397C6.93975 40.3996 7.9478 41.9961 9.21034 43.3529C7.9221 41.9743 6.92735 40.371 6.26428 38.6397Z" fill="black"/></svg>,
  };
  return icons[platform.toLowerCase()] || platform.toLowerCase();
};

export function FooterBlockSettings({
  block,
  updateContent,
  updateStyles
}: BlockSettingsComponentProps) {
  const [newSocialPlatform, setNewSocialPlatform] = useState('facebook');
  const [newSocialUrl, setNewSocialUrl] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editPlatform, setEditPlatform] = useState('');
  const [editUrl, setEditUrl] = useState('');

  const addSocialLink = () => {
    if (newSocialUrl.trim()) {
      const currentLinks = block.content.socialLinks || [];
      const newLink: SocialLink = {
        platform: newSocialPlatform,
        url: newSocialUrl.trim()
      };
      updateContent({ socialLinks: [...currentLinks, newLink] });
      setNewSocialUrl('');
      setShowAddForm(false);
    }
  };

  const removeSocialLink = (index: number) => {
    const currentLinks = block.content.socialLinks || [];
    const updatedLinks = currentLinks.filter((_: any, i: number) => i !== index);
    updateContent({ socialLinks: updatedLinks });
  };

  const startEditing = (index: number, link: SocialLink) => {
    setEditingIndex(index);
    setEditPlatform(link.platform);
    setEditUrl(link.url);
  };

  const saveEdit = () => {
    if (editingIndex !== null && editUrl.trim()) {
      const currentLinks = block.content.socialLinks || [];
      const updatedLinks = [...currentLinks];
      updatedLinks[editingIndex] = {
        platform: editPlatform,
        url: editUrl.trim()
      };
      updateContent({ socialLinks: updatedLinks });
      setEditingIndex(null);
      setEditPlatform('');
      setEditUrl('');
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditPlatform('');
    setEditUrl('');
  };

  return (
    <BlockStack gap="300">
      <Text as="h4" variant="headingXs">Content</Text>

      <TextField
        label="Company Information"
        value={block.content.companyInfo || ''}
        onChange={(value) => updateContent({ companyInfo: value })}
        placeholder="© 2024 {{shop_name}}. All rights reserved.&#10;123 Business Street, City, State 12345"
        multiline={4}
        autoComplete="off" />

      <TextField
        label="Unsubscribe Link"
        value={block.content.unsubscribeLink || ''}
        onChange={(value) => updateContent({ unsubscribeLink: value })}
        placeholder="https://example.com/unsubscribe"
        autoComplete="off" />

      <TextField
        label="Preference Link (Optional)"
        value={block.content.preferenceLink || ''}
        onChange={(value) => updateContent({ preferenceLink: value })}
        placeholder="https://example.com/preferences"
        autoComplete="off" />

      <Divider />

      <Text as="h4" variant="headingXs">Social Media Links</Text>

      <BlockStack gap="200">
        {(block.content.socialLinks || []).map((link: any, index: number) => (
          <div
            key={index}
            style={{
              padding: '6px 0px',
              backgroundColor: '#fafbfb',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f6f6f7';
              e.currentTarget.style.borderColor = '#c9cccf';
              const buttons = e.currentTarget.querySelector('.action-buttons') as HTMLElement;
              if (buttons) buttons.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fafbfb';
              e.currentTarget.style.borderColor = '#e1e3e5';
              const buttons = e.currentTarget.querySelector('.action-buttons') as HTMLElement;
              if (buttons) buttons.style.opacity = '0';
            }}
            onClick={() => editingIndex !== index && startEditing(index, link)}
          >
            {editingIndex === index ? (
              <BlockStack gap="200">
                <Select
                  label=""
                  options={socialPlatformOptions}
                  value={editPlatform}
                  onChange={setEditPlatform}
                />
                <TextField
                  label=""
                  value={editUrl}
                  onChange={setEditUrl}
                  placeholder="https://facebook.com/your-page"
                  autoComplete="off"
                />
                <InlineStack gap="200">
                  <Button size="micro" onClick={saveEdit}>Save</Button>
                  <Button size="micro" variant="plain" onClick={cancelEdit}>Cancel</Button>
                </InlineStack>
              </BlockStack>
            ) : (
              <InlineStack blockAlign="center" align="space-between" gap="200">
                <InlineStack blockAlign="center" gap="200">
                  <span style={{ fontSize: '16px' }}>{getSocialIcon(link.platform)}</span>
                  <Text as="p" variant="bodyMd" fontWeight="medium">
                    {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                  </Text>
                </InlineStack>
                <InlineStack blockAlign="center" gap="100">
                  <div
                    className="action-buttons"
                    style={{
                      display: 'flex',
                      gap: '4px',
                      opacity: 0,
                      transition: 'opacity 0.2s ease'
                    }}
                  >
                    <Button
                      size="micro"
                      variant="plain"
                      tone="critical"
                      icon={DeleteIcon}
                      onClick={() => removeSocialLink(index)}
                    />
                  </div>
                </InlineStack>
              </InlineStack>
            )}
          </div>
        ))}
      </BlockStack>

      <Box paddingBlockStart="300">
        <Button
          variant="plain"
          onClick={() => setShowAddForm(!showAddForm)}
          fullWidth
        >
          + Add Social Link
        </Button>
      </Box>

      {showAddForm && (
        <Box paddingBlockStart="200">
          <Box>
            <BlockStack gap="300">
              <Select
                label="Platform"
                options={socialPlatformOptions}
                value={newSocialPlatform}
                onChange={setNewSocialPlatform}
              />
              <TextField
                label="URL"
                value={newSocialUrl}
                onChange={setNewSocialUrl}
                placeholder="https://facebook.com/your-page"
                autoComplete="off"
              />
              <InlineStack gap="200">
                <Button onClick={addSocialLink}>Add</Button>
                <Button variant="plain" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </InlineStack>
            </BlockStack>
          </Box>
        </Box>
      )}

      <Divider />

      <Text as="h4" variant="headingXs">Styling</Text>

      <Box>
        <Text as="p" variant="bodyMd" tone="base">Background Color</Text>
        <Box paddingBlockStart="100">
          <input
            type="color"
            value={block.content.backgroundColor || '#f8f9fa'}
            onChange={(e) => updateContent({ backgroundColor: e.target.value })}
            style={{
              width: '100%',
              height: '36px',
              border: '1px solid #c9cccf',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          />
        </Box>
      </Box>

      <Box>
        <Text as="p" variant="bodyMd" tone="base">Text Color</Text>
        <Box paddingBlockStart="100">
          <input
            type="color"
            value={block.styles.color || '#6c757d'}
            onChange={(e) => updateStyles({ color: e.target.value })}
            style={{
              width: '100%',
              height: '36px',
              border: '1px solid #c9cccf',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          />
        </Box>
      </Box>

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Font Size</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePixelValue(block.styles.fontSize || '12px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePixelValue(block.styles.fontSize || '12px')}
          min={10}
          max={24}
          step={1}
          onChange={(value) => updateStyles({ fontSize: `${value}px` })}
        />
      </Box>

      <Box>
        <Box paddingBlockEnd="100">
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">Padding</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{parsePaddingValue(block.styles.padding || '24px')}px</Text>
          </InlineStack>
        </Box>
        <RangeSlider
          label=""
          value={parsePaddingValue(block.styles.padding || '24px')}
          min={0}
          max={80}
          step={4}
          onChange={(value) => updateStyles({ padding: `${value}px` })}
        />
      </Box>
    </BlockStack>
  );
}
