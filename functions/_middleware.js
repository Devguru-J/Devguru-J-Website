// Host normalisation for every path.
//
// `functions/index.js` only ever sees "/", so canonical-host enforcement has to
// live here — and it has to run *before* any language routing, otherwise a
// visitor can be redirected twice (§21.3).
//
// Path and query are always preserved, and the redirect is a single 301.

const CANONICAL_HOST = 'devguru-j.com';

/** Hosts that must be left alone: Cloudflare preview builds and local dev. */
function isPreviewHost(hostname) {
  return (
    hostname.endsWith('.pages.dev') ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.localhost')
  );
}

export async function onRequest({ request, next }) {
  const url = new URL(request.url);

  if (url.hostname !== CANONICAL_HOST && !isPreviewHost(url.hostname)) {
    url.hostname = CANONICAL_HOST;
    url.protocol = 'https:';
    url.port = '';
    return Response.redirect(url.toString(), 301);
  }

  return next();
}
