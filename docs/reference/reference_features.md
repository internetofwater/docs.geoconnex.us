---
title: Reference Features
sidebar_position: 2
---

# Reference Features

Geoconnex uses reference features to standardize references to the same real-world things — watersheds, monitoring locations, mainstem rivers, dams, counties. Two organizations that use the same identifier for the same feature can combine their data without having agreed on anything else in advance.

A reference feature is identified by a persistent identifier (PID) of the form `https://geoconnex.us/ref/{collection}/{id}`. Reference features are served from [reference.geoconnex.us](https://reference.geoconnex.us/), an OGC API - Features implementation; see [Access Geoconnex reference features](/access/reference/) for how to work with them.

## The identifier policy

One rule holds across every reference collection: **an identifier is unique and permanent**. It refers to one real-world feature, it is never reused for a different feature, and it is never removed.

## What is collection-specific

Everything other than uniqueness depends on the kind of feature being identified: for example, the criteria that distinguish one river from another do not apply to dams. Each collection's stewards decide the following and document it with the collection:

- What an identifier represents. A reference collection only covers what its purpose requires, not necessarily every possible feature of that type.
- How a feature's reference representation is improved over time, and what changes, or doesn't, when it is.
- When an identifier is superseded, how that is recorded, and how you find the replacement. Superseded identifiers are retained rather than deleted, so they still resolve.
- Who maintains the collection, on what cadence, and how to propose a change.

:::tip
Consult the documentation for the collection you are using, not this page, for any of the above. [Reference Mainstems](https://internetofwater.github.io/ref_rivers/) is an example of a collection documenting these decisions.
:::

## Resolution

A reference feature identifier is a URI for a real-world thing, not the location of a document. Resolving it redirects to landing content on `reference.geoconnex.us` that describes the feature and links to representations and data. You can negotiate content from the identifier itself — `?f=json`, `?f=jsonld`, `?f=html`, or an `Accept` header — so a client never needs to hold the landing-content URL.

:::warning
Reference the identifier, never the landing-content URL you arrive at after the redirect. That URL only describes the identifier and can change when the service implementation changes, so it should not appear as the subject or object of a statement in your data. This follows the separation between the URI that identifies a thing and the URL that describes it — URI-14 and URL-14 in [SELFIE](https://docs.ogc.org/per/20-067.html).
:::

:::tip

See the following pages for more background info:

- [how reference features fit into the overall system architecture](../about/system-architecture/stack.md)
- [how you can contribute reference features](../contributing/going-further/reference.md)

:::
