interface MiddlewareContext {
  request: Request;
  next(): Promise<Response>;
}

const canonicalHostname = "emmanuelgemegah.online";
const wwwHostname = `www.${canonicalHostname}`;

export async function onRequest(context: MiddlewareContext): Promise<Response> {
  const url = new URL(context.request.url);

  if (url.hostname === wwwHostname) {
    url.hostname = canonicalHostname;
    return Response.redirect(url.toString(), 308);
  }

  return context.next();
}
