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

## Best Practices Registry

Throughout the Geoconnex docs you can find links to explanations of general best practices that motivate Geoconnex development as well as how these best practices are implemented and used in practice. Many of these best practices are inspired by the [W3C Spatial Data on the Web Best Practices](https://www.w3.org/TR/sdw-bp/)

| Best Practice     | Context                             |  Detailed Explanation     | Geoconnex Usage / Relevant Tutorials                          |
|----------|-----------------------------------------|-----------------|-----------------------------------------|
| Using standard geospatial APIs | Common API Standards for sharing Geospatial data | [OGC APIs explanation](./apis) | [Exposing your data](../contributing/step-2/index.md) |
| Using persistent identifiers |   Referencing Geoconnex data in a way that is stable across URL or metadata changes | [Reference features explanation](./reference_features.md) |  [Picking an identifier scheme](../contributing/step-1/index.md) |  
| Community driven governance | Geoconnex has a multi-stakeholder coalition | [Geoconnex Community](../about/community.md)  | |
| Using JSON-LD with standardized ontologies | Standardize the variable names in the data for easier linking | [JSON-LD overview](./data-formats/jsonld/overview.md) | [JSON-LD tutorial](../contributing/step-2/pygeoapi/templating.md)  |