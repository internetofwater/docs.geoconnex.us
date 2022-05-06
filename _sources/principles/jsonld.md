## JSON-LD


### General Principles



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

## Available Templates

