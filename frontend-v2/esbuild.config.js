// esbuild.config.js
const res = require("esbuild").buildSync({
  entryPoints: ["src/EmbedComponent.tsx"],
  bundle: true,
  minify: true,
  format: "esm",
  sourcemap: true,
  outfile: "dist/bundle.js",
  // external: ['react', 'react-dom'],
});
