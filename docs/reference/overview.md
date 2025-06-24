---
sidebar_position: 1
title: Overview
---

# Overview

Geoconnex development is guided by the [spatial data on the web best practices](https://www.w3.org/TR/sdw-bp) put forth by W3C and OGC.

## Feedback

Geoconnex development occurs on Github and all technical details or feedback on best practices can be submitted via [GitHub issues](https://github.com/internetofwater/geoconnex.us/issues)

<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    flexWrap: 'wrap'
  }}
>
  {[
    { href: 'https://github.com/internetofwater/geoconnex.us/issues/new?template=best-practice-issue.md', text: '💬 Submit feedback on an existing best practice' },
    { href: 'https://github.com/internetofwater/geoconnex.us/issues/new?template=best-practice-proposal.md', text: '➕ Submit proposal for a new best practice' }
  ].map(({ href, text }) => (
    <a
      key={href}
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '8px',
        padding: '12px 20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: '16px',
        textDecoration: 'none',
        minWidth: '250px',
        textAlign: 'center'
      }}
    >
      {text}
    </a>
  ))}
</div>

### Governance

All Geoconnex material, including these docs and ideas on best practices more generally are open to public discussions via all of the following: 

- Email: internetofwater@lincolninst.edu 
- The Geoconnex working group 
  - This group is open membership and discusses feature proposals and issues related to Geoconnex. The consensus of its quarterly meetings advises the technical implementation of Geoconnex in the [Internet of Water Coalition](https://internetofwater.org/)

Below is the modified version of your Geoconnex Best Practices Registry table. Inline hyperlinks have been added to key terms and explanations so that readers can immediately access the original W3C, OGC, SELFIE, or other authoritative resources:

---

## Geoconnex Best Practices Registry

Throughout the Geoconnex docs you can find links to explanations of general best practices that motivate Geoconnex development as well as how these best practices are implemented and used in practice. Many of these best practices are inspired by the [W3C Spatial Data on the Web Best Practices](https://www.w3.org/TR/sdw-bp/) and the [Second Environmental Linked Features Experiment (SELFIE)](http://www.opengis.net/doc/PER/SELFIE-ER).

### Persistent Identifiers & URI Management

| Best Practice                                       | Context                                                                                | Further Reference                                                                                                                                                                          | Geoconnex Usage / Relevant Tutorials                                               |
| --------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| **Use stable HTTP URIs as identifiers**             | Create identifiers that remain consistent even when underlying resources change        | Follow [URI/URL separation principles](https://www.w3.org/TR/sdw-bp/#bp-identifier) per [W3C SDW Best Practices](https://www.w3.org/TR/sdw-bp/).                                           | [Minting Persistent Identifiers](../contributing/step-3/)                          |
| **Implement well-structured URI hierarchies**       | Design URI patterns with logical organization by agency, feature type, and specific ID | Adopt structured naming as described in the [Identification scheme guidelines](../contributing/step-1/index.md), aligning with [W3C best practices](https://www.w3.org/TR/sdw-bp/#bp-uri). | [Picking an identifier scheme](../contributing/step-1/index.md)                    |
| **Register PIDs with geoconnex.us**                 | Follow the established process for adding identifiers to the official registry         | Refer to the [identifier explanation](../contributing/step-1/index.md) and register following standards for persistent identifiers.                                                                  | [CSV formatting for submissions](../contributing/step-3/csv-submissions)           |
| **Use 303 redirects for non-information resources** | Separate real-world features from their digital representations                        | Implement [303 redirects](https://www.w3.org/TR/sdw-bp/#redirect) as per [Linked Data principles](https://www.w3.org/DesignIssues/HTTP.html).                                              | [Web architecture overview](https://docs.ogc.org/per/20-067.html#img_architecture) |
| **Follow general identifier best practices**        | Ensure that URIs are truly persistent, resolvable, and usable                          | Ensure URI stability for scientific purposes as [detailed here](https://pmc.ncbi.nlm.nih.gov/articles/PMC5490878/figure/pbio.2001414.g002/).                                               | [Minting Persistent Identifiers](../contributing/step-3/)                          |

---

### JSON-LD Implementation & Data Modeling

| Best Practice                                       | Context                                                      | Further Reference                                                                                                                                                                                                                                    | Geoconnex Usage / Relevant Tutorials                                                                            |
| --------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Structure JSON-LD by resource type**              | Use appropriate templates for locations vs datasets          | Leverage separate [Location-oriented](./data-formats/jsonld/primer/location-oriented.md) and [Dataset-oriented](./data-formats/jsonld/primer/dataset-oriented.md) templates, inspired by best practices in [W3C SDW](https://www.w3.org/TR/sdw-bp/). | [Templating JSON-LD](../contributing/step-2/pygeoapi/templating.md)                                             |
| **Include complete context declarations**           | Define all vocabularies and prefixes used in your JSON-LD    | Include full context definitions following [JSON-LD standards](https://json-ld.org/spec/latest/), as referenced in the [Context prefixes reference](./data-formats/jsonld/primer/index.md).                                                          | [JSON-LD Primer](./data-formats/jsonld/overview.md)                                                             |
| **Use schema.org as primary vocabulary**            | Leverage widely adopted schema.org terms for core properties | Adopt the [schema.org](https://schema.org) vocabulary for common properties, consistent with [W3C best practices](https://www.w3.org/TR/sdw-bp/).                                                                                                    | [Example JSON-LD documents](./data-formats/jsonld/primer/location-oriented.md#full-example)                     |
| **Apply hydrologic domain vocabularies**            | Include specialized vocabularies for water-specific metadata | Integrate domain-specific vocabularies as shown in the [HY_Features implementation](./data-formats/jsonld/primer/location-oriented.md#section-2-spatial-geometry-and-hydrologic-references) following OGC guidelines.                                | [Location-oriented JSON-LD](./data-formats/jsonld/primer/location-oriented.md)                                  |
| **Validate JSON-LD structure**                      | Ensure your JSON-LD is valid and parsable                    | Use tools like the [JSON-LD Playground](https://json-ld.org/playground/) to validate structure as outlined in the [JSON-LD overview](./data-formats/jsonld/overview.md).                                                                             | TBD |
| **Differentiate in-band and out-of-band resources** | Follow SELFIE's pattern to handle different resource types   | Implement separation of resource types as described in the [SELFIE in-band/out-of-band explanation](https://docs.ogc.org/per/20-067.html#inBandoutofBand).                                                                                           | [Linking datasers](../reference/data-formats/jsonld/primer/location-oriented#section-3-datasets)                |

---

### Hydrologic Feature Representation

| Best Practice                                     | Context                                                          | Further Reference                                                                                                                                                                                                                       | Geoconnex Usage / Relevant Tutorials                                                 |
| ------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Reference established hydrologic features**     | Link locations to standard rivers, watersheds, or aquifers       | Use established references to hydrologic features following guidelines in the [Hydrologic references](./data-formats/jsonld/primer/location-oriented.md#section-2-spatial-geometry-and-hydrologic-references) and OGC recommendations.  | [Adding contextual information](../contributing/step-1/dataprep.md)                  |
| **Use hyf\:referencedPosition for surface water** | Connect monitoring locations to specific stream segments         | Utilize the [HY_Features implementation](./data-formats/jsonld/primer/location-oriented.md#section-2-spatial-geometry-and-hydrologic-references) approach, consistent with [SELFIE guidance](http://www.opengis.net/doc/PER/SELFIE-ER). | [Location-oriented JSON-LD](./data-formats/jsonld/primer/location-oriented.md)       |
| **Implement isSampleOf for groundwater**          | Properly associate groundwater monitoring with specific aquifers | Follow best practices for linking sample data using `isSampleOf`, as detailed in the [Groundwater references](./data-formats/jsonld/primer/location-oriented.md#what-about-groundwater).                                                | [Adding context to data](../contributing/step-1/dataprep.md)                         |
| **Include hydrologic unit codes**                 | Reference watershed boundaries at appropriate scale              | Document hydrologic units based on [reference cataloging features](../contributing/step-1/dataprep.md#using-reference-cataloging-features-to-add-contextual-information) and align with OGC standards.                                  | [Spatial queries with reference features](../access/examples/identifying/spatial.md) |
| **Link to upstream/downstream features**          | Use mainstem references to enable network-based discovery        | Implement network relationships as suggested in [Finding related features](../access/examples/related.md) and guided by [SELFIE](http://www.opengis.net/doc/PER/SELFIE-ER).                                                             | [Datasets on rivers example](../access/examples/datasets.md)                         |
| **Use appropriate relation types**                | Apply SELFIE recommended relation types for feature connections  | Refer to recommended [spatial relationship patterns](http://www.opengis.net/doc/PER/SELFIE-ER) for establishing feature relationships.                                                                                                  | [Implementing feature relationships](../access/examples/related.md)                  |

---

### Geospatial Data Representation

| Best Practice                                      | Context                                                         | Further Reference                                                                                                                                                                                                                                                                                                | Geoconnex Usage / Relevant Tutorials                                                                                                  |
| -------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Include both schema.org and GeoSPARQL geometry** | Provide geometry in both simple and standards-compliant formats | Combine [schema.org](https://schema.org) and [GeoSPARQL](https://www.ogc.org/standards/geosparql) geometries to support diverse client needs, as illustrated in the [Spatial geometry in JSON-LD](./data-formats/jsonld/primer/location-oriented.md#section-2-spatial-geometry-and-hydrologic-references) guide. | [Location-oriented JSON-LD](./data-formats/jsonld/primer/location-oriented.md)                                                        |
| **Specify coordinate reference systems**           | Always declare the CRS for spatial data                         | Clearly define CRS following [GeoSPARQL implementation](https://www.ogc.org/standards/geosparql) and best practices from [W3C SDW](https://www.w3.org/TR/sdw-bp/).                                                                                                                                               | [Spatial geometry in JSON-LD](./data-formats/jsonld/primer/location-oriented.md#section-2-spatial-geometry-and-hydrologic-references) |
| **Represent complex geometries with WKT**          | Use Well-Known Text for non-point geometries                    | Utilize [WKT](https://en.wikipedia.org/wiki/Well-known_text) for representing complex geometries, in line with the [Spatial Coverage example](./data-formats/jsonld/primer/dataset-oriented.md#3-geoconnex-reference-feature-links-and-spatial-coverage).                                                        | [Spatial Coverage JSON-LD](./data-formats/jsonld/primer/dataset-oriented.md#3-geoconnex-reference-feature-links-and-spatial-coverage) |
| **Define spatial coverage for datasets**           | Specify the geographic extent of datasets                       | Document dataset extents as described in [Spatial Coverage in JSON-LD](./data-formats/jsonld/primer/dataset-oriented.md#3-geoconnex-reference-feature-links-and-spatial-coverage) following [W3C SDW guidelines](https://www.w3.org/TR/sdw-bp/).                                                                 | [Dataset spatial coverage](./data-formats/jsonld/primer/dataset-oriented.md#3-geoconnex-reference-feature-links-and-spatial-coverage) |
| **Support spatial queries in APIs**                | Enable filtering and discovery by location                      | Implement spatial queries as per [OGC API – Features](https://ogcapi.ogc.org/features/) and [W3C SDW Best Practices](https://www.w3.org/TR/sdw-bp/).                                                                                                                                                             | [Spatial query capabilities](../access/examples/identifying/spatial.md#intersection)                                                  |
| **Provide geometries at appropriate precision**    | Balance detail level with usability                             | TBD                                                                                                                                                                                                                                                                                                              | TBD                                                                                                                                   |

---

### Data Access & Distribution

| Best Practice                             | Context                                                      | Further Reference                                                                                                                                                                         | Geoconnex Usage / Relevant Tutorials                                                                                       |
| ----------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Provide direct download links**         | Include URLs to access the actual data                       | Offer direct download links in compliance with [W3C SDW distribution recommendations](https://www.w3.org/TR/sdw-bp/#distribute-data).                                                     | [Dataset section in JSON-LD](./data-formats/jsonld/primer/location-oriented.md#section-3-datasets)                         |
| **Document data formats**                 | Specify encodingFormat for all data downloads                | Clearly document formats using [Data Distribution guidelines](./data-formats/jsonld/primer/dataset-oriented.md#1-identifiers-provenance-license-and-distribution) and common standards.   | [Finding datasets example](../access/examples/datasets.md)                                                                 |
| **Include API endpoints**                 | Reference web services that provide programmatic data access | Include service endpoints.                                                                                                                                                                | [Distribution section](./data-formats/jsonld/primer/dataset-oriented.md#1-identifiers-provenance-license-and-distribution) |
| **Specify license and access conditions** | Document usage rights and any access restrictions            | Clearly indicate licensing and restrictions following [W3C licensing guidelines](https://www.w3.org/TR/sdw-bp/#license) and industry standards.                                           | [Dataset-oriented example](./data-formats/jsonld/primer/dataset-oriented.md#full-example)                                  |
| **Reference data dictionaries**           | Link to documentation explaining data structure              | Connect to data dictionaries as per [Data conformance links](./data-formats/jsonld/primer/dataset-oriented.md#1-identifiers-provenance-license-and-distribution) and best practices.      | [Distribution example](./data-formats/jsonld/primer/dataset-oriented.md#1-identifiers-provenance-license-and-distribution) |
| **Expose data through standard APIs**     | Leverage standard API patterns                               | Follow [W3C spatial API recommendations](https://www.w3.org/TR/sdw-bp/#convenience-apis) to provide simplified data access, preferably using [OGC API standards](https://ogcapi.ogc.org). | [Building APIs with OGC standards](../access/overview.md)                                                                  |

---

### Data Quality & Provenance

| Best Practice                                      | Context                                                  | Further Reference                                                                                                                                                                                                                           | Geoconnex Usage / Relevant Tutorials                                                                                 |
| -------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Document measurement techniques**                | Distinguish between observed, modeled, or derived data   | Detail measurement techniques per [W3C SDW best practices](https://www.w3.org/TR/sdw-bp/#bp-quality) and internal [Measurement technique reference](./data-formats/jsonld/primer/reference.md#types-of-measurementtechnique).               | [Variables and Methods](./data-formats/jsonld/primer/dataset-oriented.md#2-variables-and-methods)                    |
| **Specify data collection methods**                | Include details on instrumentation and procedures        | Follow guidelines using the [measurementMethod property](./data-formats/jsonld/primer/reference.md#geoconnex-specific-json-ld-properties) as recommended by [W3C SDW](https://www.w3.org/TR/sdw-bp/).                                       | [Dataset section example](./data-formats/jsonld/primer/location-oriented.md#section-3-datasets)                      |
| **Include temporal resolution**                    | Document the frequency of observations                   | Use temporal metadata practices as per [W3C temporal data guidance](https://www.w3.org/TR/sdw-bp/#bp-time) to clearly document observation frequency.                                                                                       | [Dataset section example](./data-formats/jsonld/primer/location-oriented.md#full-example)                            |
| **Provide quantitative unit definitions**          | Reference standard units from QUDT vocabulary            | Define units using standard vocabularies (e.g. [QUDT](http://qudt.org/)) in alignment with [W3C data quality practices](https://www.w3.org/TR/sdw-bp/#bp-quality).                                                                          | [Variables and Methods](./data-formats/jsonld/primer/dataset-oriented.md#2-variables-and-methods)                    |
| **Document data provider information**             | Include organization name, type, and contact information | Provide comprehensive provider metadata following [W3C provenance guidelines](https://www.w3.org/TR/prov-o/) and internal [Provider specification](./data-formats/jsonld/primer/location-oriented.md#section-1-identifiers-and-provenance). | [Identifiers and provenance](./data-formats/jsonld/primer/location-oriented.md#section-1-identifiers-and-provenance) |
| **Describe the changing nature of spatial things** | Document how features change over time                   | TBD                                                                                                                                                                                                                                         | TBD                                                                                                                  |

---

### Search Engine Optimization & Discoverability

| Best Practice                              | Context                                                                                                         | Further Reference                                                                                                                     | Geoconnex Usage / Relevant Tutorials                                                                     |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Make data indexable by search engines**  | Enable web crawlers to discover and index spatial data                                                          | Optimize pages using [W3C search indexing best practice](https://www.w3.org/TR/sdw-bp/#indexable-by-search-engines) guidelines.       | [Implementing crawler-friendly pages](https://docs.geoconnex.us/contributing/step-2/pygeoapi/templating) |
| **Include structured data in HTML**        | Use JSON-LD in script tags with Schema.org vocabulary to enable web crawlers to discover and index spatial data | [W3C recommendations](https://www.w3.org/TR/sdw-bp/#indexable-by-search-engines) to enhance search visibility.                        | [Adding JSON-LD to HTML](https://docs.geoconnex.us/contributing/step-2/pygeoapi/templating)              |
| **Generate and maintain sitemaps**         | Help search engines discover all your spatial resources                                                         | Create and update sitemaps following [sitemap generation best practices](https://www.sitemaps.org/protocol.html) and W3C guidelines.  | [Geoconnex architecture](../about/technical-architecture.md)                                                                               |
| **Create landing pages for all resources** | Provide human-readable entry points for each resource                                                           | Develop clear landing pages as recommended by [W3C landing page guidance](https://www.w3.org/TR/sdw-bp/#indexable-by-search-engines). | [Resource landing pages](../contributing/step-2/pygeoapi/templating.md)                                  |

---

### Technical Implementation

| Best Practice                                  | Context                                             | Further Reference                                                                                                                    | Geoconnex Usage / Relevant Tutorials                                              |
| ---------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| **Use OGC API-Features for vector data**       | Implement standard APIs for accessing feature data  | Leverage the [OGC API – Features specification](https://ogcapi.ogc.org/features/) to standardize data access.                        | [Accessing reference features](../access/reference/index.md)                      |
| **Expose data via open source tools**          | Leverage open-source tools for OGC API deployment   | Utilize [pygeoapi](https://pygeoapi.io/) following deployment guidelines to meet OGC standards.                                      | [Wrapping data with pygeoapi](../contributing/step-2/pygeoapi/providers/index.md) |
| **Support SPARQL for knowledge graph queries** | Enable complex semantic queries                     | Implement [SPARQL](https://www.w3.org/TR/rdf-sparql-query/) for querying linked data, following semantic web best practices.         | [Finding datasets with SPARQL](../access/examples/datasets.md#sparql)             |
| **Implement GeoJSON outputs**                  | Provide data in widely supported geospatial formats | Use the [GeoJSON format](http://geojson.org/) to deliver spatial data in a web-friendly format.                                      | [Attribute queries](../access/examples/identifying/attribute.md)                  |
| **Support content negotiation**                | Allow clients to request preferred data formats     | Enable [content negotiation](https://www.w3.org/Protocols/rfc2616/rfc2616-sec12.html) in your API to serve multiple representations. | [Wrapping data with pygeoapi](../contributing/step-2/pygeoapi/providers/index.md) |

---

### Community & Governance

| Best Practice                                | Context                                                       | Further Reference                                                                                                                           | Geoconnex Usage / Relevant Tutorials                                                                          |
| -------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Participate in Geoconnex governance**      | Contribute to the multi-stakeholder community process         | Engage with the community and follow internal [Governance explanation](../about/community.md) guided by open standards.                     | [Geoconnex Community](../about/community.md)                                                                  |
| **Contribute reference features**            | Add missing reference features to benefit the whole community | Follow the process outlined in the [Reference feature development](../contributing/step-1/index.md) guidelines.                             | [Adding reference features](../contributing/going-further/reference.md)                                       |
| **Consider Network Linked Data Index**       | Contribute to the USGS NLDI for hydrologic network discovery  | Leverage approaches similar to [NLDI integration](../contributing/going-further/nldi.md) to enhance network connectivity.                   | [Contributing to NLDI](../contributing/going-further/nldi.md)                                                 |
| **Follow open source development practices** | Engage with the community via GitHub                          | Adhere to open source practices as documented in the [Geoconnex repositories](../about/technical-architecture.md).                          | [Project repositories](../about/technical-architecture.md)                                                    |
| **Contribute to documentation**              | Help improve guidance for the community                       | Participate in enhancing the [Documentation repository](https://github.com/internetofwater/docs.geoconnex.us) through feedback and updates. | [Submit feedback](https://github.com/internetofwater/geoconnex.us/issues/new?template=best-practice-issue.md) |
| **Practice responsible data ethics**         | Handle spatial data ethically and respect privacy             | Follow [W3C responsible use guidance](https://www.w3.org/TR/sdw-bp/#interact-responsibly) to ensure ethical management of spatial data.     | TBD                                                                       |

---

This updated registry incorporates inline citations (hyperlinks) directly into the table to provide immediate access to the relevant W3C, OGC, SELFIE, and other authoritative resources. Let me know if any further adjustments are needed!
