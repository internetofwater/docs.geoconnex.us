import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import React from "react";
import ThemedImage from "@theme/ThemedImage";

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--4")}>
            <div className="text--center">
              <img
                className={styles.featureImage}
                alt="Contribute your water data to Geoconnex"
                src="point-recolored.png"
              />
            </div>
            <div className="text--center padding-horiz--md">
              <a href="/contributing/overview" style={{ textDecoration: 'underline', color: 'inherit' }}>
              <Heading as="h3">Contribute your water data to Geoconnex</Heading>
              </a>
              <p>
                Advance research by contributing the data your organization
                already collects.
              </p>
            </div>
          </div>
        
          <div className={clsx("col col--4")}>
            <div className="text--center">
              <img
                className={styles.featureImage}
                alt="Access data across organizations"
                src="db-colored.png"
              />
            </div>
            <div className="text--center padding-horiz--md">
            <a href="/access/overview" style={{ textDecoration: 'underline', color: 'inherit' }}>

              <Heading as="h3">Access data across organizations</Heading>
              </a>
              <p>
                Gain broader insights by leveraging common water data standards
                and a common API.
              </p>
            </div>
          </div>

          <div className={clsx("col col--4")}>
            <div className="text--center">
              <ThemedImage
                alt="A collage of data providers for water data"
                sources={{
                  light: "collage.png",
                  dark: "collage-outlined.png",
                }}
                className={styles.featureImage}
              />
            </div>
            <div className="text--center padding-horiz--md">
              <a href="/reference/data-formats/jsonld/overview" style={{ textDecoration: 'underline', color: 'inherit' }}>
              <Heading as="h3">Align on common water data standards</Heading>
              
              </a>
              <p>
                Ensure your organization knows best practices and is part of the
                community effort to standardize the future of water data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
