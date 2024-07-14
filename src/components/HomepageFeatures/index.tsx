import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import React from 'react';

type FeatureItem = {
  title: string;
  img: string;
  description: JSX.Element;
};
 
const FeatureList: FeatureItem[] = [
  {
    title: 'Point Geoconnex to your water data',
    img: "central.png",
    description: (
      <>
        Advance research by contributing the data your organization already collects.
      </>
    ),
  },
  {
    title: 'Explore data across organizations',
    img: "db.png",
    description: (
      <>
        Gain broader insights by leveraging common water data standards and a common API
      </>
    ),
  },

  {
    title: 'Register persistent identifiers',
    img: "persist.png",
    description: (
      <>
        Access common water data in a way that is stable and reusable
      </>
    ),
  },
];

function Feature({ title, img, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* Apply a CSS class for consistent image size */}
        <img className={styles.featureImage} alt={title} src={img} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
