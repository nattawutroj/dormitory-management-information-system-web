import { jsxs } from 'react/jsx-runtime';
import { e as eventHandler, W as W$1, g as ge, a as We, E as Ee, b as gt, c as be, T as Te, S as St } from '../runtime.mjs';
import { useRouter, defaultParseSearch, isRedirect, isNotFound, isPlainObject, defaultStringifySearch } from '@tanstack/react-router';
import b from 'tiny-invariant';
import * as a from 'fs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'node:async_hooks';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'react';
import 'jsesc';
import 'isbot';
import 'react-dom/server';
import '@tanstack/react-cross-context';
import 'react-dom';

function _(e, r) {
  const t = r;
  return b(t.url, "createServerFn must be called with a function that is marked with the 'use server' pragma. Are you using the @tanstack/router-plugin/vite ?"), Object.assign(async (s, o) => t({ method: e, payload: s || void 0, requestInit: o == null ? void 0 : o.requestInit }), { url: r.url });
}
async function G(e, r, t) {
  var _a;
  var s, o;
  const d = r[0];
  if (isPlainObject(d) && d.method) {
    const n = d, a = n.payload instanceof FormData ? "formData" : n.payload instanceof Request ? "request" : "payload", i = new Headers({ [Ee]: a, ...a === "payload" ? { "content-type": "application/json", accept: "application/json" } : {}, ...((s = n.requestInit) == null ? void 0 : s.headers) instanceof Headers ? Object.fromEntries(n.requestInit.headers.entries()) : ((o = n.requestInit) == null ? void 0 : o.headers) || {} });
    if (n.method === "GET") {
      const f = n.payload !== void 0 ? defaultStringifySearch({ payload: n.payload }).substring(1) : "";
      f && (e += `&${f}`);
    }
    const w = new Request(e, { ...n.requestInit, method: n.method, headers: i, ...n.method === "POST" ? { body: a === "formData" ? n.payload : JSON.stringify((_a = n.payload) != null ? _a : null) } : {} }), y = await t(w), h = await S(y);
    if (["rsc"].includes(h.headers.get(Te)))
      return h.body;
    if (["json"].includes(h.headers.get(Te))) {
      const f = await h.text(), g = f ? JSON.parse(f) : void 0;
      if (isRedirect(g) || isNotFound(g))
        throw g;
      return g;
    }
    return h;
  }
  const c = new Request(e, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json", [Ee]: "args" }, body: JSON.stringify(r) }), u = await S(await t(c)), l = u.headers.get("content-type"), p = await u.text();
  return l && l.includes("application/json") ? p ? JSON.parse(p) : void 0 : p;
}
async function S(e) {
  if (!e.ok) {
    const r = e.headers.get("content-type"), t = r && r.includes("application/json"), s = await (async () => t ? await e.json() : await e.text())(), o = `Request failed with status ${e.status}`;
    throw t ? new Error(JSON.stringify({ message: o, body: s })) : new Error([o, `${JSON.stringify(s, null, 2)}`].join(`

`));
  }
  return e;
}
function B(e, r, t) {
  return `${e}/_server/?_serverFnId=${encodeURI(r)}&_serverFnName=${encodeURI(t)}`;
}
eventHandler(M);
async function M(e) {
  return I(ge(e));
}
async function I(e, r) {
  var t, s;
  const o = e.method, d = new URL(e.url, "http://localhost:3000"), c = Object.fromEntries(new URLSearchParams(d.search).entries()), u = c._serverFnId, l = c._serverFnName;
  if (!u || !l)
    throw new Error("Invalid request");
  b(typeof u == "string", "Invalid server action");
  const p = (s = await ((t = We("server").chunks[u]) == null ? void 0 : t.import())) == null ? void 0 : s[l], n = await (async () => {
    try {
      const a = await (async () => {
        var w;
        return e.headers.get(Ee) === "payload" ? [o.toLowerCase() === "get" ? (() => {
          var y;
          return (y = defaultParseSearch(d.search)) == null ? void 0 : y.payload;
        })() : await e.json(), { method: o, request: e }] : e.headers.get(Ee) === "formData" || (w = e.headers.get("Content-Type")) != null && w.includes("multipart/form-data") ? [o.toLowerCase() === "get" ? (() => {
          const { _serverFnId: y, _serverFnName: h, payload: f } = c;
          return f;
        })() : await e.formData(), { method: o, request: e }] : e.headers.get(Ee) === "request" ? [e, { method: o, request: e }] : await e.json();
      })(), i = await p(...a);
      return i instanceof Response ? i : isRedirect(i) || isNotFound(i) ? F(i) : new Response(i !== void 0 ? JSON.stringify(i) : void 0, { status: gt(be()), headers: { "Content-Type": "application/json", [Te]: "json" } });
    } catch (a) {
      return a instanceof Response ? a : isRedirect(a) || isNotFound(a) ? F(a) : (console.error("Server Fn Error!"), console.error(a), console.info(), new Response(JSON.stringify(a), { status: 500, headers: { "Content-Type": "application/json", [Te]: "error" } }));
    }
  })();
  if (n.headers.get("Content-Type") === "application/json") {
    const i = await n.clone().text();
    i && JSON.stringify(JSON.parse(i));
  }
  return n;
}
function F(e) {
  const { headers: r, ...t } = e;
  return new Response(JSON.stringify(t), { status: 200, headers: { "Content-Type": "application/json", [Te]: "json", ...e.headers || {} } });
}
function T(e, r, t) {
  const s = B("http://localhost:3000", r, t);
  return Object.assign((...d) => G(s, d, async (c) => {
    const u = be(), l = St(u);
    return Object.entries(l).forEach(([p, n]) => {
      c.headers.has(p) || c.headers.append(p, n);
    }), I(c);
  }), { url: s });
}
const $ = "count.txt";
async function x() {
  return parseInt(await a.promises.readFile($, "utf-8").catch(() => "0"));
}
const W = _("GET", T(K, "c_1wfb23", "$$function0")), z = _("POST", T(Q, "c_1wfb23", "$$function1")), ue = function() {
  const r = useRouter(), t = W$1.useLoaderData();
  return jsxs("button", { onClick: () => {
    z(1).then(() => {
      r.invalidate();
    });
  }, children: ["Add 1 to ", t, "?"] });
}, pe = async () => await W();
function K() {
  return x();
}
async function Q(e) {
  const r = await x();
  await a.promises.writeFile($, `${r + e}`);
}

export { K as $$function0, Q as $$function1, ue as component, pe as loader };
//# sourceMappingURL=index-VUlDrTel.mjs.map
