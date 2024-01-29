import path from "path"
import fonts from "unplugin-fonts/vite"
import { defineConfig } from "vite"

/** @type { import('vite').UserConfig} */
export default () => {
  return defineConfig({
    plugins: [
      fonts({
        google: {
          families: [
            {
              name: "Roboto",
              styles: "wght@100;300;400;500;700;900",
            },
          ],
        },
        custom: {
          families: [{
            name: 'IcoMoon-Free',
            local: 'IcoMoon-Free',
            src: './src/assets/fonts/IcoMoon-Free.ttf',
          }],
        },
      }),
    ],
    build: {
      rollupOptions: {
        input: {
          index: path.resolve('./index.html'),
          product: path.resolve('./product.html')
        }
      }
    },
    css: {
      modules: {
        localsConvention: "camelCase",
      },
    },
    resolve: {
      alias: {
        "@constants": path.resolve("src/assets/constants"),
        "@images": path.resolve("src/assets/images"),
        "@icons": path.resolve("src/assets/icons"),
        "@style": path.resolve("src/assets/style"),
        "@components": path.resolve("src/components"),
        "@elements": path.resolve("src/elements"),
        "@modules": path.resolve("src/modules"),
        "@pages": path.resolve("src/pages"),
        "@state": path.resolve("src/state"),
        "@type": path.resolve("src/types"),
        "@utils": path.resolve("src/utils"),
        "@services": path.resolve("src/services"),
      },
    },
  })
}
