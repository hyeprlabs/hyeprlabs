// @ts-nocheck
import * as __fd_glob_4 from "../content/blog/why-web-performance-matters.mdx?collection=blog"
import * as __fd_glob_3 from "../content/blog/new-design-principles-for-modern-web-apps.mdx?collection=blog"
import * as __fd_glob_2 from "../content/blog/letter-club-ode-to-the-slow-web.mdx?collection=blog"
import * as __fd_glob_1 from "../content/blog/carve-out-space-for-opportunity-and-coffee.mdx?collection=blog"
import * as __fd_glob_0 from "../content/blog/building-modern-applications-with-shadcn-ui.mdx?collection=blog"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const blog = await create.doc("blog", "content/blog", {"building-modern-applications-with-shadcn-ui.mdx": __fd_glob_0, "carve-out-space-for-opportunity-and-coffee.mdx": __fd_glob_1, "letter-club-ode-to-the-slow-web.mdx": __fd_glob_2, "new-design-principles-for-modern-web-apps.mdx": __fd_glob_3, "why-web-performance-matters.mdx": __fd_glob_4, });