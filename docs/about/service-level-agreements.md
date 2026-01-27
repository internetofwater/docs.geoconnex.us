---
sidebar_position: 4
---

# Service Level Expectations

Based on research by the Geoconnex team and input from the Geoconnex working group, these expectations are intended to inform participating data providers and end‐users, and help ensure that the publicly available infrastructure meets the needs of the water data community. In a final implementation these targets may be refined based on community feedback and operational experience. These expectations are currently met although maintaining them under current loads is a different question than under loads of widescale use.

## 1. Persistent Identifier (PID) Service

The PID service consists of the Registry (which mints URIs/PIDs and maintains mappings to landing URLs) and the Resolver (which processes HTTP 303 redirects).

**For data contributors**:

- Review of identifier requests and communications regarding reviews, change requests, and approvals should take place within 1 business day 99% of the time.
- Minting of new identifiers should be completed within 3 hours of request approval, 99% of the time.
- 99% of valid identifier registration attempts should succeed.

**For data users**:

- Valid persistent identifiers should successfully resolve to their (valid) target URLs 99% of the time.
- Processing time of redirection from persistent identifiers to target URLs should be completed within 200ms, 99% of the time.

---

## 2. Reference Feature Server

The Reference Feature Server delivers location-based metadata in GeoJSON and JSON-LD via OGC-API Features endpoints.

**For data contributors**:

- New features should be ingested and available via the API within 1 business day of submission, 99% of the time.

**For data users**:

- The API should have 99.99% uptime.
- API queries should return a response within 500ms, 99.9% of the time.
- Less than 0.1% of API requests should result in a 5xx error.

---

## 3. Knowledge Graph / SPARQL Endpoint

The Geoconnex knowledge graph is implemented using an RDF triple store (currently GraphDB) that serves as the central index for all harvested linked data.

**For data users**:

- The SPARQL endpoint should have 99% uptime.
- There is no explicit query latency threshold for the service level expectation, since latency depends mainly upon query complexity.
- Syntactically correct SPARQL queries should execute successfully.

---

## 4. Text-based Search Interface

In addition to the SPARQL endpoint, Geoconnex also provides a text-based search interface that allows users to search for specific datasets or locations.

**For data users**:

- The search interface should have 99.9% uptime.
- Search results should be processed within 3 seconds of query submission, 99.9% of the time.

---

## 5. Bulk Downloads

Geoconnex aims to provide bulk downloads of the entire knowledge graph to allow partners to self-host or explore the graph in alternative ways.

**For data users**:
- Bulk downloads of the entire Geoconnex graph should be available for download from [Zenodo](https://doi.org/10.5281/zenodo.14853115) and thus there is no explicit service level expectation metric for this capability.

---

## 6. Author Guidance and Community Support

A key element of the Geoconnex system is supporting data providers and web authors in publishing compliant JSON-LD and other metadata.

**Documentation**

- Up-to-date documentation (e.g., at https://docs.geoconnex.us/) shall be maintained and updated at least quarterly to reflect changes in best practices and technology.
- Clear, minimal guidance that leverages widely adopted vocabularies (e.g., schema.org) shall be prioritized to ease adoption.

**Support Channels**:

- A contact point, listed on GitHub and the documentation website will be available during standard business hours (or via automated support channels) to answer technical questions and assist with onboarding.
- Regular webinars and training sessions will be scheduled to help new data providers learn how to integrate with the system.

---

## 7. Governance and Community Engagement

The Geoconnex system is maintained through a collaborative governance model involving a working group and open comments from the public

**Governance Process**:

- **Working Group**: A voluntary, informal technical working group will meet regularly (e.g., quarterly) to review system performance, gather community feedback, and recommend improvements.
- **Transparency**: Minutes, reports, and decisions from working group meetings shall be made publicly available within 60 days of each meeting. (Aspirational)

**Review and Improvement**:

- Service level expectations will be reviewed annually and updated as needed.
- A public review process shall be initiated every 1–3 years to ensure that the service levels continue to meet the evolving needs of the water data community.

---

_Note: The above expectations serve as a starting point. As the Geoconnex system is adopted more widely and usage patterns evolve, these targets should be revisited and refined in collaboration with system operators, data providers, and end users._
