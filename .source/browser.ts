// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  blog: create.doc("blog", {"building-modern-applications-with-shadcn-ui.mdx": () => import("../content/blog/building-modern-applications-with-shadcn-ui.mdx?collection=blog"), "carve-out-space-for-opportunity-and-coffee.mdx": () => import("../content/blog/carve-out-space-for-opportunity-and-coffee.mdx?collection=blog"), "letter-club-ode-to-the-slow-web.mdx": () => import("../content/blog/letter-club-ode-to-the-slow-web.mdx?collection=blog"), "new-design-principles-for-modern-web-apps.mdx": () => import("../content/blog/new-design-principles-for-modern-web-apps.mdx?collection=blog"), "why-web-performance-matters.mdx": () => import("../content/blog/why-web-performance-matters.mdx?collection=blog"), }),
};
export default browserCollections;