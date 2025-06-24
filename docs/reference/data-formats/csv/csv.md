---
title: CSV
---

# Proper CSV Formatting for Geoconnex

:::note

For a tutorial on how to submit your CSV data see [the contribution tutorial](../../../contributing/overview.md)

:::

Geoconnex expects a standard format for the CSVs which maps a persistent identifier in Geoconnex to a single data resource. You must include at least the following 4 columns:

| Column Title  | Description                                                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`          | The ID within geoconnex that your data should map to. These are unique, will redirect to the associated target, and are meant for individual monitoring locations. View [the identification scheme](/contributing/step-1) section for more info. |
| `target`      | The URL pointing to a JSON-LD landing page for a single feature in your data.                                                                                      |
| `creator`     | A contact email for someone associated with the resource.                                                                                                          |
| `description` | A natural language description of the data.                                                                                                                        |

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 1:1 vs 1:N Redirects

<Tabs>
  <TabItem value="github" label="1:1 Redirects" default>

There is a strong preference for creating 1:1 redirects. That is, specifying an exact redirect from a geoconnex.us-based PID to the URI of the hydrologic feature you have a web resource about, for each and every individual feature.
This enables the resolution of features such as https://geoconnex.us/usgs/monitoring-location/01010000 to https://waterdata.usgs.gov/monitoring-location/01010000


<!-- We need to put this behind a div and not use ## for a header since the header would be rendered
in the docusaurus sidebar even if it is in the othertab that isn't opened -->
<div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>
  An example 1:1 mapping

</div>


import CSVTable from '@site/src/components/CSVTable';

<CSVTable csvUrl="https://raw.githubusercontent.com/internetofwater/geoconnex.us/master/namespaces/iow/demo.csv" />

  </TabItem>
  <TabItem value="register" label="1:N Regex Redirects">

:::caution

Unless you have more than 300,000 features and cannot use 1:1 redirects, you should avoid using regex redirects as they are harder to resolve and maintain if endpoints change

:::
If you need to create PIDs and redirects for a large number of features (more than 300,000), _and cannot use 1:1 redirects_, we will require a regular expression matching redirect.

- For example, redirecting from https://geoconnex.us/example-namespace/*wildcard-string to https://example.org/features?query=*wildcard-string.

- If you have more than 300,000 features, but these features can be split in a consistent way into sub-collections, all of which number less than 300,000 features (as might be the case for features that can be divided by geography, jurisdiction, theme, or type), then you might consider submitting multiple collections of 1:1 redirects.

To submit a request to submit this data, you can [create an issue of type "Request regex redirect"](https://github.com/internetofwater/geoconnex.us/issues/new?assignees=dblodgett-usgs%2C+ksonda&labels=PID+request&template=request-regex-redirect.md&title=[regex+redirect+request) and fill out the template.

<div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>
An example 1:N mapping that uses a regular expression

</div>

<CSVTable csvUrl="https://raw.githubusercontent.com/internetofwater/geoconnex.us/master/namespaces/usgs/monitoring-location/monitoring-location.csv" />
  </TabItem>
</Tabs>