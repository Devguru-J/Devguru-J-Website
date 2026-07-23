// Cloudflare Pages Function — runs only for "/" requests.
// "/" is the Korean landing page; English lives at "/en/".
// An explicit language choice (lang cookie set by the EN/KO toggle)
// always wins over geo; otherwise non-Korean visitors go to /en/.
export async function onRequest({ request, env }) {
  const cookie = request.headers.get('cookie') || '';
  const pref = (cookie.match(/(?:^|;\s*)lang=(en|ko)/) || [])[1];
  const country = request.headers.get('cf-ipcountry');

  if (pref === 'en' || (!pref && country && country !== 'KR')) {
    return Response.redirect(new URL('/en/', request.url), 302);
  }
  return env.ASSETS.fetch(request);
}
