# Mint Persistent Identifiers

Geoconnex requires a persistent identifier to refer to your data. That way, if the url where you host your data changes, you can update the mapping, but the end users of geoconnex can still query the same identifier. 

<!-- Is this helpful info? Seems  very technical -->
- The process for adding a PID-URI redirect is generally similar to that used by [w3id.org](https://github.com/perma-id/w3id.org). 


### Adding 1:1 redirects to geoconnex.us

There is a strong preference for creating 1:1 redirects. That is, specifying an exact redirect from a geoconnex.us-based PID to the URI of the hydrologic feature you have a web resource about, for each and every individual feature. 

1:1 redirects are simpler to resolve and allow you to customize (and change, when needed) your target URI patterns with more specificity.


The preferred way to create the redirects yourself is by following these steps:

1. Fork the [`internetofwater/geoconnex.us`](https://github.com/internetofwater/geoconnex.us) repository.
2. Add a directory corresponding to the namespace you want in the `namespaces` directory. For example `namespaces/example-namespace/`
3. Add a set of redirects using the [csv template](https://github.com/internetofwater/geoconnex.us/blob/master/namespaces/example-namespace/example_ids.csv). You may consider adding multiple separate sets of redirects, as long as each set is comprised of less than 300,000
   - The only required fields are `id` (the geoconnex URI you want), `target` (where the URI should redirect to), and `creator` (your email address).

4. Add a `README.md` detailing contact persons and (a subset of) your permanent identifiers in your namespace directory. 
   - For an example, see `namespaces/example-namespace/README.md`
5. Commit your changes and submit a
   [pull request](https://github.com/internetofwater/geoconnex.us/pulls).
6. geoconnex.us administrators will review your pull request and merge it if
   everything looks correct. Once the pull request is merged, the changes go
   live within ~ 15 minutes.

:::tip

You can also use the [https://register.geoconnex.us/](https://register.geoconnex.us/) website to submit your data if you prefer not to use GitHub

:::


### Adding regular expression redirects to geoconnex.us

If you need to create PIDs and redirects for a large number of features (more than 300,000), _and cannot use 1:1 redirects_, we will require a [regular expression matching redirect](#adding-regular-expression-redirects-to-geoconnexus). 

   - For example, redirecting from https://geoconnex.us/example-namespace/*wildcard-string to https://example.org/features?query=*wildcard-string.

    - If you have more than 300,000 features, but these features can be split in a consistent way into sub-collections, all of which number less than 300,000 features (as might be the case for features that can be divided by geography, jurisdiction, theme, or type), then you might consider submitting multiple collections of 1:1 redirects.

To submit a request to submit this data, you can [create an issue of type "Request regex redirect"](https://github.com/internetofwater/geoconnex.us/issues/new?assignees=dblodgett-usgs%2C+ksonda&labels=PID+request&template=request-regex-redirect.md&title=[regex+redirect+request) and fill out the template.



