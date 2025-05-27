import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Geoconnex Documentation",
  tagline: "Data infrastructure for unifying hydrologic features in the United States",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.geoconnex.us",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "internetofwater", // Usually your GitHub org/user name.
  projectName: "docs.geoconnex.us", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root

          sidebarPath: "./sidebars.ts",
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/internetofwater/docs.geoconnex.us/edit/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        blog: false,
      } satisfies Preset.Options,
    ],
  ],
  themes: [
    [
      // https://github.com/easyops-cn/docusaurus-search-local
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        docsRouteBasePath: "/",
        indexDocs: true,
        removeDefaultStemmer: true,
      },
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    image: "geoconnex-logo.png",

    docs: {
      sidebar: {
        hideable: true,
      },
    },
    // announcementBar: {
    //   content: "",
    //   isCloseable: tr0ue,
    // },

    navbar: {
      logo: {
        alt: "Geoconnex Logo",
        src: "outlined-logo-no-words.png",
      },
      hideOnScroll: true,
      items: [
        {
          type: "docSidebar",
          sidebarId: "AboutSidebar",
          position: "left",
          label: "About",
        },
        {
          type: "docSidebar",
          sidebarId: "ContributingSidebar",
          position: "left",
          label: "Contribute",
        },
        {
          type: "docSidebar",
          sidebarId: "QueryingSidebar",
          position: "left",
          label: "Access Data",
        },
        {
          type: "docSidebar",
          sidebarId: "DataFormatReferenceSidebar",
          position: "left",
          label: "Best Practices & Data Standards",
        },


        {
          type: "docSidebar",
          sidebarId: "PlaygroundSidebar",
          position: "left",
          label: "Playgrounds",
        },
        {
          href: "https://github.com/internetofwater/docs.geoconnex.us",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        // {
        //   title: "Docs",
        //   items: [
        //     {
        //       label: "Docs",
        //       to: "/docs/",
        //     },
        //   ],
        // },
        {
          title: "Geoconnex Links",
          items: [
            {
              label: "Official Website",
              href: "https://geoconnex.us",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/internetofwater/",
            },
          ],
        },
      ],
      copyright: `Licensed under the CC0 Creative Commons Zero 1.0 (CC0) license and based upon work supported by the U.S. Geological Survey under Grant Nos. G21AP10607 and G21AC10732 `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      //  markup-templating is the dependency for django and turtle is a dependency for sparql 
      additionalLanguages: ["json", "yaml", "markup-templating", "django", "turtle", "sparql", "bash", "r"],
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;