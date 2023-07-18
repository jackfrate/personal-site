// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import nextMdx from "@next/mdx";

!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  redirects: async () => [
    {
      source: "/experience",
      destination: "/experience/work",
      permanent: true,
    },
  ],
  rules: [],
};

// next.config.js
const withMDX = nextMdx({
  extension: /\.(md|mdx)$/,
});

// export default withMDX({
//   webpack(config, options) {
//     config.module.rules.push({
//       test: /\.mdx?$/,
//       use: [
//         options.defaultLoaders.babel,
//         {
//           loader: "@mdx-js/loader",
//           options: {
//             providerImportSource: "@mdx-js/react",
//           },
//         },
//       ],
//     });
//
//     return config;
//   },
// });
export default withMDX(nextConfig);

// export default config;
