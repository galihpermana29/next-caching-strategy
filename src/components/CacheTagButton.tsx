'use client';

import { revalidation } from '@/server/revalidate';
import { Button } from 'antd';

const RevalidateButton = ({ tagName }: { tagName: string }) => {
  return (
    <Button type="primary" onClick={() => revalidation(tagName)}>
      Revalidate Tag: {tagName}
    </Button>
  );
};

export default RevalidateButton;
