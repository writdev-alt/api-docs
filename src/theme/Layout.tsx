import React from 'react';
import Layout from '@theme-original/Layout';
import {SpeedInsights} from '@vercel/speed-insights/react';

export default function LayoutWrapper(props: React.ComponentProps<typeof Layout>) {
  return (
    <>
      <Layout {...props} />
      <SpeedInsights />
    </>
  );
}

