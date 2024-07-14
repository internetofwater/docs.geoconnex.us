import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';

import React from 'react';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const titleStyle = {
    color: '#14325D',
    textShadow: '0px 0px 5px rgba(100, 100, 100, 0.6)',
  };

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title" style={titleStyle}>
          {siteConfig.title}
        </Heading>
        {/* <img src="img/geoconnex-logo.png" /> */}
        <p className="hero__subtitle" style={titleStyle}>{siteConfig.tagline} </p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
