---

title: Proper CSV Formatting for Geoconnex

---

# Proper CSV Formatting for Geoconnex
:::note

For a tutorial on how to submit your CSV data see [the contribution tutorial](../../../contributing/step-3/minting.md)

:::

Geoconnex expects a standard format for the CSVs which maps a persistent identifier in Geoconnex to one of your resources. You must include at least the following 4 columns:

| Column Title | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| `id`        | The ID within geoconnex that your data should map to.                      |
| `target`    | The endpoint where the JSON-LD for the resource can be found.              |
| `creator`   | The contact email associated with the resource.                             |
| `description` | A natural language description of the data.                                |



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 1:1 vs 1:N Redirects

<Tabs>
  <TabItem value="github" label="1:1 Redirects" default>

There is a strong preference for creating 1:1 redirects. That is, specifying an exact redirect from a geoconnex.us-based PID to the URI of the hydrologic feature you have a web resource about, for each and every individual feature. 


An example 1:1 mapping can be found [here](https://github.com/internetofwater/geoconnex.us/blob/master/namespaces/SELFIE/SELFIE_ids.csv).


For information regarding submitting CSV redirects see [the tutorial for minting persistent identifiers](/contributing/step-3/minting)
  </TabItem>
  <TabItem value="register" label="1:N Regex Redirects">

  :::caution

Unless you have more than 300,000 features and cannot use 1:1 redirects, you should avoid using regex redirects as they are harder to resolve and maintain if endpoints change

:::
  If you need to create PIDs and redirects for a large number of features (more than 300,000), _and cannot use 1:1 redirects_, we will require a regular expression matching redirect.

   - For example, redirecting from https://geoconnex.us/example-namespace/*wildcard-string to https://example.org/features?query=*wildcard-string.

    - If you have more than 300,000 features, but these features can be split in a consistent way into sub-collections, all of which number less than 300,000 features (as might be the case for features that can be divided by geography, jurisdiction, theme, or type), then you might consider submitting multiple collections of 1:1 redirects.

To submit a request to submit this data, you can [create an issue of type "Request regex redirect"](https://github.com/internetofwater/geoconnex.us/issues/new?assignees=dblodgett-usgs%2C+ksonda&labels=PID+request&template=request-regex-redirect.md&title=[regex+redirect+request) and fill out the template.


An example 1:N mapping that uses regexes can be found [here](https://github.com/internetofwater/geoconnex.us/blob/master/namespaces/usgs/monitoring-location/monitoring-location.csv)
    

  </TabItem>
</Tabs>

