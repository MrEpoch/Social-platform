import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, locals }: { url: URL, locals: any }) => {
	const session = await locals.auth.validate();

  return {
    url: url.pathname,
    session
  }
}
