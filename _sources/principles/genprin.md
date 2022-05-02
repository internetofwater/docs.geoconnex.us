---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# General Principles

geoconnex.us is about publishing water data on the web in a manner similar to the way commercial entities publish information such that it is easily discoverable and useable by software developers to create feature-rich user experiences and information products. 

Think about the way that a search for a movie title on a search engine instantly brings up a card showing that film's director, cast, showtimes at nearby movie theaters or availability on variou streaming platforms. Or how you can search along in a maps application for gas stations or fast-food chains along your route. Or how a search for a city name and "population" might bring up an interactive line graph showing its population trend along with those of other cities. [These sorts of things](https://developers.google.com/search/docs/advanced/structured-data/search-gallery), as well as [generally improved search results](https://en.wikipedia.org/wiki/Search_engine_optimization), are generally made possible due to the publishing of "structured, linked data" within websites.

## What is structured, linked data?
Structured data consists of specifically formatted, machine-readable descriptive information about the subject of the website, as well as in many cases, links to other websites. For example, a webpage about a particular job posting on a job listing app might have structured information about the job title, work location, posting date, salary range, as well as link to the company homepage. 

```{code-cell} json
:tags: [hide-cell]
 {
      "@context" : "https://schema.org/",
      "@type" : "JobPosting",
      "title" : "Software Engineer",
      "description" : "<p>Google aspires to be an organization that reflects the globally diverse audience that our products and technology serve. We believe that in addition to hiring the best talent, a diversity of perspectives, ideas and cultures leads to the creation of better products and services.</p>",
      "identifier": {
        "@type": "PropertyValue",
        "name": "Google",
        "value": "1234567"
      },
      "datePosted" : "2017-01-18",
      "validThrough" : "2017-03-18T00:00",
      "employmentType" : "CONTRACTOR",
      "hiringOrganization" : {
        "@type" : "Organization",
        "name" : "Google",
        "sameAs" : "http://www.google.com",
        "logo" : "http://www.example.com/images/logo.png"
      },
      "jobLocation": {
      "@type": "Place",
        "address": {
        "@type": "PostalAddress",
        "streetAddress": "1600 Amphitheatre Pkwy",
        "addressLocality": "Mountain View",
        "addressRegion": "CA",
        "postalCode": "94043",
        "addressCountry": "US"
        }
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": {
          "@type": "QuantitativeValue",
          "value": 40.00,
          "unitText": "HOUR"
        }
      }
    }
```

Knowledge graph diagram

What is required?

1. features
2. identifiers
3. landing content
4. structured, linked data formatted as JSON-LD
