import React from 'react';
import {Redirect} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Home(): JSX.Element {
  const {i18n} = useDocusaurusContext();
  const {currentLocale, defaultLocale} = i18n;
  
  const redirectPath = currentLocale === defaultLocale 
    ? '/docs/intro' 
    : `/${currentLocale}/docs/intro`;
    
  return <Redirect to={redirectPath} />;
}

