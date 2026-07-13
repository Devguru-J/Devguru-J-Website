// Cloudflare Pages Function — runs only for "/" requests.
// Korea (or an explicit ko preference) gets the Korean landing page;
// an explicit language choice (cookie set by the EN/KO toggle) always wins over geo.
export async function onRequest({ request, env }) {
  const cookie = request.headers.get('cookie') || '';
  const pref = (cookie.match(/(?:^|;\s*)lang=(en|ko)/) || [])[1];
  const country = request.headers.get('cf-ipcountry');

  if (pref === 'ko' || (!pref && country === 'KR')) {
    return Response.redirect(new URL('/ko/', request.url), 302);
  }
  return env.ASSETS.fetch(request);
}
