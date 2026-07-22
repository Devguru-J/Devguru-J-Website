// Language routing for "/" only.
//
// Rules (§7.4):
//   1. The URL is the single source of language state.
//   2. An explicit choice (the `lang` cookie, set by the language switch) always
//      wins over detection.
//   3. With no cookie, `Accept-Language` may *suggest* Korean — a 302, never a
//      permanent redirect.
//   4. Location alone never forces a language. `cf-ipcountry` is not consulted.

function readLangCookie(request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/(?:^|;\s*)lang=(en|ko)(?:;|$)/);
  return match ? match[1] : null;
}

function prefersKorean(request) {
  const header = request.headers.get('accept-language');
  if (!header) return false;

  // Rank the listed languages by q-value and honour whichever wins.
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { tag: tag.trim().toLowerCase(), q: q ? parseFloat(q.split('=')[1]) : 1 };
    })
    .filter((entry) => entry.tag)
    .sort((a, b) => b.q - a.q);

  const korean = ranked.find((entry) => entry.tag === 'ko' || entry.tag.startsWith('ko-'));
  if (!korean) return false;

  const english = ranked.find((entry) => entry.tag === 'en' || entry.tag.startsWith('en-'));
  return !english || korean.q >= english.q;
}

export async function onRequest({ request, env }) {
  const explicit = readLangCookie(request);

  if (explicit === 'ko' || (explicit === null && prefersKorean(request))) {
    return Response.redirect(new URL('/ko/', request.url).toString(), 302);
  }

  return env.ASSETS.fetch(request);
}
