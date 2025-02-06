---
sidebar_position: 1
---

# Mint Persistent Identifiers

Geoconnex requires a persistent identifier to refer to your data. That way, if the url where you host your data changes, you can update the mapping, but the end users of geoconnex can still query the same identifier. This process is generally done by uploading a CSV file with the associated mapping.


:::tip

View the [CSV formatting reference](./csv-submissions.md) for best practices on how to format your CSV and the difference between 1:1 and 1:N regex redirects.

:::



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>
  <TabItem value="github" label="Submitting via GitHub" default>

  GitHub submissions give you more control over the CSV submission process. To submit your CSV via GitHub:

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

:::note 

To submit a request to submit regex redirects you must [create an issue of type "Request regex redirect"](https://github.com/internetofwater/geoconnex.us/issues/new?assignees=dblodgett-usgs%2C+ksonda&labels=PID+request&template=request-regex-redirect.md&title=[regex+redirect+request) and fill out the template.

:::
  </TabItem>
  <TabItem value="register" label="Submitting via register.geoconnex.us">
  [register.geoconnex.us](https://register.geoconnex.us/) provides a convenient web interface for adding 1:1 redirects and may be preferred by users without background using GitHub. Once the web form is submitted, it ends up submitting a pull request to the same GitHub repository but does not require you to log in or use the command line.  
  </TabItem>
  
</Tabs>


