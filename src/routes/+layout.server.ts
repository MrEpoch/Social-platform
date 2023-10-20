import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, locals }: { url: URL, locals: any }) => {
	const session = await locals.auth.validate();

  if (session && session.user.profilePicture !== "no-image") {
    const { data } = await locals.supabase.storage
      .from('social-platform')
      .getPublicUrl(`images/${session.user.profilePicture}`);
      session.user.profilePicture = data.publicUrl;
  }

  return {
    url: url.pathname,
    session
  }
}
