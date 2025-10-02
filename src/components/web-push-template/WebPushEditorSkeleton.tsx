import React from 'react';
import { Card, SkeletonBodyText, SkeletonDisplayText, Layout, Box } from '@shopify/polaris';

export function WebPushEditorSkeleton() {
  return (
    <Layout>
      <Layout.Section variant="oneHalf">
        <Card>
          <Box padding="400">
            <SkeletonDisplayText size="small" />
            <Box paddingBlockStart="200">
              <SkeletonBodyText lines={2} />
            </Box>
          </Box>
        </Card>
        <Box paddingBlockStart="400">
          <Card>
            <Box padding="400">
              <SkeletonDisplayText size="small" />
              <Box paddingBlockStart="200">
                <SkeletonBodyText lines={3} />
              </Box>
            </Box>
          </Card>
        </Box>
      </Layout.Section>
      <Layout.Section variant="oneHalf">
        <Card>
          <Box padding="400">
            <SkeletonDisplayText size="medium" />
            <Box paddingBlockStart="400">
              <SkeletonBodyText lines={4} />
            </Box>
          </Box>
        </Card>
      </Layout.Section>
    </Layout>
  );
}
