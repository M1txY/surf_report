globalThis.global = globalThis;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// .svelte-kit/output/server/chunks/utils.js
function get_relative_path(from, to) {
  const from_parts = from.split(/[/\\]/);
  const to_parts = to.split(/[/\\]/);
  from_parts.pop();
  while (from_parts[0] === to_parts[0]) {
    from_parts.shift();
    to_parts.shift();
  }
  let i = from_parts.length;
  while (i--) from_parts[i] = "..";
  return from_parts.concat(to_parts).join("/");
}
function base64_encode(bytes) {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(bytes).toString("base64");
  }
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
function base64_decode(encoded) {
  if (globalThis.Buffer) {
    const buffer = globalThis.Buffer.from(encoded, "base64");
    return new Uint8Array(buffer);
  }
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
var text_encoder, text_decoder;
var init_utils = __esm({
  ".svelte-kit/output/server/chunks/utils.js"() {
    text_encoder = new TextEncoder();
    text_decoder = new TextDecoder();
  }
});

// node_modules/@sveltejs/kit/src/exports/internal/remote-functions.js
var init_remote_functions = __esm({
  "node_modules/@sveltejs/kit/src/exports/internal/remote-functions.js"() {
  }
});

// node_modules/@sveltejs/kit/src/exports/internal/index.js
var HttpError, Redirect, SvelteKitError, ActionFailure;
var init_internal = __esm({
  "node_modules/@sveltejs/kit/src/exports/internal/index.js"() {
    init_remote_functions();
    HttpError = class {
      /**
       * @param {number} status
       * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
       */
      constructor(status, body2) {
        this.status = status;
        if (typeof body2 === "string") {
          this.body = { message: body2 };
        } else if (body2) {
          this.body = body2;
        } else {
          this.body = { message: `Error: ${status}` };
        }
      }
      toString() {
        return JSON.stringify(this.body);
      }
    };
    Redirect = class {
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location) {
        this.status = status;
        this.location = location;
      }
    };
    SvelteKitError = class extends Error {
      /**
       * @param {number} status
       * @param {string} text
       * @param {string} message
       */
      constructor(status, text2, message) {
        super(message);
        this.status = status;
        this.text = text2;
      }
    };
    ActionFailure = class {
      /**
       * @param {number} status
       * @param {T} data
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    };
  }
});

// .svelte-kit/output/server/chunks/exports.js
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/") return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore") return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
function make_trackable(url, callback, search_params_callback, allow_hash = false) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  const tracked_url_properties = ["href", "pathname", "search", "toString", "toJSON"];
  if (allow_hash) tracked_url_properties.push("hash");
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
    tracked.searchParams[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url.searchParams, opts);
    };
  }
  if (!allow_hash) {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
function validator(expected) {
  function validate(module, file) {
    if (!module) return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2)) continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var internal, valid_layout_exports, valid_page_exports, valid_layout_server_exports, valid_page_server_exports, valid_server_exports, validate_layout_exports, validate_page_exports, validate_layout_server_exports, validate_page_server_exports, validate_server_exports;
var init_exports = __esm({
  ".svelte-kit/output/server/chunks/exports.js"() {
    internal = new URL("sveltekit-internal://");
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    validate_server_exports = validator(valid_server_exports);
  }
});

// .svelte-kit/output/server/chunks/ssr.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_current_component(component5) {
  current_component = component5;
}
function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component5, name) {
  if (!component5 || !component5.$$render) {
    if (name === "svelte:component") name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component5;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css4) => css4.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
var current_component, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/ssr2.js
function onMount() {
}
function afterUpdate() {
}
var init_ssr2 = __esm({
  ".svelte-kit/output/server/chunks/ssr2.js"() {
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index5 = 0;
      while (index5 < str.length) {
        var eqIdx = str.indexOf("=", index5);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index5);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index5 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index5, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index5 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else if (key2 === "partitioned") {
          cookie.partitioned = true;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse3(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var css, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_ssr();
    css = {
      code: "*{box-sizing:border-box}body{margin:0;padding:0}",
      map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nonMount(() => {\\n  if (\\"serviceWorker\\" in navigator) {\\n    navigator.serviceWorker.register(\\"/sw.js\\").then((registration) => {\\n      console.log(\\"Service Worker enregistr\\\\xE9:\\", registration);\\n    }).catch((error) => {\\n      console.log(\\"Erreur Service Worker:\\", error);\\n    });\\n  }\\n});\\n<\/script>\\r\\n\\r\\n<slot />\\r\\n\\r\\n<style>\\r\\n\\t:global(*) {\\r\\n\\t\\tbox-sizing: border-box;\\r\\n\\t}\\r\\n\\t\\r\\n\\t:global(body) {\\r\\n\\t\\tmargin: 0;\\r\\n\\t\\tpadding: 0;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAeS,CAAG,CACV,UAAU,CAAE,UACb,CAEQ,IAAM,CACb,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CACV"}'
    };
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css);
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => component_cache ?? (component_cache = (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default);
    imports = ["_app/immutable/nodes/0.C3Qy-_bd.js", "_app/immutable/chunks/BAzXF0TR.js", "_app/immutable/chunks/IHki7fMi.js"];
    stylesheets = ["_app/immutable/assets/0.BTD5PK6j.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/chunks/escape.js
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
var ATTR_REGEX, CONTENT_REGEX;
var init_escape = __esm({
  ".svelte-kit/output/server/chunks/escape.js"() {
    ATTR_REGEX = /[&"<]/g;
    CONTENT_REGEX = /[&<]/g;
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error$1
});
var is_legacy, getStores, page, Error$1;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_ssr();
    init_internal();
    init_exports();
    init_utils();
    init_ssr2();
    init_escape();
    is_legacy = onMount.toString().includes("$$") || /function \w+\(\) \{\}/.test(onMount.toString());
    if (is_legacy) {
      ({
        data: {},
        form: null,
        error: null,
        params: {},
        route: { id: null },
        state: {},
        status: -1,
        url: new URL("https://example.com")
      });
    }
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ?? (component_cache2 = (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default);
    imports2 = ["_app/immutable/nodes/1.DlXiP-Bo.js", "_app/immutable/chunks/BAzXF0TR.js", "_app/immutable/chunks/IHki7fMi.js", "_app/immutable/chunks/rtUqGhUU.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
function generateRealisticTideData() {
  const now = /* @__PURE__ */ new Date();
  const data = [];
  const baseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 15);
  for (let i = 0; i < 4; i++) {
    const highTime = new Date(baseTime.getTime() + (i * 12.5 + 0) * 60 * 60 * 1e3);
    const lowTime = new Date(baseTime.getTime() + (i * 12.5 + 6.25) * 60 * 60 * 1e3);
    data.push({
      time: highTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      height: 3.8 + Math.random() * 1.2,
      type: "high",
      timestamp: highTime.getTime()
    });
    data.push({
      time: lowTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      height: 0.3 + Math.random() * 0.7,
      type: "low",
      timestamp: lowTime.getTime()
    });
  }
  return data.sort((a, b) => a.timestamp - b.timestamp);
}
function getSurfRating(tide) {
  if (tide.type === "high" && tide.height > 4) return 5;
  if (tide.type === "high" && tide.height > 3) return 4;
  if (tide.type === "high" && tide.height > 2) return 3;
  if (tide.type === "low" && tide.height < 1) return 3;
  return 2;
}
function getSurfConditionText(rating) {
  switch (rating) {
    case 5:
      return "Excellent";
    case 4:
      return "Tr\xE8s bon";
    case 3:
      return "Bon";
    case 2:
      return "Moyen";
    default:
      return "Faible";
  }
}
var css2, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_ssr();
    init_escape();
    css2 = {
      code: "body{margin:0;padding:0;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;background:linear-gradient(180deg, #87CEEB 0%, #4682B4 100%);min-height:100vh;color:#000;overflow-x:hidden}main.svelte-zk8o5a.svelte-zk8o5a{max-width:430px;margin:0 auto;min-height:100vh;background:linear-gradient(180deg, #87CEEB 0%, #4682B4 50%, #1e3a8a 100%);position:relative}.beach-selector.svelte-zk8o5a.svelte-zk8o5a{padding:16px}.selector-container.svelte-zk8o5a.svelte-zk8o5a{display:flex;gap:12px;overflow-x:auto;padding:4px 8px;scrollbar-width:none;-ms-overflow-style:none;scroll-snap-type:x mandatory}.selector-container.svelte-zk8o5a.svelte-zk8o5a::-webkit-scrollbar{display:none}.beach-option.svelte-zk8o5a.svelte-zk8o5a{display:flex;align-items:center;gap:12px;padding:12px 16px;background:rgba(255,255,255,0.2);border:none;border-radius:20px;backdrop-filter:blur(10px);color:white;font-size:14px;cursor:pointer;transition:all 0.3s ease;white-space:nowrap;min-width:180px;flex-shrink:0;scroll-snap-align:start}.beach-option.selected.svelte-zk8o5a.svelte-zk8o5a{background:rgba(255,255,255,0.9);color:#1e3a8a;box-shadow:0 4px 20px rgba(0,0,0,0.1)}.beach-emoji.svelte-zk8o5a.svelte-zk8o5a{font-size:20px}.beach-info.svelte-zk8o5a.svelte-zk8o5a{text-align:left;flex:1;min-width:0}.beach-name.svelte-zk8o5a.svelte-zk8o5a{font-weight:600;font-size:14px;line-height:1.2;margin-bottom:2px}.beach-location.svelte-zk8o5a.svelte-zk8o5a{font-size:11px;opacity:0.8;line-height:1.2}.main-card.svelte-zk8o5a.svelte-zk8o5a{margin:16px;background:rgba(255,255,255,0.95);border-radius:24px;padding:24px;backdrop-filter:blur(20px);box-shadow:0 8px 32px rgba(0,0,0,0.1);min-height:500px}.loading-state.svelte-zk8o5a.svelte-zk8o5a{text-align:center;padding:60px 20px}.loading-spinner.svelte-zk8o5a.svelte-zk8o5a{width:40px;height:40px;border:3px solid #f3f3f3;border-top:3px solid #4682B4;border-radius:50%;animation:svelte-zk8o5a-spin 1s linear infinite;margin:0 auto 16px}@keyframes svelte-zk8o5a-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.current-conditions.svelte-zk8o5a.svelte-zk8o5a{text-align:center;margin-bottom:32px}.location-header.svelte-zk8o5a h1.svelte-zk8o5a{font-size:32px;font-weight:300;margin:0 0 4px 0;color:#1e3a8a}.location-header.svelte-zk8o5a p.svelte-zk8o5a{font-size:16px;color:#6b7280;margin:0 0 24px 0}.next-tide.svelte-zk8o5a.svelte-zk8o5a{margin-bottom:24px}.tide-time.svelte-zk8o5a.svelte-zk8o5a{font-size:48px;font-weight:200;color:#1e3a8a;margin-bottom:8px}.tide-info.svelte-zk8o5a.svelte-zk8o5a{display:flex;justify-content:center;gap:16px;margin-bottom:8px}.tide-type.svelte-zk8o5a.svelte-zk8o5a,.tide-height.svelte-zk8o5a.svelte-zk8o5a{font-size:18px;font-weight:500;color:#374151}.time-until.svelte-zk8o5a.svelte-zk8o5a{font-size:16px;color:#6b7280}.surf-rating.svelte-zk8o5a.svelte-zk8o5a{display:flex;flex-direction:column;align-items:center;gap:8px}.rating-dots.svelte-zk8o5a.svelte-zk8o5a{display:flex;gap:6px}.dot.svelte-zk8o5a.svelte-zk8o5a{width:12px;height:12px;border-radius:50%;background:#e5e7eb;transition:all 0.3s ease}.dot.active.svelte-zk8o5a.svelte-zk8o5a{background:#3b82f6;box-shadow:0 0 8px rgba(59, 130, 246, 0.4)}.rating-text.svelte-zk8o5a.svelte-zk8o5a{font-size:16px;font-weight:500;color:#374151}.hourly-forecast.svelte-zk8o5a.svelte-zk8o5a{margin-bottom:32px}.hourly-forecast.svelte-zk8o5a h3.svelte-zk8o5a{font-size:18px;font-weight:600;color:#1e3a8a;margin:0 0 16px 0}.forecast-scroll.svelte-zk8o5a.svelte-zk8o5a{display:flex;gap:12px;overflow-x:auto;padding:8px 0;scrollbar-width:none;-ms-overflow-style:none}.forecast-scroll.svelte-zk8o5a.svelte-zk8o5a::-webkit-scrollbar{display:none}.forecast-item.svelte-zk8o5a.svelte-zk8o5a{display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px 12px;background:#f9fafb;border-radius:16px;min-width:80px;transition:all 0.3s ease}.forecast-item.next.svelte-zk8o5a.svelte-zk8o5a{background:#dbeafe;border:2px solid #3b82f6}.forecast-time.svelte-zk8o5a.svelte-zk8o5a{font-size:14px;font-weight:500;color:#374151}.forecast-icon.svelte-zk8o5a.svelte-zk8o5a{font-size:24px}.forecast-height.svelte-zk8o5a.svelte-zk8o5a{font-size:16px;font-weight:600;color:#1e3a8a}.forecast-type.svelte-zk8o5a.svelte-zk8o5a{font-size:12px;color:#6b7280}.surf-tips.svelte-zk8o5a h3.svelte-zk8o5a{font-size:18px;font-weight:600;color:#1e3a8a;margin:0 0 16px 0}.tips-grid.svelte-zk8o5a.svelte-zk8o5a{display:grid;grid-template-columns:1fr 1fr;gap:12px}.tip-item.svelte-zk8o5a.svelte-zk8o5a{display:flex;align-items:center;gap:8px;padding:12px;background:#f9fafb;border-radius:12px}.tip-icon.svelte-zk8o5a.svelte-zk8o5a{font-size:20px}.tip-text.svelte-zk8o5a.svelte-zk8o5a{font-size:14px;color:#374151}@media(max-width: 430px){.main-card.svelte-zk8o5a.svelte-zk8o5a{margin:12px;padding:20px}.tide-time.svelte-zk8o5a.svelte-zk8o5a{font-size:40px}.location-header.svelte-zk8o5a h1.svelte-zk8o5a{font-size:28px}}",
      map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nconst beaches = [\\n  { name: \\"Cap de l\\\\u2019Homy\\", location: \\"Lit-et-Mixe (Landes)\\", lat: 44.03895, lon: -1.34023, emoji: \\"\\\\u{1F3C4}\\\\u200D\\\\u2642\\\\uFE0F\\" },\\n  { name: \\"La Lette Blanche\\", location: \\"Vielle-Saint-Girons (Landes)\\", lat: 43.90279, lon: -1.37726, emoji: \\"\\\\u{1F30A}\\" },\\n  { name: \\"Biarritz\\", location: \\"Grande Plage\\", lat: 43.4831, lon: -1.5586, emoji: \\"\\\\u{1F3C4}\\\\u200D\\\\u2642\\\\uFE0F\\" },\\n  { name: \\"Hossegor\\", location: \\"La Centrale\\", lat: 43.6618, lon: -1.4087, emoji: \\"\\\\u{1F30A}\\" },\\n  { name: \\"Lacanau\\", location: \\"Oc\\\\xE9an\\", lat: 45.0045, lon: -1.1966, emoji: \\"\\\\u{1F3D6}\\\\uFE0F\\" },\\n  { name: \\"Capbreton\\", location: \\"Le Santocha\\", lat: 43.6425, lon: -1.4285, emoji: \\"\\\\u{1F3C4}\\\\u200D\\\\u2640\\\\uFE0F\\" },\\n  { name: \\"Anglet\\", location: \\"Chambre d'Amour\\", lat: 43.5065, lon: -1.5315, emoji: \\"\\\\u{1F499}\\" },\\n  { name: \\"La Torche\\", location: \\"Bretagne\\", lat: 47.8377, lon: -4.3364, emoji: \\"\\\\u26A1\\" },\\n  { name: \\"Guidel\\", location: \\"Plages du Morbihan\\", lat: 47.7946, lon: -3.5012, emoji: \\"\\\\u{1F305}\\" }\\n];\\nlet selectedBeach = beaches[0];\\nlet tideData = [];\\nlet loading = false;\\nlet currentTime = /* @__PURE__ */ new Date();\\nlet nextTide = null;\\nonMount(() => {\\n  const interval = setInterval(() => {\\n    currentTime = /* @__PURE__ */ new Date();\\n  }, 1e3);\\n  fetchTideData(selectedBeach);\\n  return () => clearInterval(interval);\\n});\\nasync function fetchTideData(beach) {\\n  loading = true;\\n  try {\\n    tideData = generateRealisticTideData();\\n    findNextTide();\\n  } catch (err) {\\n    console.error(\\"Erreur lors de la r\\\\xE9cup\\\\xE9ration des donn\\\\xE9es:\\", err);\\n    tideData = generateRealisticTideData();\\n  } finally {\\n    loading = false;\\n  }\\n}\\nfunction generateRealisticTideData() {\\n  const now = /* @__PURE__ */ new Date();\\n  const data = [];\\n  const baseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 15);\\n  for (let i = 0; i < 4; i++) {\\n    const highTime = new Date(baseTime.getTime() + (i * 12.5 + 0) * 60 * 60 * 1e3);\\n    const lowTime = new Date(baseTime.getTime() + (i * 12.5 + 6.25) * 60 * 60 * 1e3);\\n    data.push({\\n      time: highTime.toLocaleTimeString(\\"fr-FR\\", { hour: \\"2-digit\\", minute: \\"2-digit\\" }),\\n      height: 3.8 + Math.random() * 1.2,\\n      type: \\"high\\",\\n      timestamp: highTime.getTime()\\n    });\\n    data.push({\\n      time: lowTime.toLocaleTimeString(\\"fr-FR\\", { hour: \\"2-digit\\", minute: \\"2-digit\\" }),\\n      height: 0.3 + Math.random() * 0.7,\\n      type: \\"low\\",\\n      timestamp: lowTime.getTime()\\n    });\\n  }\\n  return data.sort((a, b) => a.timestamp - b.timestamp);\\n}\\nfunction findNextTide() {\\n  const now = currentTime.getTime();\\n  nextTide = tideData.find((tide) => tide.timestamp > now) || null;\\n}\\nfunction getSurfRating(tide) {\\n  if (tide.type === \\"high\\" && tide.height > 4) return 5;\\n  if (tide.type === \\"high\\" && tide.height > 3) return 4;\\n  if (tide.type === \\"high\\" && tide.height > 2) return 3;\\n  if (tide.type === \\"low\\" && tide.height < 1) return 3;\\n  return 2;\\n}\\nfunction getSurfConditionText(rating) {\\n  switch (rating) {\\n    case 5:\\n      return \\"Excellent\\";\\n    case 4:\\n      return \\"Tr\\\\xE8s bon\\";\\n    case 3:\\n      return \\"Bon\\";\\n    case 2:\\n      return \\"Moyen\\";\\n    default:\\n      return \\"Faible\\";\\n  }\\n}\\nfunction getTimeUntilNextTide() {\\n  if (!nextTide) return \\"\\";\\n  const now = currentTime.getTime();\\n  const diff = nextTide.timestamp - now;\\n  const hours = Math.floor(diff / (1e3 * 60 * 60));\\n  const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));\\n  if (hours > 0) return \`\${hours}h \${minutes}min\`;\\n  return \`\${minutes}min\`;\\n}\\n$: if (selectedBeach) {\\n  fetchTideData(selectedBeach);\\n}\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n\\t<title>\u{1F3C4}\u200D\u2642\uFE0F Surf Report</title>\\r\\n\\t<meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1, viewport-fit=cover\\" />\\r\\n</svelte:head>\\r\\n\\r\\n<main>\\r\\n\\r\\n\\t<!-- S\xE9lecteur de plage style iOS -->\\r\\n\\t<div class=\\"beach-selector\\">\\r\\n\\t\\t<div class=\\"selector-container\\">\\r\\n\\t\\t\\t{#each beaches as beach, index}\\r\\n\\t\\t\\t\\t<button \\r\\n\\t\\t\\t\\t\\tclass=\\"beach-option\\" \\r\\n\\t\\t\\t\\t\\tclass:selected={beach === selectedBeach}\\r\\n\\t\\t\\t\\t\\ton:click={() => selectedBeach = beach}\\r\\n\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t<span class=\\"beach-emoji\\">{beach.emoji}</span>\\r\\n\\t\\t\\t\\t\\t<div class=\\"beach-info\\">\\r\\n\\t\\t\\t\\t\\t\\t<div class=\\"beach-name\\">{beach.name}</div>\\r\\n\\t\\t\\t\\t\\t\\t<div class=\\"beach-location\\">{beach.location}</div>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t{/each}\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n\\r\\n\\t<!-- Carte principale m\xE9t\xE9o style -->\\r\\n\\t<div class=\\"main-card\\">\\r\\n\\t\\t{#if loading}\\r\\n\\t\\t\\t<div class=\\"loading-state\\">\\r\\n\\t\\t\\t\\t<div class=\\"loading-spinner\\"></div>\\r\\n\\t\\t\\t\\t<p>Chargement...</p>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t{:else}\\r\\n\\t\\t\\t<!-- Conditions actuelles -->\\r\\n\\t\\t\\t<div class=\\"current-conditions\\">\\r\\n\\t\\t\\t\\t<div class=\\"location-header\\">\\r\\n\\t\\t\\t\\t\\t<h1>{selectedBeach.name}</h1>\\r\\n\\t\\t\\t\\t\\t<p>{selectedBeach.location}</p>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t{#if nextTide}\\r\\n\\t\\t\\t\\t\\t<div class=\\"next-tide\\">\\r\\n\\t\\t\\t\\t\\t\\t<div class=\\"tide-time\\">{nextTide.time}</div>\\r\\n\\t\\t\\t\\t\\t\\t<div class=\\"tide-info\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t<span class=\\"tide-type\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t{nextTide.type === 'high' ? 'Mar\xE9e Haute' : 'Mar\xE9e Basse'}\\r\\n\\t\\t\\t\\t\\t\\t\\t</span>\\r\\n\\t\\t\\t\\t\\t\\t\\t<span class=\\"tide-height\\">{nextTide.height.toFixed(1)}m</span>\\r\\n\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t<div class=\\"time-until\\">\\r\\n\\t\\t\\t\\t\\t\\t\\tdans {getTimeUntilNextTide()}\\r\\n\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\r\\n\\t\\t\\t\\t\\t<div class=\\"surf-rating\\">\\r\\n\\t\\t\\t\\t\\t\\t<div class=\\"rating-dots\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t{#each Array(5) as _, i}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"dot\\" class:active={i < getSurfRating(nextTide)}></div>\\r\\n\\t\\t\\t\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t<span class=\\"rating-text\\">{getSurfConditionText(getSurfRating(nextTide))}</span>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t</div>\\r\\n\\r\\n\\t\\t\\t<!-- Pr\xE9visions horaires -->\\r\\n\\t\\t\\t<div class=\\"hourly-forecast\\">\\r\\n\\t\\t\\t\\t<h3>Mar\xE9es du jour</h3>\\r\\n\\t\\t\\t\\t<div class=\\"forecast-scroll\\">\\r\\n\\t\\t\\t\\t\\t{#each tideData as tide}\\r\\n\\t\\t\\t\\t\\t\\t<div class=\\"forecast-item\\" class:next={tide === nextTide}>\\r\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"forecast-time\\">{tide.time}</div>\\r\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"forecast-icon\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t{tide.type === 'high' ? '\u2B06\uFE0F' : '\u2B07\uFE0F'}\\r\\n\\t\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"forecast-height\\">{tide.height.toFixed(1)}m</div>\\r\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"forecast-type\\">\\r\\n\\t\\t\\t\\t\\t\\t\\t\\t{tide.type === 'high' ? 'Haute' : 'Basse'}\\r\\n\\t\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</div>\\r\\n\\r\\n\\t\\t\\t<!-- Conseils surf -->\\r\\n\\t\\t\\t<div class=\\"surf-tips\\">\\r\\n\\t\\t\\t\\t<h3>\u{1F4A1} Conseils</h3>\\r\\n\\t\\t\\t\\t<div class=\\"tips-grid\\">\\r\\n\\t\\t\\t\\t\\t<div class=\\"tip-item\\">\\r\\n\\t\\t\\t\\t\\t\\t<span class=\\"tip-icon\\">\u{1F30A}</span>\\r\\n\\t\\t\\t\\t\\t\\t<span class=\\"tip-text\\">Mar\xE9e montante = vagues douces</span>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t<div class=\\"tip-item\\">\\r\\n\\t\\t\\t\\t\\t\\t<span class=\\"tip-icon\\">\u2B06\uFE0F</span>\\r\\n\\t\\t\\t\\t\\t\\t<span class=\\"tip-text\\">Mar\xE9e haute = surf expert</span>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t<div class=\\"tip-item\\">\\r\\n\\t\\t\\t\\t\\t\\t<span class=\\"tip-icon\\">\u2B07\uFE0F</span>\\r\\n\\t\\t\\t\\t\\t\\t<span class=\\"tip-text\\">Mar\xE9e basse = d\xE9butants</span>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t<div class=\\"tip-item\\">\\r\\n\\t\\t\\t\\t\\t\\t<span class=\\"tip-icon\\">\u26A0\uFE0F</span>\\r\\n\\t\\t\\t\\t\\t\\t<span class=\\"tip-text\\">Attention aux rochers</span>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t{/if}\\r\\n\\t</div>\\r\\n</main>\\r\\n\\r\\n<style>\\r\\n\\t:global(body) {\\r\\n\\t\\tmargin: 0;\\r\\n\\t\\tpadding: 0;\\r\\n\\t\\tfont-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\\r\\n\\t\\tbackground: linear-gradient(180deg, #87CEEB 0%, #4682B4 100%);\\r\\n\\t\\tmin-height: 100vh;\\r\\n\\t\\tcolor: #000;\\r\\n\\t\\toverflow-x: hidden;\\r\\n\\t}\\r\\n\\r\\n\\tmain {\\r\\n\\t\\tmax-width: 430px;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tmin-height: 100vh;\\r\\n\\t\\tbackground: linear-gradient(180deg, #87CEEB 0%, #4682B4 50%, #1e3a8a 100%);\\r\\n\\t\\tposition: relative;\\r\\n\\t}\\r\\n\\r\\n\\t/* Status bar style iPhone */\\r\\n\\t.status-bar {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: space-between;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tpadding: 12px 20px 8px 20px;\\r\\n\\t\\tcolor: white;\\r\\n\\t\\tfont-weight: 600;\\r\\n\\t\\tfont-size: 17px;\\r\\n\\t\\tbackground: rgba(0,0,0,0.1);\\r\\n\\t\\tbackdrop-filter: blur(10px);\\r\\n\\t}\\r\\n\\r\\n\\t/* S\xE9lecteur de plage */\\r\\n\\t.beach-selector {\\r\\n\\t\\tpadding: 16px;\\r\\n\\t}\\r\\n\\r\\n\\t.selector-container {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tgap: 12px;\\r\\n\\t\\toverflow-x: auto;\\r\\n\\t\\tpadding: 4px 8px;\\r\\n\\t\\tscrollbar-width: none;\\r\\n\\t\\t-ms-overflow-style: none;\\r\\n\\t\\tscroll-snap-type: x mandatory;\\r\\n\\t}\\r\\n\\r\\n\\t.selector-container::-webkit-scrollbar {\\r\\n\\t\\tdisplay: none;\\r\\n\\t}\\r\\n\\r\\n\\t.beach-option {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tgap: 12px;\\r\\n\\t\\tpadding: 12px 16px;\\r\\n\\t\\tbackground: rgba(255,255,255,0.2);\\r\\n\\t\\tborder: none;\\r\\n\\t\\tborder-radius: 20px;\\r\\n\\t\\tbackdrop-filter: blur(10px);\\r\\n\\t\\tcolor: white;\\r\\n\\t\\tfont-size: 14px;\\r\\n\\t\\tcursor: pointer;\\r\\n\\t\\ttransition: all 0.3s ease;\\r\\n\\t\\twhite-space: nowrap;\\r\\n\\t\\tmin-width: 180px;\\r\\n\\t\\tflex-shrink: 0;\\r\\n\\t\\tscroll-snap-align: start;\\r\\n\\t}\\r\\n\\r\\n\\t.beach-option.selected {\\r\\n\\t\\tbackground: rgba(255,255,255,0.9);\\r\\n\\t\\tcolor: #1e3a8a;\\r\\n\\t\\tbox-shadow: 0 4px 20px rgba(0,0,0,0.1);\\r\\n\\t}\\r\\n\\r\\n\\t.beach-emoji {\\r\\n\\t\\tfont-size: 20px;\\r\\n\\t}\\r\\n\\r\\n\\t.beach-info {\\r\\n\\t\\ttext-align: left;\\r\\n\\t\\tflex: 1;\\r\\n\\t\\tmin-width: 0;\\r\\n\\t}\\r\\n\\r\\n\\t.beach-name {\\r\\n\\t\\tfont-weight: 600;\\r\\n\\t\\tfont-size: 14px;\\r\\n\\t\\tline-height: 1.2;\\r\\n\\t\\tmargin-bottom: 2px;\\r\\n\\t}\\r\\n\\r\\n\\t.beach-location {\\r\\n\\t\\tfont-size: 11px;\\r\\n\\t\\topacity: 0.8;\\r\\n\\t\\tline-height: 1.2;\\r\\n\\t}\\r\\n\\r\\n\\t/* Carte principale */\\r\\n\\t.main-card {\\r\\n\\t\\tmargin: 16px;\\r\\n\\t\\tbackground: rgba(255,255,255,0.95);\\r\\n\\t\\tborder-radius: 24px;\\r\\n\\t\\tpadding: 24px;\\r\\n\\t\\tbackdrop-filter: blur(20px);\\r\\n\\t\\tbox-shadow: 0 8px 32px rgba(0,0,0,0.1);\\r\\n\\t\\tmin-height: 500px;\\r\\n\\t}\\r\\n\\r\\n\\t.loading-state {\\r\\n\\t\\ttext-align: center;\\r\\n\\t\\tpadding: 60px 20px;\\r\\n\\t}\\r\\n\\r\\n\\t.loading-spinner {\\r\\n\\t\\twidth: 40px;\\r\\n\\t\\theight: 40px;\\r\\n\\t\\tborder: 3px solid #f3f3f3;\\r\\n\\t\\tborder-top: 3px solid #4682B4;\\r\\n\\t\\tborder-radius: 50%;\\r\\n\\t\\tanimation: spin 1s linear infinite;\\r\\n\\t\\tmargin: 0 auto 16px;\\r\\n\\t}\\r\\n\\r\\n\\t@keyframes spin {\\r\\n\\t\\t0% { transform: rotate(0deg); }\\r\\n\\t\\t100% { transform: rotate(360deg); }\\r\\n\\t}\\r\\n\\r\\n\\t/* Conditions actuelles */\\r\\n\\t.current-conditions {\\r\\n\\t\\ttext-align: center;\\r\\n\\t\\tmargin-bottom: 32px;\\r\\n\\t}\\r\\n\\r\\n\\t.location-header h1 {\\r\\n\\t\\tfont-size: 32px;\\r\\n\\t\\tfont-weight: 300;\\r\\n\\t\\tmargin: 0 0 4px 0;\\r\\n\\t\\tcolor: #1e3a8a;\\r\\n\\t}\\r\\n\\r\\n\\t.location-header p {\\r\\n\\t\\tfont-size: 16px;\\r\\n\\t\\tcolor: #6b7280;\\r\\n\\t\\tmargin: 0 0 24px 0;\\r\\n\\t}\\r\\n\\r\\n\\t.next-tide {\\r\\n\\t\\tmargin-bottom: 24px;\\r\\n\\t}\\r\\n\\r\\n\\t.tide-time {\\r\\n\\t\\tfont-size: 48px;\\r\\n\\t\\tfont-weight: 200;\\r\\n\\t\\tcolor: #1e3a8a;\\r\\n\\t\\tmargin-bottom: 8px;\\r\\n\\t}\\r\\n\\r\\n\\t.tide-info {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\tgap: 16px;\\r\\n\\t\\tmargin-bottom: 8px;\\r\\n\\t}\\r\\n\\r\\n\\t.tide-type, .tide-height {\\r\\n\\t\\tfont-size: 18px;\\r\\n\\t\\tfont-weight: 500;\\r\\n\\t\\tcolor: #374151;\\r\\n\\t}\\r\\n\\r\\n\\t.time-until {\\r\\n\\t\\tfont-size: 16px;\\r\\n\\t\\tcolor: #6b7280;\\r\\n\\t}\\r\\n\\r\\n\\t/* Rating syst\xE8me */\\r\\n\\t.surf-rating {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: column;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tgap: 8px;\\r\\n\\t}\\r\\n\\r\\n\\t.rating-dots {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tgap: 6px;\\r\\n\\t}\\r\\n\\r\\n\\t.dot {\\r\\n\\t\\twidth: 12px;\\r\\n\\t\\theight: 12px;\\r\\n\\t\\tborder-radius: 50%;\\r\\n\\t\\tbackground: #e5e7eb;\\r\\n\\t\\ttransition: all 0.3s ease;\\r\\n\\t}\\r\\n\\r\\n\\t.dot.active {\\r\\n\\t\\tbackground: #3b82f6;\\r\\n\\t\\tbox-shadow: 0 0 8px rgba(59, 130, 246, 0.4);\\r\\n\\t}\\r\\n\\r\\n\\t.rating-text {\\r\\n\\t\\tfont-size: 16px;\\r\\n\\t\\tfont-weight: 500;\\r\\n\\t\\tcolor: #374151;\\r\\n\\t}\\r\\n\\r\\n\\t/* Pr\xE9visions horaires */\\r\\n\\t.hourly-forecast {\\r\\n\\t\\tmargin-bottom: 32px;\\r\\n\\t}\\r\\n\\r\\n\\t.hourly-forecast h3 {\\r\\n\\t\\tfont-size: 18px;\\r\\n\\t\\tfont-weight: 600;\\r\\n\\t\\tcolor: #1e3a8a;\\r\\n\\t\\tmargin: 0 0 16px 0;\\r\\n\\t}\\r\\n\\r\\n\\t.forecast-scroll {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tgap: 12px;\\r\\n\\t\\toverflow-x: auto;\\r\\n\\t\\tpadding: 8px 0;\\r\\n\\t\\tscrollbar-width: none;\\r\\n\\t\\t-ms-overflow-style: none;\\r\\n\\t}\\r\\n\\r\\n\\t.forecast-scroll::-webkit-scrollbar {\\r\\n\\t\\tdisplay: none;\\r\\n\\t}\\r\\n\\r\\n\\t.forecast-item {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: column;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tgap: 8px;\\r\\n\\t\\tpadding: 16px 12px;\\r\\n\\t\\tbackground: #f9fafb;\\r\\n\\t\\tborder-radius: 16px;\\r\\n\\t\\tmin-width: 80px;\\r\\n\\t\\ttransition: all 0.3s ease;\\r\\n\\t}\\r\\n\\r\\n\\t.forecast-item.next {\\r\\n\\t\\tbackground: #dbeafe;\\r\\n\\t\\tborder: 2px solid #3b82f6;\\r\\n\\t}\\r\\n\\r\\n\\t.forecast-time {\\r\\n\\t\\tfont-size: 14px;\\r\\n\\t\\tfont-weight: 500;\\r\\n\\t\\tcolor: #374151;\\r\\n\\t}\\r\\n\\r\\n\\t.forecast-icon {\\r\\n\\t\\tfont-size: 24px;\\r\\n\\t}\\r\\n\\r\\n\\t.forecast-height {\\r\\n\\t\\tfont-size: 16px;\\r\\n\\t\\tfont-weight: 600;\\r\\n\\t\\tcolor: #1e3a8a;\\r\\n\\t}\\r\\n\\r\\n\\t.forecast-type {\\r\\n\\t\\tfont-size: 12px;\\r\\n\\t\\tcolor: #6b7280;\\r\\n\\t}\\r\\n\\r\\n\\t/* Conseils surf */\\r\\n\\t.surf-tips h3 {\\r\\n\\t\\tfont-size: 18px;\\r\\n\\t\\tfont-weight: 600;\\r\\n\\t\\tcolor: #1e3a8a;\\r\\n\\t\\tmargin: 0 0 16px 0;\\r\\n\\t}\\r\\n\\r\\n\\t.tips-grid {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tgrid-template-columns: 1fr 1fr;\\r\\n\\t\\tgap: 12px;\\r\\n\\t}\\r\\n\\r\\n\\t.tip-item {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tgap: 8px;\\r\\n\\t\\tpadding: 12px;\\r\\n\\t\\tbackground: #f9fafb;\\r\\n\\t\\tborder-radius: 12px;\\r\\n\\t}\\r\\n\\r\\n\\t.tip-icon {\\r\\n\\t\\tfont-size: 20px;\\r\\n\\t}\\r\\n\\r\\n\\t.tip-text {\\r\\n\\t\\tfont-size: 14px;\\r\\n\\t\\tcolor: #374151;\\r\\n\\t}\\r\\n\\r\\n\\t/* Responsive */\\r\\n\\t@media (max-width: 430px) {\\r\\n\\t\\t.main-card {\\r\\n\\t\\t\\tmargin: 12px;\\r\\n\\t\\t\\tpadding: 20px;\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t.tide-time {\\r\\n\\t\\t\\tfont-size: 40px;\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t.location-header h1 {\\r\\n\\t\\t\\tfont-size: 28px;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAiNS,IAAM,CACb,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,aAAa,CAAC,CAAC,kBAAkB,CAAC,CAAC,UAAU,CAAC,CAAC,MAAM,CAAC,CAAC,UAAU,CAC9E,UAAU,CAAE,gBAAgB,MAAM,CAAC,CAAC,OAAO,CAAC,EAAE,CAAC,CAAC,OAAO,CAAC,IAAI,CAAC,CAC7D,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MACb,CAEA,gCAAK,CACJ,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,KAAK,CACjB,UAAU,CAAE,gBAAgB,MAAM,CAAC,CAAC,OAAO,CAAC,EAAE,CAAC,CAAC,OAAO,CAAC,GAAG,CAAC,CAAC,OAAO,CAAC,IAAI,CAAC,CAC1E,QAAQ,CAAE,QACX,CAgBA,2CAAgB,CACf,OAAO,CAAE,IACV,CAEA,+CAAoB,CACnB,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IAAI,CACT,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,GAAG,CAAC,GAAG,CAChB,eAAe,CAAE,IAAI,CACrB,kBAAkB,CAAE,IAAI,CACxB,gBAAgB,CAAE,CAAC,CAAC,SACrB,CAEA,+CAAmB,mBAAoB,CACtC,OAAO,CAAE,IACV,CAEA,yCAAc,CACb,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,CACT,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,UAAU,CAAE,KAAK,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CACjC,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,eAAe,CAAE,KAAK,IAAI,CAAC,CAC3B,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CACzB,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,CAAC,CACd,iBAAiB,CAAE,KACpB,CAEA,aAAa,qCAAU,CACtB,UAAU,CAAE,KAAK,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CACjC,KAAK,CAAE,OAAO,CACd,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CACtC,CAEA,wCAAa,CACZ,SAAS,CAAE,IACZ,CAEA,uCAAY,CACX,UAAU,CAAE,IAAI,CAChB,IAAI,CAAE,CAAC,CACP,SAAS,CAAE,CACZ,CAEA,uCAAY,CACX,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,aAAa,CAAE,GAChB,CAEA,2CAAgB,CACf,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,GAAG,CACZ,WAAW,CAAE,GACd,CAGA,sCAAW,CACV,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,CAClC,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,KAAK,IAAI,CAAC,CAC3B,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACtC,UAAU,CAAE,KACb,CAEA,0CAAe,CACd,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,IAAI,CAAC,IACf,CAEA,4CAAiB,CAChB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAC7B,aAAa,CAAE,GAAG,CAClB,SAAS,CAAE,kBAAI,CAAC,EAAE,CAAC,MAAM,CAAC,QAAQ,CAClC,MAAM,CAAE,CAAC,CAAC,IAAI,CAAC,IAChB,CAEA,WAAW,kBAAK,CACf,EAAG,CAAE,SAAS,CAAE,OAAO,IAAI,CAAG,CAC9B,IAAK,CAAE,SAAS,CAAE,OAAO,MAAM,CAAG,CACnC,CAGA,+CAAoB,CACnB,UAAU,CAAE,MAAM,CAClB,aAAa,CAAE,IAChB,CAEA,8BAAgB,CAAC,gBAAG,CACnB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB,KAAK,CAAE,OACR,CAEA,8BAAgB,CAAC,eAAE,CAClB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAClB,CAEA,sCAAW,CACV,aAAa,CAAE,IAChB,CAEA,sCAAW,CACV,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OAAO,CACd,aAAa,CAAE,GAChB,CAEA,sCAAW,CACV,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,GAAG,CAAE,IAAI,CACT,aAAa,CAAE,GAChB,CAEA,sCAAU,CAAE,wCAAa,CACxB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OACR,CAEA,uCAAY,CACX,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,OACR,CAGA,wCAAa,CACZ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,GACN,CAEA,wCAAa,CACZ,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,GACN,CAEA,gCAAK,CACJ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,OAAO,CACnB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IACtB,CAEA,IAAI,mCAAQ,CACX,UAAU,CAAE,OAAO,CACnB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC3C,CAEA,wCAAa,CACZ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OACR,CAGA,4CAAiB,CAChB,aAAa,CAAE,IAChB,CAEA,8BAAgB,CAAC,gBAAG,CACnB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAClB,CAEA,4CAAiB,CAChB,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IAAI,CACT,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,GAAG,CAAC,CAAC,CACd,eAAe,CAAE,IAAI,CACrB,kBAAkB,CAAE,IACrB,CAEA,4CAAgB,mBAAoB,CACnC,OAAO,CAAE,IACV,CAEA,0CAAe,CACd,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,GAAG,CACR,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IACtB,CAEA,cAAc,iCAAM,CACnB,UAAU,CAAE,OAAO,CACnB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OACnB,CAEA,0CAAe,CACd,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OACR,CAEA,0CAAe,CACd,SAAS,CAAE,IACZ,CAEA,4CAAiB,CAChB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OACR,CAEA,0CAAe,CACd,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,OACR,CAGA,wBAAU,CAAC,gBAAG,CACb,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAClB,CAEA,sCAAW,CACV,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAC9B,GAAG,CAAE,IACN,CAEA,qCAAU,CACT,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,GAAG,CACR,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,IAChB,CAEA,qCAAU,CACT,SAAS,CAAE,IACZ,CAEA,qCAAU,CACT,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,OACR,CAGA,MAAO,YAAY,KAAK,CAAE,CACzB,sCAAW,CACV,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IACV,CAEA,sCAAW,CACV,SAAS,CAAE,IACZ,CAEA,8BAAgB,CAAC,gBAAG,CACnB,SAAS,CAAE,IACZ,CACD"}`
    };
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const beaches = [
        {
          name: "Cap de l\u2019Homy",
          location: "Lit-et-Mixe (Landes)",
          lat: 44.03895,
          lon: -1.34023,
          emoji: "\u{1F3C4}\u200D\u2642\uFE0F"
        },
        {
          name: "La Lette Blanche",
          location: "Vielle-Saint-Girons (Landes)",
          lat: 43.90279,
          lon: -1.37726,
          emoji: "\u{1F30A}"
        },
        {
          name: "Biarritz",
          location: "Grande Plage",
          lat: 43.4831,
          lon: -1.5586,
          emoji: "\u{1F3C4}\u200D\u2642\uFE0F"
        },
        {
          name: "Hossegor",
          location: "La Centrale",
          lat: 43.6618,
          lon: -1.4087,
          emoji: "\u{1F30A}"
        },
        {
          name: "Lacanau",
          location: "Oc\xE9an",
          lat: 45.0045,
          lon: -1.1966,
          emoji: "\u{1F3D6}\uFE0F"
        },
        {
          name: "Capbreton",
          location: "Le Santocha",
          lat: 43.6425,
          lon: -1.4285,
          emoji: "\u{1F3C4}\u200D\u2640\uFE0F"
        },
        {
          name: "Anglet",
          location: "Chambre d'Amour",
          lat: 43.5065,
          lon: -1.5315,
          emoji: "\u{1F499}"
        },
        {
          name: "La Torche",
          location: "Bretagne",
          lat: 47.8377,
          lon: -4.3364,
          emoji: "\u26A1"
        },
        {
          name: "Guidel",
          location: "Plages du Morbihan",
          lat: 47.7946,
          lon: -3.5012,
          emoji: "\u{1F305}"
        }
      ];
      let selectedBeach = beaches[0];
      let tideData = [];
      let loading = false;
      let currentTime = /* @__PURE__ */ new Date();
      let nextTide = null;
      async function fetchTideData(beach) {
        loading = true;
        try {
          tideData = generateRealisticTideData();
          findNextTide();
        } catch (err) {
          console.error("Erreur lors de la r\xE9cup\xE9ration des donn\xE9es:", err);
          tideData = generateRealisticTideData();
        } finally {
          loading = false;
        }
      }
      function findNextTide() {
        const now = currentTime.getTime();
        nextTide = tideData.find((tide) => tide.timestamp > now) || null;
      }
      function getTimeUntilNextTide() {
        if (!nextTide) return "";
        const now = currentTime.getTime();
        const diff = nextTide.timestamp - now;
        const hours = Math.floor(diff / (1e3 * 60 * 60));
        const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
        if (hours > 0) return `${hours}h ${minutes}min`;
        return `${minutes}min`;
      }
      $$result.css.add(css2);
      {
        if (selectedBeach) {
          fetchTideData();
        }
      }
      return `${$$result.head += `<!-- HEAD_svelte-1xwvs5a_START -->${$$result.title = `<title>\u{1F3C4}\u200D\u2642\uFE0F Surf Report</title>`, ""}<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><!-- HEAD_svelte-1xwvs5a_END -->`, ""} <main class="svelte-zk8o5a"> <div class="beach-selector svelte-zk8o5a"><div class="selector-container svelte-zk8o5a">${each(beaches, (beach, index5) => {
        return `<button class="${["beach-option svelte-zk8o5a", beach === selectedBeach ? "selected" : ""].join(" ").trim()}"><span class="beach-emoji svelte-zk8o5a">${escape(beach.emoji)}</span> <div class="beach-info svelte-zk8o5a"><div class="beach-name svelte-zk8o5a">${escape(beach.name)}</div> <div class="beach-location svelte-zk8o5a">${escape(beach.location)}</div></div> </button>`;
      })}</div></div>  <div class="main-card svelte-zk8o5a">${loading ? `<div class="loading-state svelte-zk8o5a" data-svelte-h="svelte-1daruu9"><div class="loading-spinner svelte-zk8o5a"></div> <p>Chargement...</p></div>` : ` <div class="current-conditions svelte-zk8o5a"><div class="location-header svelte-zk8o5a"><h1 class="svelte-zk8o5a">${escape(selectedBeach.name)}</h1> <p class="svelte-zk8o5a">${escape(selectedBeach.location)}</p></div> ${nextTide ? `<div class="next-tide svelte-zk8o5a"><div class="tide-time svelte-zk8o5a">${escape(nextTide.time)}</div> <div class="tide-info svelte-zk8o5a"><span class="tide-type svelte-zk8o5a">${escape(nextTide.type === "high" ? "Mar\xE9e Haute" : "Mar\xE9e Basse")}</span> <span class="tide-height svelte-zk8o5a">${escape(nextTide.height.toFixed(1))}m</span></div> <div class="time-until svelte-zk8o5a">dans ${escape(getTimeUntilNextTide())}</div></div> <div class="surf-rating svelte-zk8o5a"><div class="rating-dots svelte-zk8o5a">${each(Array(5), (_, i) => {
        return `<div class="${["dot svelte-zk8o5a", i < getSurfRating(nextTide) ? "active" : ""].join(" ").trim()}"></div>`;
      })}</div> <span class="rating-text svelte-zk8o5a">${escape(getSurfConditionText(getSurfRating(nextTide)))}</span></div>` : ``}</div>  <div class="hourly-forecast svelte-zk8o5a"><h3 class="svelte-zk8o5a" data-svelte-h="svelte-16vdnxa">Mar\xE9es du jour</h3> <div class="forecast-scroll svelte-zk8o5a">${each(tideData, (tide) => {
        return `<div class="${["forecast-item svelte-zk8o5a", tide === nextTide ? "next" : ""].join(" ").trim()}"><div class="forecast-time svelte-zk8o5a">${escape(tide.time)}</div> <div class="forecast-icon svelte-zk8o5a">${escape(tide.type === "high" ? "\u2B06\uFE0F" : "\u2B07\uFE0F")}</div> <div class="forecast-height svelte-zk8o5a">${escape(tide.height.toFixed(1))}m</div> <div class="forecast-type svelte-zk8o5a">${escape(tide.type === "high" ? "Haute" : "Basse")}</div> </div>`;
      })}</div></div>  <div class="surf-tips svelte-zk8o5a" data-svelte-h="svelte-1gomi2f"><h3 class="svelte-zk8o5a">\u{1F4A1} Conseils</h3> <div class="tips-grid svelte-zk8o5a"><div class="tip-item svelte-zk8o5a"><span class="tip-icon svelte-zk8o5a">\u{1F30A}</span> <span class="tip-text svelte-zk8o5a">Mar\xE9e montante = vagues douces</span></div> <div class="tip-item svelte-zk8o5a"><span class="tip-icon svelte-zk8o5a">\u2B06\uFE0F</span> <span class="tip-text svelte-zk8o5a">Mar\xE9e haute = surf expert</span></div> <div class="tip-item svelte-zk8o5a"><span class="tip-icon svelte-zk8o5a">\u2B07\uFE0F</span> <span class="tip-text svelte-zk8o5a">Mar\xE9e basse = d\xE9butants</span></div> <div class="tip-item svelte-zk8o5a"><span class="tip-icon svelte-zk8o5a">\u26A0\uFE0F</span> <span class="tip-text svelte-zk8o5a">Attention aux rochers</span></div></div></div>`}</div> </main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => component_cache3 ?? (component_cache3 = (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default);
    imports3 = ["_app/immutable/nodes/2.DVnsN4IH.js", "_app/immutable/chunks/BAzXF0TR.js", "_app/immutable/chunks/IHki7fMi.js"];
    stylesheets3 = ["_app/immutable/assets/2.BfBAYTLi.css"];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/entries/pages/about/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var css3, Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/about/_page.svelte.js"() {
    init_ssr();
    css3 = {
      code: "body{margin:0;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;background:linear-gradient(135deg, #4A90E2 0%, #7B68EE 100%);min-height:100vh;color:#333}main.svelte-cp3ax6.svelte-cp3ax6{max-width:1000px;margin:0 auto;padding:20px}header.svelte-cp3ax6.svelte-cp3ax6{text-align:center;color:white;margin-bottom:2rem}header.svelte-cp3ax6 h1.svelte-cp3ax6{font-size:2.5rem;margin:0 0 1rem 0;text-shadow:2px 2px 4px rgba(0,0,0,0.3)}.back-link.svelte-cp3ax6.svelte-cp3ax6{color:white;text-decoration:none;padding:0.5rem 1rem;background:rgba(255,255,255,0.2);border-radius:20px;transition:background-color 0.3s ease}.back-link.svelte-cp3ax6.svelte-cp3ax6:hover{background:rgba(255,255,255,0.3)}.container.svelte-cp3ax6.svelte-cp3ax6{background:white;border-radius:15px;padding:2rem;box-shadow:0 10px 30px rgba(0,0,0,0.2)}section.svelte-cp3ax6.svelte-cp3ax6{margin-bottom:2rem}section.svelte-cp3ax6.svelte-cp3ax6:last-child{margin-bottom:0}h2.svelte-cp3ax6.svelte-cp3ax6{color:#4A90E2;margin-bottom:1rem}.intro.svelte-cp3ax6 p.svelte-cp3ax6{font-size:1.1rem;line-height:1.6;color:#555}.features-grid.svelte-cp3ax6.svelte-cp3ax6{display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1.5rem;margin-top:1rem}.feature.svelte-cp3ax6.svelte-cp3ax6{background:#f8f9fa;padding:1.5rem;border-radius:12px;text-align:center;transition:transform 0.3s ease}.feature.svelte-cp3ax6.svelte-cp3ax6:hover{transform:translateY(-5px)}.feature-icon.svelte-cp3ax6.svelte-cp3ax6{font-size:2.5rem;margin-bottom:1rem}.feature.svelte-cp3ax6 h3.svelte-cp3ax6{color:#4A90E2;margin-bottom:0.5rem}.feature.svelte-cp3ax6 p.svelte-cp3ax6{color:#666;line-height:1.5;margin:0}.tech-list.svelte-cp3ax6.svelte-cp3ax6{display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:1rem}.tech-item.svelte-cp3ax6.svelte-cp3ax6{background:#4A90E2;color:white;padding:0.5rem 1rem;border-radius:20px;font-size:0.9rem;font-weight:bold}.disclaimer.svelte-cp3ax6.svelte-cp3ax6{background:#fff3cd;border:1px solid #ffeaa7;border-radius:8px;padding:1.5rem}.disclaimer.svelte-cp3ax6 h2.svelte-cp3ax6{color:#856404;margin-top:0}.disclaimer.svelte-cp3ax6 p.svelte-cp3ax6{color:#856404;margin:0;line-height:1.5}.data-sources.svelte-cp3ax6.svelte-cp3ax6{background:#e9ecef;border-radius:8px;padding:1.5rem}.data-sources.svelte-cp3ax6 h2.svelte-cp3ax6{margin-top:0}.data-sources.svelte-cp3ax6 p.svelte-cp3ax6{color:#555;margin:0;line-height:1.5}@media(max-width: 768px){main.svelte-cp3ax6.svelte-cp3ax6{padding:10px}header.svelte-cp3ax6 h1.svelte-cp3ax6{font-size:2rem}.container.svelte-cp3ax6.svelte-cp3ax6{padding:1rem}.features-grid.svelte-cp3ax6.svelte-cp3ax6{grid-template-columns:1fr}}",
      map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\"><\/script>\\r\\n\\r\\n<svelte:head>\\r\\n\\t<title>\xC0 propos - Surf Report</title>\\r\\n</svelte:head>\\r\\n\\r\\n<main>\\r\\n\\t<header>\\r\\n\\t\\t<h1>\u{1F3C4}\u200D\u2642\uFE0F \xC0 propos de Surf Report</h1>\\r\\n\\t\\t<a href=\\"/\\" class=\\"back-link\\">\u2190 Retour aux mar\xE9es</a>\\r\\n\\t</header>\\r\\n\\r\\n\\t<div class=\\"container\\">\\r\\n\\t\\t<section class=\\"intro\\">\\r\\n\\t\\t\\t<h2>\u{1F30A} Votre compagnon de surf gratuit</h2>\\r\\n\\t\\t\\t<p>\\r\\n\\t\\t\\t\\tSurf Report est une Progressive Web App (PWA) gratuite et open-source \\r\\n\\t\\t\\t\\tqui vous aide \xE0 planifier vos sessions de surf en consultant les horaires \\r\\n\\t\\t\\t\\tde mar\xE9es des principales plages fran\xE7aises.\\r\\n\\t\\t\\t</p>\\r\\n\\t\\t</section>\\r\\n\\r\\n\\t\\t<section class=\\"features\\">\\r\\n\\t\\t\\t<h2>\u2728 Fonctionnalit\xE9s</h2>\\r\\n\\t\\t\\t<div class=\\"features-grid\\">\\r\\n\\t\\t\\t\\t<div class=\\"feature\\">\\r\\n\\t\\t\\t\\t\\t<div class=\\"feature-icon\\">\u{1F3D6}\uFE0F</div>\\r\\n\\t\\t\\t\\t\\t<h3>Plages populaires</h3>\\r\\n\\t\\t\\t\\t\\t<p>Acc\xE8s aux donn\xE9es de mar\xE9e des spots de surf les plus pris\xE9s de France</p>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<div class=\\"feature\\">\\r\\n\\t\\t\\t\\t\\t<div class=\\"feature-icon\\">\u23F0</div>\\r\\n\\t\\t\\t\\t\\t<h3>Horaires pr\xE9cis</h3>\\r\\n\\t\\t\\t\\t\\t<p>Consultez les heures exactes des mar\xE9es hautes et basses</p>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<div class=\\"feature\\">\\r\\n\\t\\t\\t\\t\\t<div class=\\"feature-icon\\">\u{1F3C4}\u200D\u2640\uFE0F</div>\\r\\n\\t\\t\\t\\t\\t<h3>Conseils de surf</h3>\\r\\n\\t\\t\\t\\t\\t<p>Recommandations adapt\xE9es selon les conditions de mar\xE9e</p>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<div class=\\"feature\\">\\r\\n\\t\\t\\t\\t\\t<div class=\\"feature-icon\\">\u{1F4F1}</div>\\r\\n\\t\\t\\t\\t\\t<h3>PWA</h3>\\r\\n\\t\\t\\t\\t\\t<p>Installation possible sur votre t\xE9l\xE9phone comme une app native</p>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<div class=\\"feature\\">\\r\\n\\t\\t\\t\\t\\t<div class=\\"feature-icon\\">\u{1F504}</div>\\r\\n\\t\\t\\t\\t\\t<h3>Mise \xE0 jour auto</h3>\\r\\n\\t\\t\\t\\t\\t<p>Donn\xE9es actualis\xE9es automatiquement toutes les 30 minutes</p>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<div class=\\"feature\\">\\r\\n\\t\\t\\t\\t\\t<div class=\\"feature-icon\\">\u{1F4B0}</div>\\r\\n\\t\\t\\t\\t\\t<h3>100% Gratuit</h3>\\r\\n\\t\\t\\t\\t\\t<p>Aucun co\xFBt, aucune inscription, aucune publicit\xE9</p>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</section>\\r\\n\\r\\n\\t\\t<section class=\\"tech\\">\\r\\n\\t\\t\\t<h2>\u{1F6E0}\uFE0F Technologies utilis\xE9es</h2>\\r\\n\\t\\t\\t<div class=\\"tech-list\\">\\r\\n\\t\\t\\t\\t<span class=\\"tech-item\\">Svelte</span>\\r\\n\\t\\t\\t\\t<span class=\\"tech-item\\">SvelteKit</span>\\r\\n\\t\\t\\t\\t<span class=\\"tech-item\\">TypeScript</span>\\r\\n\\t\\t\\t\\t<span class=\\"tech-item\\">PWA</span>\\r\\n\\t\\t\\t\\t<span class=\\"tech-item\\">Vite</span>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</section>\\r\\n\\r\\n\\t\\t<section class=\\"disclaimer\\">\\r\\n\\t\\t\\t<h2>\u26A0\uFE0F Avertissement</h2>\\r\\n\\t\\t\\t<p>\\r\\n\\t\\t\\t\\t<strong>Cette application est \xE0 des fins informatives uniquement.</strong><br>\\r\\n\\t\\t\\t\\tLes conditions de surf d\xE9pendent de nombreux facteurs (vagues, vent, courants, etc.). \\r\\n\\t\\t\\t\\tV\xE9rifiez toujours les conditions locales et votre niveau avant d'entrer dans l'eau. \\r\\n\\t\\t\\t\\tRespectez les consignes de s\xE9curit\xE9 et les r\xE9glementations locales.\\r\\n\\t\\t\\t</p>\\r\\n\\t\\t</section>\\r\\n\\r\\n\\t\\t<section class=\\"data-sources\\">\\r\\n\\t\\t\\t<h2>\u{1F4CA} Sources de donn\xE9es</h2>\\r\\n\\t\\t\\t<p>\\r\\n\\t\\t\\t\\tLes donn\xE9es de mar\xE9e sont obtenues via des APIs gratuites. En cas d'indisponibilit\xE9 \\r\\n\\t\\t\\t\\tde l'API, l'application utilise des donn\xE9es simul\xE9es r\xE9alistes bas\xE9es sur les \\r\\n\\t\\t\\t\\tcycles de mar\xE9e semi-diurnes typiques des c\xF4tes fran\xE7aises.\\r\\n\\t\\t\\t</p>\\r\\n\\t\\t</section>\\r\\n\\t</div>\\r\\n</main>\\r\\n\\r\\n<style>\\r\\n\\t:global(body) {\\r\\n\\t\\tmargin: 0;\\r\\n\\t\\tfont-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\\r\\n\\t\\tbackground: linear-gradient(135deg, #4A90E2 0%, #7B68EE 100%);\\r\\n\\t\\tmin-height: 100vh;\\r\\n\\t\\tcolor: #333;\\r\\n\\t}\\r\\n\\r\\n\\tmain {\\r\\n\\t\\tmax-width: 1000px;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tpadding: 20px;\\r\\n\\t}\\r\\n\\r\\n\\theader {\\r\\n\\t\\ttext-align: center;\\r\\n\\t\\tcolor: white;\\r\\n\\t\\tmargin-bottom: 2rem;\\r\\n\\t}\\r\\n\\r\\n\\theader h1 {\\r\\n\\t\\tfont-size: 2.5rem;\\r\\n\\t\\tmargin: 0 0 1rem 0;\\r\\n\\t\\ttext-shadow: 2px 2px 4px rgba(0,0,0,0.3);\\r\\n\\t}\\r\\n\\r\\n\\t.back-link {\\r\\n\\t\\tcolor: white;\\r\\n\\t\\ttext-decoration: none;\\r\\n\\t\\tpadding: 0.5rem 1rem;\\r\\n\\t\\tbackground: rgba(255,255,255,0.2);\\r\\n\\t\\tborder-radius: 20px;\\r\\n\\t\\ttransition: background-color 0.3s ease;\\r\\n\\t}\\r\\n\\r\\n\\t.back-link:hover {\\r\\n\\t\\tbackground: rgba(255,255,255,0.3);\\r\\n\\t}\\r\\n\\r\\n\\t.container {\\r\\n\\t\\tbackground: white;\\r\\n\\t\\tborder-radius: 15px;\\r\\n\\t\\tpadding: 2rem;\\r\\n\\t\\tbox-shadow: 0 10px 30px rgba(0,0,0,0.2);\\r\\n\\t}\\r\\n\\r\\n\\tsection {\\r\\n\\t\\tmargin-bottom: 2rem;\\r\\n\\t}\\r\\n\\r\\n\\tsection:last-child {\\r\\n\\t\\tmargin-bottom: 0;\\r\\n\\t}\\r\\n\\r\\n\\th2 {\\r\\n\\t\\tcolor: #4A90E2;\\r\\n\\t\\tmargin-bottom: 1rem;\\r\\n\\t}\\r\\n\\r\\n\\t.intro p {\\r\\n\\t\\tfont-size: 1.1rem;\\r\\n\\t\\tline-height: 1.6;\\r\\n\\t\\tcolor: #555;\\r\\n\\t}\\r\\n\\r\\n\\t.features-grid {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tgrid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\\r\\n\\t\\tgap: 1.5rem;\\r\\n\\t\\tmargin-top: 1rem;\\r\\n\\t}\\r\\n\\r\\n\\t.feature {\\r\\n\\t\\tbackground: #f8f9fa;\\r\\n\\t\\tpadding: 1.5rem;\\r\\n\\t\\tborder-radius: 12px;\\r\\n\\t\\ttext-align: center;\\r\\n\\t\\ttransition: transform 0.3s ease;\\r\\n\\t}\\r\\n\\r\\n\\t.feature:hover {\\r\\n\\t\\ttransform: translateY(-5px);\\r\\n\\t}\\r\\n\\r\\n\\t.feature-icon {\\r\\n\\t\\tfont-size: 2.5rem;\\r\\n\\t\\tmargin-bottom: 1rem;\\r\\n\\t}\\r\\n\\r\\n\\t.feature h3 {\\r\\n\\t\\tcolor: #4A90E2;\\r\\n\\t\\tmargin-bottom: 0.5rem;\\r\\n\\t}\\r\\n\\r\\n\\t.feature p {\\r\\n\\t\\tcolor: #666;\\r\\n\\t\\tline-height: 1.5;\\r\\n\\t\\tmargin: 0;\\r\\n\\t}\\r\\n\\r\\n\\t.tech-list {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-wrap: wrap;\\r\\n\\t\\tgap: 0.5rem;\\r\\n\\t\\tmargin-top: 1rem;\\r\\n\\t}\\r\\n\\r\\n\\t.tech-item {\\r\\n\\t\\tbackground: #4A90E2;\\r\\n\\t\\tcolor: white;\\r\\n\\t\\tpadding: 0.5rem 1rem;\\r\\n\\t\\tborder-radius: 20px;\\r\\n\\t\\tfont-size: 0.9rem;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t}\\r\\n\\r\\n\\t.disclaimer {\\r\\n\\t\\tbackground: #fff3cd;\\r\\n\\t\\tborder: 1px solid #ffeaa7;\\r\\n\\t\\tborder-radius: 8px;\\r\\n\\t\\tpadding: 1.5rem;\\r\\n\\t}\\r\\n\\r\\n\\t.disclaimer h2 {\\r\\n\\t\\tcolor: #856404;\\r\\n\\t\\tmargin-top: 0;\\r\\n\\t}\\r\\n\\r\\n\\t.disclaimer p {\\r\\n\\t\\tcolor: #856404;\\r\\n\\t\\tmargin: 0;\\r\\n\\t\\tline-height: 1.5;\\r\\n\\t}\\r\\n\\r\\n\\t.data-sources {\\r\\n\\t\\tbackground: #e9ecef;\\r\\n\\t\\tborder-radius: 8px;\\r\\n\\t\\tpadding: 1.5rem;\\r\\n\\t}\\r\\n\\r\\n\\t.data-sources h2 {\\r\\n\\t\\tmargin-top: 0;\\r\\n\\t}\\r\\n\\r\\n\\t.data-sources p {\\r\\n\\t\\tcolor: #555;\\r\\n\\t\\tmargin: 0;\\r\\n\\t\\tline-height: 1.5;\\r\\n\\t}\\r\\n\\r\\n\\t@media (max-width: 768px) {\\r\\n\\t\\tmain {\\r\\n\\t\\t\\tpadding: 10px;\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\theader h1 {\\r\\n\\t\\t\\tfont-size: 2rem;\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t.container {\\r\\n\\t\\t\\tpadding: 1rem;\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t.features-grid {\\r\\n\\t\\t\\tgrid-template-columns: 1fr;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA2FS,IAAM,CACb,MAAM,CAAE,CAAC,CACT,WAAW,CAAE,UAAU,CAAC,CAAC,MAAM,CAAC,CAAC,MAAM,CAAC,CAAC,OAAO,CAAC,CAAC,UAAU,CAC5D,UAAU,CAAE,gBAAgB,MAAM,CAAC,CAAC,OAAO,CAAC,EAAE,CAAC,CAAC,OAAO,CAAC,IAAI,CAAC,CAC7D,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,IACR,CAEA,gCAAK,CACJ,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IACV,CAEA,kCAAO,CACN,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,KAAK,CACZ,aAAa,CAAE,IAChB,CAEA,oBAAM,CAAC,gBAAG,CACT,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAClB,WAAW,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CACxC,CAEA,sCAAW,CACV,KAAK,CAAE,KAAK,CACZ,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,UAAU,CAAE,KAAK,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CACjC,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,gBAAgB,CAAC,IAAI,CAAC,IACnC,CAEA,sCAAU,MAAO,CAChB,UAAU,CAAE,KAAK,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CACjC,CAEA,sCAAW,CACV,UAAU,CAAE,KAAK,CACjB,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CACvC,CAEA,mCAAQ,CACP,aAAa,CAAE,IAChB,CAEA,mCAAO,WAAY,CAClB,aAAa,CAAE,CAChB,CAEA,8BAAG,CACF,KAAK,CAAE,OAAO,CACd,aAAa,CAAE,IAChB,CAEA,oBAAM,CAAC,eAAE,CACR,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IACR,CAEA,0CAAe,CACd,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,QAAQ,CAAC,CAAC,OAAO,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,CAC3D,GAAG,CAAE,MAAM,CACX,UAAU,CAAE,IACb,CAEA,oCAAS,CACR,UAAU,CAAE,OAAO,CACnB,OAAO,CAAE,MAAM,CACf,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,IAC5B,CAEA,oCAAQ,MAAO,CACd,SAAS,CAAE,WAAW,IAAI,CAC3B,CAEA,yCAAc,CACb,SAAS,CAAE,MAAM,CACjB,aAAa,CAAE,IAChB,CAEA,sBAAQ,CAAC,gBAAG,CACX,KAAK,CAAE,OAAO,CACd,aAAa,CAAE,MAChB,CAEA,sBAAQ,CAAC,eAAE,CACV,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CACT,CAEA,sCAAW,CACV,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,GAAG,CAAE,MAAM,CACX,UAAU,CAAE,IACb,CAEA,sCAAW,CACV,UAAU,CAAE,OAAO,CACnB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IACd,CAEA,uCAAY,CACX,UAAU,CAAE,OAAO,CACnB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,MACV,CAEA,yBAAW,CAAC,gBAAG,CACd,KAAK,CAAE,OAAO,CACd,UAAU,CAAE,CACb,CAEA,yBAAW,CAAC,eAAE,CACb,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,CAAC,CACT,WAAW,CAAE,GACd,CAEA,yCAAc,CACb,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,MACV,CAEA,2BAAa,CAAC,gBAAG,CAChB,UAAU,CAAE,CACb,CAEA,2BAAa,CAAC,eAAE,CACf,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,CAAC,CACT,WAAW,CAAE,GACd,CAEA,MAAO,YAAY,KAAK,CAAE,CACzB,gCAAK,CACJ,OAAO,CAAE,IACV,CAEA,oBAAM,CAAC,gBAAG,CACT,SAAS,CAAE,IACZ,CAEA,sCAAW,CACV,OAAO,CAAE,IACV,CAEA,0CAAe,CACd,qBAAqB,CAAE,GACxB,CACD"}`
    };
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css3);
      return `${$$result.head += `<!-- HEAD_svelte-1anyqwu_START -->${$$result.title = `<title>\xC0 propos - Surf Report</title>`, ""}<!-- HEAD_svelte-1anyqwu_END -->`, ""} <main class="svelte-cp3ax6" data-svelte-h="svelte-zztnl5"><header class="svelte-cp3ax6"><h1 class="svelte-cp3ax6">\u{1F3C4}\u200D\u2642\uFE0F \xC0 propos de Surf Report</h1> <a href="/" class="back-link svelte-cp3ax6">\u2190 Retour aux mar\xE9es</a></header> <div class="container svelte-cp3ax6"><section class="intro svelte-cp3ax6"><h2 class="svelte-cp3ax6">\u{1F30A} Votre compagnon de surf gratuit</h2> <p class="svelte-cp3ax6">Surf Report est une Progressive Web App (PWA) gratuite et open-source 
				qui vous aide \xE0 planifier vos sessions de surf en consultant les horaires 
				de mar\xE9es des principales plages fran\xE7aises.</p></section> <section class="features svelte-cp3ax6"><h2 class="svelte-cp3ax6">\u2728 Fonctionnalit\xE9s</h2> <div class="features-grid svelte-cp3ax6"><div class="feature svelte-cp3ax6"><div class="feature-icon svelte-cp3ax6">\u{1F3D6}\uFE0F</div> <h3 class="svelte-cp3ax6">Plages populaires</h3> <p class="svelte-cp3ax6">Acc\xE8s aux donn\xE9es de mar\xE9e des spots de surf les plus pris\xE9s de France</p></div> <div class="feature svelte-cp3ax6"><div class="feature-icon svelte-cp3ax6">\u23F0</div> <h3 class="svelte-cp3ax6">Horaires pr\xE9cis</h3> <p class="svelte-cp3ax6">Consultez les heures exactes des mar\xE9es hautes et basses</p></div> <div class="feature svelte-cp3ax6"><div class="feature-icon svelte-cp3ax6">\u{1F3C4}\u200D\u2640\uFE0F</div> <h3 class="svelte-cp3ax6">Conseils de surf</h3> <p class="svelte-cp3ax6">Recommandations adapt\xE9es selon les conditions de mar\xE9e</p></div> <div class="feature svelte-cp3ax6"><div class="feature-icon svelte-cp3ax6">\u{1F4F1}</div> <h3 class="svelte-cp3ax6">PWA</h3> <p class="svelte-cp3ax6">Installation possible sur votre t\xE9l\xE9phone comme une app native</p></div> <div class="feature svelte-cp3ax6"><div class="feature-icon svelte-cp3ax6">\u{1F504}</div> <h3 class="svelte-cp3ax6">Mise \xE0 jour auto</h3> <p class="svelte-cp3ax6">Donn\xE9es actualis\xE9es automatiquement toutes les 30 minutes</p></div> <div class="feature svelte-cp3ax6"><div class="feature-icon svelte-cp3ax6">\u{1F4B0}</div> <h3 class="svelte-cp3ax6">100% Gratuit</h3> <p class="svelte-cp3ax6">Aucun co\xFBt, aucune inscription, aucune publicit\xE9</p></div></div></section> <section class="tech svelte-cp3ax6"><h2 class="svelte-cp3ax6">\u{1F6E0}\uFE0F Technologies utilis\xE9es</h2> <div class="tech-list svelte-cp3ax6"><span class="tech-item svelte-cp3ax6">Svelte</span> <span class="tech-item svelte-cp3ax6">SvelteKit</span> <span class="tech-item svelte-cp3ax6">TypeScript</span> <span class="tech-item svelte-cp3ax6">PWA</span> <span class="tech-item svelte-cp3ax6">Vite</span></div></section> <section class="disclaimer svelte-cp3ax6"><h2 class="svelte-cp3ax6">\u26A0\uFE0F Avertissement</h2> <p class="svelte-cp3ax6"><strong>Cette application est \xE0 des fins informatives uniquement.</strong><br>
				Les conditions de surf d\xE9pendent de nombreux facteurs (vagues, vent, courants, etc.). 
				V\xE9rifiez toujours les conditions locales et votre niveau avant d&#39;entrer dans l&#39;eau. 
				Respectez les consignes de s\xE9curit\xE9 et les r\xE9glementations locales.</p></section> <section class="data-sources svelte-cp3ax6"><h2 class="svelte-cp3ax6">\u{1F4CA} Sources de donn\xE9es</h2> <p class="svelte-cp3ax6">Les donn\xE9es de mar\xE9e sont obtenues via des APIs gratuites. En cas d&#39;indisponibilit\xE9 
				de l&#39;API, l&#39;application utilise des donn\xE9es simul\xE9es r\xE9alistes bas\xE9es sur les 
				cycles de mar\xE9e semi-diurnes typiques des c\xF4tes fran\xE7aises.</p></section></div> </main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => component_cache4 ?? (component_cache4 = (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default);
    imports4 = ["_app/immutable/nodes/3.Cuyj8bHw.js", "_app/immutable/chunks/BAzXF0TR.js", "_app/immutable/chunks/IHki7fMi.js"];
    stylesheets4 = ["_app/immutable/assets/3.DiX9FLoH.css"];
    fonts4 = [];
  }
});

// node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
  );
}
var is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function stringify_key(key2) {
  return is_identifier.test(key2) ? "." + key2 : "[" + JSON.stringify(key2) + "]";
}

// node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
          return;
        case "ArrayBuffer":
          return;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(stringify_key(key2));
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify3(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify3(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify3(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify3).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        const typedArray = thing;
        return `new ${type}([${typedArray.toString()}])`;
      }
      case "ArrayBuffer": {
        const ui8 = new Uint8Array(thing);
        return `new Uint8Array([${ui8.toString()}]).buffer`;
      }
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify3(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify3(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify3(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify3(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify3(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify3(k)}, ${stringify3(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify3(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string") return stringify_string(thing);
  if (thing === void 0) return "void 0";
  if (thing === 0 && 1 / thing < 0) return "-0";
  const str = String(thing);
  if (typeof thing === "number") return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint") return thing + "n";
  return str;
}

// node_modules/devalue/src/base64.js
function encode64(arraybuffer) {
  const dv = new DataView(arraybuffer);
  let binaryString = "";
  for (let i = 0; i < arraybuffer.byteLength; i++) {
    binaryString += String.fromCharCode(dv.getUint8(i));
  }
  return binaryToAscii(binaryString);
}
function decode64(string) {
  const binaryString = asciiToBinary(string);
  const arraybuffer = new ArrayBuffer(binaryString.length);
  const dv = new DataView(arraybuffer);
  for (let i = 0; i < arraybuffer.byteLength; i++) {
    dv.setUint8(i, binaryString.charCodeAt(i));
  }
  return arraybuffer;
}
var KEY_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function asciiToBinary(data) {
  if (data.length % 4 === 0) {
    data = data.replace(/==?$/, "");
  }
  let output = "";
  let buffer = 0;
  let accumulatedBits = 0;
  for (let i = 0; i < data.length; i++) {
    buffer <<= 6;
    buffer |= KEY_STRING.indexOf(data[i]);
    accumulatedBits += 6;
    if (accumulatedBits === 24) {
      output += String.fromCharCode((buffer & 16711680) >> 16);
      output += String.fromCharCode((buffer & 65280) >> 8);
      output += String.fromCharCode(buffer & 255);
      buffer = accumulatedBits = 0;
    }
  }
  if (accumulatedBits === 12) {
    buffer >>= 4;
    output += String.fromCharCode(buffer);
  } else if (accumulatedBits === 18) {
    buffer >>= 2;
    output += String.fromCharCode((buffer & 65280) >> 8);
    output += String.fromCharCode(buffer & 255);
  }
  return output;
}
function binaryToAscii(str) {
  let out = "";
  for (let i = 0; i < str.length; i += 3) {
    const groupsOfSix = [void 0, void 0, void 0, void 0];
    groupsOfSix[0] = str.charCodeAt(i) >> 2;
    groupsOfSix[1] = (str.charCodeAt(i) & 3) << 4;
    if (str.length > i + 1) {
      groupsOfSix[1] |= str.charCodeAt(i + 1) >> 4;
      groupsOfSix[2] = (str.charCodeAt(i + 1) & 15) << 2;
    }
    if (str.length > i + 2) {
      groupsOfSix[2] |= str.charCodeAt(i + 2) >> 6;
      groupsOfSix[3] = str.charCodeAt(i + 2) & 63;
    }
    for (let j = 0; j < groupsOfSix.length; j++) {
      if (typeof groupsOfSix[j] === "undefined") {
        out += "=";
      } else {
        out += KEY_STRING[groupsOfSix[j]];
      }
    }
  }
  return out;
}

// node_modules/devalue/src/constants.js
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;

// node_modules/devalue/src/parse.js
function parse(serialized, revivers) {
  return unflatten(JSON.parse(serialized), revivers);
}
function unflatten(parsed, revivers) {
  if (typeof parsed === "number") return hydrate(parsed, true);
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid input");
  }
  const values = (
    /** @type {any[]} */
    parsed
  );
  const hydrated = Array(values.length);
  function hydrate(index5, standalone = false) {
    if (index5 === UNDEFINED) return void 0;
    if (index5 === NAN) return NaN;
    if (index5 === POSITIVE_INFINITY) return Infinity;
    if (index5 === NEGATIVE_INFINITY) return -Infinity;
    if (index5 === NEGATIVE_ZERO) return -0;
    if (standalone) throw new Error(`Invalid input`);
    if (index5 in hydrated) return hydrated[index5];
    const value = values[index5];
    if (!value || typeof value !== "object") {
      hydrated[index5] = value;
    } else if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const type = value[0];
        const reviver = revivers?.[type];
        if (reviver) {
          return hydrated[index5] = reviver(hydrate(value[1]));
        }
        switch (type) {
          case "Date":
            hydrated[index5] = new Date(value[1]);
            break;
          case "Set":
            const set = /* @__PURE__ */ new Set();
            hydrated[index5] = set;
            for (let i = 1; i < value.length; i += 1) {
              set.add(hydrate(value[i]));
            }
            break;
          case "Map":
            const map = /* @__PURE__ */ new Map();
            hydrated[index5] = map;
            for (let i = 1; i < value.length; i += 2) {
              map.set(hydrate(value[i]), hydrate(value[i + 1]));
            }
            break;
          case "RegExp":
            hydrated[index5] = new RegExp(value[1], value[2]);
            break;
          case "Object":
            hydrated[index5] = Object(value[1]);
            break;
          case "BigInt":
            hydrated[index5] = BigInt(value[1]);
            break;
          case "null":
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index5] = obj;
            for (let i = 1; i < value.length; i += 2) {
              obj[value[i]] = hydrate(value[i + 1]);
            }
            break;
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "BigInt64Array":
          case "BigUint64Array": {
            const TypedArrayConstructor = globalThis[type];
            const base64 = value[1];
            const arraybuffer = decode64(base64);
            const typedArray = new TypedArrayConstructor(arraybuffer);
            hydrated[index5] = typedArray;
            break;
          }
          case "ArrayBuffer": {
            const base64 = value[1];
            const arraybuffer = decode64(base64);
            hydrated[index5] = arraybuffer;
            break;
          }
          default:
            throw new Error(`Unknown type ${type}`);
        }
      } else {
        const array2 = new Array(value.length);
        hydrated[index5] = array2;
        for (let i = 0; i < value.length; i += 1) {
          const n = value[i];
          if (n === HOLE) continue;
          array2[i] = hydrate(n);
        }
      }
    } else {
      const object = {};
      hydrated[index5] = object;
      for (const key2 in value) {
        const n = value[key2];
        object[key2] = hydrate(n);
      }
    }
    return hydrated[index5];
  }
  return hydrate(0);
}

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  if (reducers) {
    for (const key2 of Object.getOwnPropertyNames(reducers)) {
      custom.push({ key: key2, fn: reducers[key2] });
    }
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing)) return indexes.get(thing);
    if (thing === void 0) return UNDEFINED;
    if (Number.isNaN(thing)) return NAN;
    if (thing === Infinity) return POSITIVE_INFINITY;
    if (thing === -Infinity) return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO;
    const index6 = p++;
    indexes.set(thing, index6);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index6] = `["${key2}",${flatten(value2)}]`;
        return index6;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          const valid = !isNaN(thing.getDate());
          str = `["Date","${valid ? thing.toISOString() : ""}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0) str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
            keys.pop();
          }
          str += "]";
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          const typedArray = thing;
          const base64 = encode64(typedArray.buffer);
          str = '["' + type + '","' + base64 + '"]';
          break;
        }
        case "ArrayBuffer": {
          const arraybuffer = thing;
          const base64 = encode64(arraybuffer);
          str = `["ArrayBuffer","${base64}"]`;
          break;
        }
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(stringify_key(key2));
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started) str += ",";
              started = true;
              keys.push(stringify_key(key2));
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index6] = str;
    return index6;
  }
  const index5 = flatten(value);
  if (index5 < 0) return `${index5}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string") return stringify_string(thing);
  if (thing instanceof String) return stringify_string(thing.toString());
  if (thing === void 0) return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO.toString();
  if (type === "bigint") return `["BigInt","${thing}"]`;
  return String(thing);
}

// .svelte-kit/output/server/chunks/event-state.js
init_utils();
var BROWSER = false;
var request_event = null;
var als;
import("node:async_hooks").then((hooks) => als = new hooks.AsyncLocalStorage()).catch(() => {
});
function with_event(event, fn) {
  try {
    request_event = event;
    return als ? als.run(event, fn) : fn();
  } finally {
    request_event = null;
  }
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function stringify2(data, transport) {
  const encoders = Object.fromEntries(Object.entries(transport).map(([k, v]) => [k, v.encode]));
  return stringify(data, encoders);
}
function parse_remote_arg(string, transport) {
  if (!string) return void 0;
  const json_string = text_decoder.decode(
    // no need to add back `=` characters, atob can handle it
    base64_decode(string.replaceAll("-", "+").replaceAll("_", "/"))
  );
  const decoders = Object.fromEntries(Object.entries(transport).map(([k, v]) => [k, v.decode]));
  return parse(json_string, decoders);
}
var EVENT_STATE = Symbol("remote");
function create_event_state(state, options2) {
  return {
    prerendering: state.prerendering,
    transport: options2.hooks.transport,
    handleValidationError: options2.hooks.handleValidationError
  };
}
function get_event_state(event) {
  return event[EVENT_STATE];
}

// node_modules/@sveltejs/kit/src/exports/index.js
init_internal();

// node_modules/esm-env/true.js
var true_default = true;

// node_modules/esm-env/dev-fallback.js
var node_env = globalThis.process?.env?.NODE_ENV;
var dev_fallback_default = node_env && !node_env.toLowerCase().startsWith("prod");

// node_modules/@sveltejs/kit/src/runtime/utils.js
var text_encoder2 = new TextEncoder();
var text_decoder2 = new TextDecoder();

// node_modules/@sveltejs/kit/src/exports/index.js
function error(status, body2) {
  if ((!true_default || dev_fallback_default) && (isNaN(status) || status < 400 || status > 599)) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  throw new HttpError(status, body2);
}
function json(data, init2) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", text_encoder2.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = text_encoder2.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}

// .svelte-kit/output/server/index.js
init_internal();

// .svelte-kit/output/server/chunks/environment.js
var base = "";
var assets = base;
var app_dir = "_app";
var initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var prerendering = false;

// .svelte-kit/output/server/index.js
init_exports();
init_utils();
init_ssr();

// .svelte-kit/output/server/chunks/internal.js
init_ssr();
init_ssr2();
var public_env = {};
var safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
var read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0) $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0) $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0) $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0) $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      {
        data: data_0,
        params: page2.params,
        this: components[0]
      },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            {
              data: data_1,
              form,
              params: page2.params,
              this: components[1]
            },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      {
        data: data_0,
        form,
        params: page2.params,
        this: components[0]
      },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hash_routing: false,
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body: body2, assets: assets2, nonce, env }) => '<!doctype html>\r\n<html lang="fr">\r\n	<head>\r\n		<meta charset="utf-8" />\r\n		<link rel="icon" href="' + assets2 + '/favicon.svg" />\r\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\r\n		<meta name="theme-color" content="#4A90E2" />\r\n		<meta name="description" content="Application de surf pour consulter les mar\xE9es" />\r\n		<link rel="manifest" href="/manifest.json" />\r\n		' + head + '\r\n	</head>\r\n	<body data-sveltekit-preload-data="hover">\r\n		<div style="display: contents">' + body2 + "</div>\r\n	</body>\r\n</html>\r\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "rxkxf9"
};
async function get_hooks() {
  let handle;
  let handleFetch;
  let handleError;
  let handleValidationError;
  let init2;
  let reroute;
  let transport;
  return {
    handle,
    handleFetch,
    handleError,
    handleValidationError,
    init: init2,
    reroute,
    transport
  };
}

// .svelte-kit/output/server/index.js
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/ \t]+)\/([^; \t]+)[ \t]*(?:;[ \t]*q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {import('../exports/internal/index.js').Redirect | HttpError | SvelteKitError | Error} */
    error2
  );
}
function get_status(error2) {
  return error2 instanceof HttpError || error2 instanceof SvelteKitError ? error2.status : 500;
}
function get_message(error2) {
  return error2 instanceof SvelteKitError ? error2.text : "Internal Error";
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
  // Svelte also escapes < because the escape function could be called inside a `noscript` there
  // https://github.com/sveltejs/svelte/security/advisories/GHSA-8266-84wp-wv5c
  // However, that doesn't apply in SvelteKit
};
var escape_html_dict = {
  "&": "&amp;",
  "<": "&lt;"
};
var surrogates = (
  // high surrogate without paired low surrogate
  "[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]"
);
var escape_html_attr_regex = new RegExp(
  `[${Object.keys(escape_html_attr_dict).join("")}]|` + surrogates,
  "g"
);
var escape_html_regex = new RegExp(
  `[${Object.keys(escape_html_dict).join("")}]|` + surrogates,
  "g"
);
function escape_html(str, is_attr) {
  const dict = is_attr ? escape_html_attr_dict : escape_html_dict;
  const escaped_str = str.replace(is_attr ? escape_html_attr_regex : escape_html_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return escaped_str;
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod) allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message: escape_html(message) });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = get_status(error2);
  const body2 = await handle_error_and_jsonify(event, options2, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  }
  const status = get_status(error2);
  const message = get_message(error2);
  return await with_event(
    event,
    () => options2.hooks.handleError({ error: error2, event, status, message })
  ) ?? { message };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (${error2.path}). If you need to serialize/deserialize custom types, use transport hooks: https://svelte.dev/docs/kit/hooks#Universal-hooks-transport.`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function serialize_uses(node) {
  const uses = {};
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.dependencies = Array.from(node.uses.dependencies);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.search_params = Array.from(node.uses.search_params);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.params = Array.from(node.uses.params);
  }
  if (node.uses?.parent) uses.parent = 1;
  if (node.uses?.route) uses.route = 1;
  if (node.uses?.url) uses.url = 1;
  return uses;
}
function has_prerendered_path(manifest2, pathname) {
  return manifest2._.prerendered_routes.has(pathname) || pathname.at(-1) === "/" && manifest2._.prerendered_routes.has(pathname.slice(0, -1));
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && !mod.HEAD && mod.GET) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !state.prerendering.inside_reroute && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    const response = await with_event(
      event,
      () => handler(
        /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
        event
      )
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering && (!state.prerendering.inside_reroute || prerender)) {
      const cloned = new Response(response.clone().body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      cloned.headers.set("x-sveltekit-prerender", String(prerender));
      if (state.prerendering.inside_reroute && prerender) {
        cloned.headers.set(
          "x-sveltekit-routeid",
          encodeURI(
            /** @type {string} */
            event.route.id
          )
        );
        state.prerendering.dependencies.set(event.url.pathname, { response: cloned, body: null });
      } else {
        return cloned;
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true") return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
var DATA_SUFFIX = "/__data.json";
var HTML_DATA_SUFFIX = ".html__data.json";
function has_data_suffix2(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix2(pathname) {
  if (pathname.endsWith(".html")) return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix2(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
var ROUTE_SUFFIX = "/__route.js";
function has_resolution_suffix2(pathname) {
  return pathname.endsWith(ROUTE_SUFFIX);
}
function add_resolution_suffix2(pathname) {
  return pathname.replace(/\/$/, "") + ROUTE_SUFFIX;
}
function strip_resolution_suffix2(pathname) {
  return pathname.slice(0, -ROUTE_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      `POST method not allowed. No form actions exist for ${"this page"}`
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false) ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error2;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        `POST method not allowed. No form actions exist for ${"this page"}`
      )
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false) ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://svelte.dev/docs/kit/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return with_event(event, () => action(event));
}
function uneval_action_response(data, route_id, transport) {
  const replacer = (thing) => {
    for (const key2 in transport) {
      const encoded = transport[key2].encode(thing);
      if (encoded) {
        return `app.decode('${key2}', ${uneval(encoded, replacer)})`;
      }
    }
  };
  return try_serialize(data, (value) => uneval(value, replacer), route_id);
}
function stringify_action_response(data, route_id, transport) {
  const encoders = Object.fromEntries(
    Object.entries(transport).map(([key2, value]) => [key2, value.encode])
  );
  return try_serialize(data, (value) => stringify(value, encoders), route_id);
}
function try_serialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = (
      /** @type {any} */
      e
    );
    if (data instanceof Response) {
      throw new Error(
        `Data returned from action inside ${route_id} is not serializable. Form actions need to return plain objects or fail(). E.g. return { success: true } or return fail(400, { message: "invalid" });`
      );
    }
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "") message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server) return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const load = node.server.load;
  const slash = node.server.trailingSlash;
  if (!load) {
    return { type: "data", data: null, uses, slash };
  }
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state.prerendering) {
    disable_search(url);
  }
  let done = false;
  const result = await with_event(
    event,
    () => load.call(null, {
      ...event,
      fetch: (info, init2) => {
        const url2 = new URL(info instanceof Request ? info.url : info, event.url);
        if (BROWSER && done && !uses.dependencies.has(url2.href)) ;
        return event.fetch(info, init2);
      },
      /** @param {string[]} deps */
      depends: (...deps) => {
        for (const dep of deps) {
          const { href } = new URL(dep, event.url);
          if (BROWSER) ;
          uses.dependencies.add(href);
        }
      },
      params: new Proxy(event.params, {
        get: (target, key2) => {
          if (BROWSER && done && typeof key2 === "string" && !uses.params.has(key2)) ;
          if (is_tracking) {
            uses.params.add(key2);
          }
          return target[
            /** @type {string} */
            key2
          ];
        }
      }),
      parent: async () => {
        if (BROWSER && done && !uses.parent) ;
        if (is_tracking) {
          uses.parent = true;
        }
        return parent();
      },
      route: new Proxy(event.route, {
        get: (target, key2) => {
          if (BROWSER && done && typeof key2 === "string" && !uses.route) ;
          if (is_tracking) {
            uses.route = true;
          }
          return target[
            /** @type {'id'} */
            key2
          ];
        }
      }),
      url,
      untrack(fn) {
        is_tracking = false;
        try {
          return fn();
        } finally {
          is_tracking = true;
        }
      }
    })
  );
  done = true;
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  const load = node?.universal?.load;
  if (!load) {
    return server_data_node?.data ?? null;
  }
  const result = await with_event(
    event,
    () => load.call(null, {
      url: event.url,
      params: event.params,
      data: server_data_node?.data ?? null,
      route: event.route,
      fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
      setHeaders: event.setHeaders,
      depends: () => {
      },
      parent,
      untrack: (fn) => fn()
    })
  );
  return result ?? null;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else if (url.protocol === "https:" || url.protocol === "http:") {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            const bytes = new Uint8Array(buffer);
            if (dependency) {
              dependency.body = bytes;
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(base64_encode(bytes), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://svelte.dev/docs/kit/hooks#Server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += text_decoder.decode(value);
  }
  return result;
}
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i) hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i) hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control") cache_control = value;
    else if (key2 === "age") age = value;
    else if (key2 === "vary" && value.trim() === "*") varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url="${escape_html(fetched.url, true)}"`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
function sha256(data) {
  if (!key[0]) precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return btoa(String.fromCharCode(...bytes));
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = text_encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _script_src_needs_csp, _script_src_elem_needs_csp, _style_needs_csp, _style_src_needs_csp, _style_src_attr_needs_csp, _style_src_elem_needs_csp, _directives, _script_src, _script_src_elem, _style_src, _style_src_attr, _style_src_elem, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp);
    /** @type {boolean} */
    __privateAdd(this, _script_src_needs_csp);
    /** @type {boolean} */
    __privateAdd(this, _script_src_elem_needs_csp);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp);
    /** @type {boolean} */
    __privateAdd(this, _style_src_needs_csp);
    /** @type {boolean} */
    __privateAdd(this, _style_src_attr_needs_csp);
    /** @type {boolean} */
    __privateAdd(this, _style_src_elem_needs_csp);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src_elem);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src_attr);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src_elem);
    /** @type {string} */
    __privateAdd(this, _nonce);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _script_src_elem, []);
    __privateSet(this, _style_src, []);
    __privateSet(this, _style_src_attr, []);
    __privateSet(this, _style_src_elem, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    const needs_csp = (directive) => !!directive && !directive.some((value) => value === "unsafe-inline");
    __privateSet(this, _script_src_needs_csp, needs_csp(effective_script_src));
    __privateSet(this, _script_src_elem_needs_csp, needs_csp(script_src_elem));
    __privateSet(this, _style_src_needs_csp, needs_csp(effective_style_src));
    __privateSet(this, _style_src_attr_needs_csp, needs_csp(style_src_attr));
    __privateSet(this, _style_src_elem_needs_csp, needs_csp(style_src_elem));
    __privateSet(this, _script_needs_csp, __privateGet(this, _script_src_needs_csp) || __privateGet(this, _script_src_elem_needs_csp));
    __privateSet(this, _style_needs_csp, __privateGet(this, _style_src_needs_csp) || __privateGet(this, _style_src_attr_needs_csp) || __privateGet(this, _style_src_elem_needs_csp));
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (!__privateGet(this, _script_needs_csp)) return;
    const source = __privateGet(this, _use_hashes) ? `sha256-${sha256(content)}` : `nonce-${__privateGet(this, _nonce)}`;
    if (__privateGet(this, _script_src_needs_csp)) {
      __privateGet(this, _script_src).push(source);
    }
    if (__privateGet(this, _script_src_elem_needs_csp)) {
      __privateGet(this, _script_src_elem).push(source);
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (!__privateGet(this, _style_needs_csp)) return;
    const source = __privateGet(this, _use_hashes) ? `sha256-${sha256(content)}` : `nonce-${__privateGet(this, _nonce)}`;
    if (__privateGet(this, _style_src_needs_csp)) {
      __privateGet(this, _style_src).push(source);
    }
    if (__privateGet(this, _style_src_attr_needs_csp)) {
      __privateGet(this, _style_src_attr).push(source);
    }
    if (__privateGet(this, _style_src_elem_needs_csp)) {
      const sha256_empty_comment_hash = "sha256-9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = __privateGet(this, _directives);
      if (d["style-src-elem"] && !d["style-src-elem"].includes(sha256_empty_comment_hash) && !__privateGet(this, _style_src_elem).includes(sha256_empty_comment_hash)) {
        __privateGet(this, _style_src_elem).push(sha256_empty_comment_hash);
      }
      if (source !== sha256_empty_comment_hash) {
        __privateGet(this, _style_src_elem).push(source);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _style_src_attr).length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...__privateGet(this, _style_src_attr)
      ];
    }
    if (__privateGet(this, _style_src_elem).length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...__privateGet(this, _style_src_elem)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    if (__privateGet(this, _script_src_elem).length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...__privateGet(this, _script_src_elem)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value) continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_script_src_needs_csp = new WeakMap();
_script_src_elem_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_style_src_needs_csp = new WeakMap();
_style_src_attr_needs_csp = new WeakMap();
_style_src_elem_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_script_src_elem = new WeakMap();
_style_src = new WeakMap();
_style_src_attr = new WeakMap();
_style_src_elem = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content="${escape_html(content, true)}">`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done) deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest) result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered) return;
  return result;
}
function generate_route_object(route, url, manifest2) {
  const { errors, layouts, leaf } = route;
  const nodes = [...errors, ...layouts.map((l) => l?.[1]), leaf[1]].filter((n) => typeof n === "number").map((n) => `'${n}': () => ${create_client_import(manifest2._.client.nodes?.[n], url)}`).join(",\n		");
  return [
    `{
	id: ${s(route.id)}`,
    `errors: ${s(route.errors)}`,
    `layouts: ${s(route.layouts)}`,
    `leaf: ${s(route.leaf)}`,
    `nodes: {
		${nodes}
	}
}`
  ].join(",\n	");
}
function create_client_import(import_path, url) {
  if (!import_path) return "Promise.resolve({})";
  if (import_path[0] === "/") {
    return `import('${import_path}')`;
  }
  if (assets !== "") {
    return `import('${assets}/${import_path}')`;
  }
  let path = get_relative_path(url.pathname, `${base}/${import_path}`);
  if (path[0] !== ".") path = `./${path}`;
  return `import('${path}')`;
}
async function resolve_route(resolved_path, url, manifest2) {
  if (!manifest2._.client.routes) {
    return text("Server-side route resolution disabled", { status: 400 });
  }
  let route = null;
  let params = {};
  const matchers = await manifest2._.matchers();
  for (const candidate of manifest2._.client.routes) {
    const match = candidate.pattern.exec(resolved_path);
    if (!match) continue;
    const matched = exec(match, candidate.params, matchers);
    if (matched) {
      route = candidate;
      params = decode_params(matched);
      break;
    }
  }
  return create_server_routing_response(route, params, url, manifest2).response;
}
function create_server_routing_response(route, params, url, manifest2) {
  const headers2 = new Headers({
    "content-type": "application/javascript; charset=utf-8"
  });
  if (route) {
    const csr_route = generate_route_object(route, url, manifest2);
    const body2 = `${create_css_import(route, url, manifest2)}
export const route = ${csr_route}; export const params = ${JSON.stringify(params)};`;
    return { response: text(body2, { headers: headers2 }), body: body2 };
  } else {
    return { response: text("", { headers: headers2 }), body: "" };
  }
}
function create_css_import(route, url, manifest2) {
  const { errors, layouts, leaf } = route;
  let css4 = "";
  for (const node of [...errors, ...layouts.map((l) => l?.[1]), leaf[1]]) {
    if (typeof node !== "number") continue;
    const node_css = manifest2._.client.css?.[node];
    for (const css_path of node_css ?? []) {
      css4 += `'${assets || base}/${css_path}',`;
    }
  }
  if (!css4) return "";
  return `${create_client_import(
    /** @type {string} */
    manifest2._.client.start,
    url
  )}.then(x => x.load_css([${css4}]));`;
}
var updated = {
  ...readable(false),
  check: () => false
};
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets5 = new Set(client.stylesheets);
  const fonts5 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  {
    if (!state.prerendering?.fallback) {
      const segments = event.url.pathname.slice(base.length).split("/").slice(2);
      base$1 = segments.map(() => "..").join("/") || ".";
      base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
      if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
        assets$1 = base$1;
      }
    } else if (options2.hash_routing) {
      base_expression = "new URL('.', location).pathname.slice(0, -1)";
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(
        branch.map(({ node }) => {
          if (!node.component) {
            throw new Error(`Missing +page.svelte component for route ${event.route.id}`);
          }
          return node.component();
        })
      ),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    const render_opts = {
      context: /* @__PURE__ */ new Map([
        [
          "__request__",
          {
            page: props.page
          }
        ]
      ])
    };
    {
      try {
        rendered = with_event(event, () => options2.root.render(props, render_opts));
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports) modulepreloads.add(url);
      for (const url of node.stylesheets) stylesheets5.add(url);
      for (const url of node.fonts) fonts5.add(url);
      if (node.inline_styles && !client.inline) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  const style = client.inline ? client.inline?.style : Array.from(inline_styles.values()).join("\n");
  if (style) {
    const attributes = [];
    if (csp.style_needs_nonce) attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(style);
    head += `
	<style${attributes.join("")}>${style}</style>`;
  }
  for (const dep of stylesheets5) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts5) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    csp,
    global
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const route = manifest2._.client.routes?.find((r) => r.id === event.route.id) ?? null;
    if (client.uses_env_dynamic_public && state.prerendering) {
      modulepreloads.add(`${app_dir}/env.js`);
    }
    if (!client.inline) {
      const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
        (path) => resolve_opts.preload({ type: "js", path })
      );
      for (const path of included_modulepreloads) {
        link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
        if (options2.preload_strategy !== "modulepreload") {
          head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
        } else if (state.prerendering) {
          head += `
		<link rel="modulepreload" href="${path}">`;
        }
      }
    }
    if (manifest2._.client.routes && state.prerendering && !state.prerendering.fallback) {
      const pathname = add_resolution_suffix2(event.url.pathname);
      state.prerendering.dependencies.set(
        pathname,
        create_server_routing_response(route, event.params, new URL(pathname, event.url), manifest2)
      );
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const try_to_resolve = () => {
								if (!deferred.has(id)) {
									setTimeout(try_to_resolve, 0);
									return;
								}
								const { fulfil, reject } = deferred.get(id);
								deferred.delete(id);
								if (error) reject(error);
								else fulfil(data);
							}
							try_to_resolve();
						}`);
    }
    const { remote_data } = get_event_state(event);
    if (remote_data) {
      const remote = {};
      for (const key2 in remote_data) {
        remote[key2] = await remote_data[key2];
      }
      const replacer = (thing) => {
        for (const key2 in options2.hooks.transport) {
          const encoded = options2.hooks.transport[key2].encode(thing);
          if (encoded) {
            return `app.decode('${key2}', ${uneval(encoded, replacer)})`;
          }
        }
      };
      properties.push(`data: ${uneval(remote, replacer)}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        );
      }
      if (error2) {
        serialized.error = uneval(error2);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        `data: ${data}`,
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (manifest2._.client.routes) {
        if (route) {
          const stringified = generate_route_object(route, event.url, manifest2).replaceAll(
            "\n",
            "\n							"
          );
          hydrate.push(`params: ${uneval(event.params)}`, `server_route: ${stringified}`);
        }
      } else if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate.join(`,
${indent}	`)}
${indent}}`);
    }
    const boot = client.inline ? `${client.inline.script}

					__sveltekit_${options2.version_hash}.app.start(${args.join(", ")});` : client.app ? `Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(app, ${args.join(", ")});
					});` : `import(${s(prefixed(client.start))}).then((app) => {
						app.start(${args.join(", ")})
					});`;
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						${boot.replace(/\n/g, "\n	")}
					});`);
    } else {
      blocks.push(boot);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(text_encoder.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(text_encoder.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: headers2
    }
  );
}
function get_data(event, options2, nodes, csp, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error: error2 }, replacer);
          } catch {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error: error2 }, replacer);
          }
          const nonce = csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : "";
          push(`<script${nonce}>${global}.resolve(${str})<\/script>
`);
          if (count === 0) done();
        }
      );
      return `${global}.defer(${id})`;
    } else {
      for (const key2 in options2.hooks.transport) {
        const encoded = options2.hooks.transport[key2].encode(thing);
        if (encoded) {
          return `app.decode('${key2}', ${uneval(encoded, replacer)})`;
        }
      }
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      const payload = { type: "data", data: node.data, uses: serialize_uses(node) };
      if (node.slash) payload.slash = node.slash;
      return uneval(payload, replacer);
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    e.path = e.path.slice(1);
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
var _PageNodes_instances, get_option_fn;
var PageNodes = class {
  /**
   * @param {Array<import('types').SSRNode | undefined>} nodes
   */
  constructor(nodes) {
    __privateAdd(this, _PageNodes_instances);
    __publicField(this, "data");
    this.data = nodes;
  }
  layouts() {
    return this.data.slice(0, -1);
  }
  page() {
    return this.data.at(-1);
  }
  validate() {
    for (const layout of this.layouts()) {
      if (layout) {
        validate_layout_server_exports(
          layout.server,
          /** @type {string} */
          layout.server_id
        );
        validate_layout_exports(
          layout.universal,
          /** @type {string} */
          layout.universal_id
        );
      }
    }
    const page2 = this.page();
    if (page2) {
      validate_page_server_exports(
        page2.server,
        /** @type {string} */
        page2.server_id
      );
      validate_page_exports(
        page2.universal,
        /** @type {string} */
        page2.universal_id
      );
    }
  }
  csr() {
    return __privateMethod(this, _PageNodes_instances, get_option_fn).call(this, "csr") ?? true;
  }
  ssr() {
    return __privateMethod(this, _PageNodes_instances, get_option_fn).call(this, "ssr") ?? true;
  }
  prerender() {
    return __privateMethod(this, _PageNodes_instances, get_option_fn).call(this, "prerender") ?? false;
  }
  trailing_slash() {
    return __privateMethod(this, _PageNodes_instances, get_option_fn).call(this, "trailingSlash") ?? "never";
  }
  get_config() {
    let current = {};
    for (const node of this.data) {
      if (!node?.universal?.config && !node?.server?.config) continue;
      current = {
        ...current,
        // TODO: should we override the server config value with the universal value similar to other page options?
        ...node?.universal?.config,
        ...node?.server?.config
      };
    }
    return Object.keys(current).length ? current : void 0;
  }
  should_prerender_data() {
    return this.data.some(
      // prerender in case of trailingSlash because the client retrieves that value from the server
      (node) => node?.server?.load || node?.server?.trailingSlash !== void 0
    );
  }
};
_PageNodes_instances = new WeakSet();
/**
 * @template {'prerender' | 'ssr' | 'csr' | 'trailingSlash'} Option
 * @param {Option} option
 * @returns {Value | undefined}
 */
get_option_fn = function(option) {
  return this.data.reduce(
    (value, node) => {
      return node?.universal?.[option] ?? node?.server?.[option] ?? value;
    },
    /** @type {Value | undefined} */
    void 0
  );
};
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error2.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const nodes = new PageNodes([default_layout]);
    const ssr = nodes.ssr();
    const csr = nodes.csr();
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      get_status(e),
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done) return result;
    done = true;
    return result = fn();
  };
}
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError || error2 instanceof SvelteKitError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(text_encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(text_encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response(
    /** @type {import('types').ServerRedirectNode} */
    {
      type: "redirect",
      location: redirect.location
    }
  );
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    ...Object.fromEntries(
      Object.entries(options2.hooks.transport).map(([key2, value]) => [key2, value.encode])
    ),
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch {
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error2, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0) done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},"uses":${JSON.stringify(
        serialize_uses(node)
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    e.path = "data" + e.path;
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
async function handle_remote_call(event, options2, manifest2, id) {
  const [hash2, name, prerender_args] = id.split("/");
  const remotes = manifest2._.remotes;
  if (!remotes[hash2]) error(404);
  const module = await remotes[hash2]();
  const fn = module[name];
  if (!fn) error(404);
  const info = fn.__;
  const transport = options2.hooks.transport;
  let form_client_refreshes;
  try {
    if (info.type === "form") {
      if (!is_form_content_type(event.request)) {
        throw new SvelteKitError(
          415,
          "Unsupported Media Type",
          `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
            "content-type"
          )}`
        );
      }
      const form_data = await event.request.formData();
      form_client_refreshes = JSON.parse(
        /** @type {string} */
        form_data.get("sveltekit:remote_refreshes") ?? "[]"
      );
      form_data.delete("sveltekit:remote_refreshes");
      const fn2 = info.fn;
      const data2 = await with_event(event, () => fn2(form_data));
      return json(
        /** @type {RemoteFunctionResponse} */
        {
          type: "result",
          result: stringify2(data2, transport),
          refreshes: await serialize_refreshes(
            /** @type {string[]} */
            form_client_refreshes
          )
        }
      );
    }
    if (info.type === "command") {
      const { payload: payload2, refreshes } = await event.request.json();
      const arg = parse_remote_arg(payload2, transport);
      const data2 = await with_event(event, () => fn(arg));
      return json(
        /** @type {RemoteFunctionResponse} */
        {
          type: "result",
          result: stringify2(data2, transport),
          refreshes: await serialize_refreshes(refreshes)
        }
      );
    }
    const payload = info.type === "prerender" ? prerender_args : (
      /** @type {string} */
      // new URL(...) necessary because we're hiding the URL from the user in the event object
      new URL(event.request.url).searchParams.get("payload")
    );
    const data = await with_event(event, () => fn(parse_remote_arg(payload, transport)));
    return json(
      /** @type {RemoteFunctionResponse} */
      {
        type: "result",
        result: stringify2(data, transport)
      }
    );
  } catch (error2) {
    if (error2 instanceof Redirect) {
      return json({
        type: "redirect",
        location: error2.location,
        refreshes: await serialize_refreshes(form_client_refreshes ?? [])
      });
    }
    return json(
      /** @type {RemoteFunctionResponse} */
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, error2),
        status: error2 instanceof HttpError || error2 instanceof SvelteKitError ? error2.status : 500
      },
      {
        headers: {
          "cache-control": "private, no-store"
        }
      }
    );
  }
  async function serialize_refreshes(client_refreshes) {
    const refreshes = {
      ...get_event_state(event).refreshes,
      ...Object.fromEntries(
        await Promise.all(
          client_refreshes.map(async (key2) => {
            const [hash3, name2, payload] = key2.split("/");
            const loader = manifest2._.remotes[hash3];
            if (!loader) error(400, "Bad Request");
            const module2 = await loader();
            const fn2 = module2[name2];
            if (!fn2) error(400, "Bad Request");
            return [key2, await with_event(event, () => fn2(parse_remote_arg(payload, transport)))];
          })
        )
      )
    };
    return Object.keys(refreshes).length > 0 ? stringify2(refreshes, transport) : void 0;
  }
}
async function handle_remote_form_post(event, manifest2, id) {
  const [hash2, name, action_id] = id.split("/");
  const remotes = manifest2._.remotes;
  const module = await remotes[hash2]?.();
  let form = (
    /** @type {RemoteForm<any>} */
    module?.[name]
  );
  if (!form) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        `POST method not allowed. No form actions exist for ${"this page"}`
      )
    };
  }
  if (action_id) {
    form = with_event(event, () => form.for(JSON.parse(action_id)));
  }
  try {
    const form_data = await event.request.formData();
    const fn = (
      /** @type {RemoteInfo & { type: 'form' }} */
      /** @type {any} */
      form.__.fn
    );
    await with_event(event, () => fn(form_data));
    return {
      type: "success",
      status: 200
    };
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function get_remote_id(url) {
  return url.pathname.startsWith(`${base}/${app_dir}/remote/`) && url.pathname.replace(`${base}/${app_dir}/remote/`, "");
}
function get_remote_action(url) {
  return url.searchParams.get("/remote");
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, nodes, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.page()
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      const remote_id = get_remote_action(event.url);
      if (remote_id) {
        action_result = await handle_remote_form_post(event, manifest2, remote_id);
      } else {
        action_result = await handle_action_request(event, leaf_node.server);
      }
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender = nodes.prerender();
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const should_prerender_data = nodes.should_prerender_data();
    const data_pathname = add_data_suffix2(event.url.pathname);
    const fetched = [];
    const ssr = nodes.ssr();
    const csr = nodes.csr();
    if (ssr === false && !(state.prerendering && should_prerender_data)) {
      if (BROWSER && action_result && !event.request.headers.has("x-sveltekit-action")) ;
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.data.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent) Object.assign(data, parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const load_promises = nodes.data.map((node, i) => {
      if (load_error) throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises) p.catch(() => {
    });
    for (const p of load_promises) p.catch(() => {
    });
    for (let i = 0; i < nodes.data.length; i += 1) {
      const node = nodes.data[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index5 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index5]();
              let j = i;
              while (!branch[j]) j -= 1;
              const layouts = compact(branch.slice(0, j + 1));
              const nodes2 = new PageNodes(layouts.map((layout) => layout.node));
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: {
                  ssr: nodes2.ssr(),
                  csr: nodes2.csr()
                },
                status: status2,
                error: error2,
                branch: layouts.concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr,
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
var INVALID_COOKIE_CHARACTER_REGEX = /[\x00-\x1F\x7F()<>@,;:"/[\]?={} \t]/;
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
function get_cookies(request, url) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  let normalized_url;
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} [opts]
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const req_cookies = (0, import_cookie.parse)(header, { decode: opts?.decode });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} [opts]
     */
    getAll(opts) {
      const cookies2 = (0, import_cookie.parse)(header, { decode: opts?.decode });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name, value, options2) {
      const illegal_characters = name.match(INVALID_COOKIE_CHARACTER_REGEX);
      if (illegal_characters) {
        console.warn(
          `The cookie name "${name}" will be invalid in SvelteKit 3.0 as it contains ${illegal_characters.join(
            " and "
          )}. See RFC 2616 for more details https://datatracker.ietf.org/doc/html/rfc2616#section-2.2`
        );
      }
      validate_options(options2);
      set_internal(name, value, { ...defaults, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name, options2) {
      validate_options(options2);
      cookies.set(name, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        if (!normalized_url) {
          throw new Error("Cannot serialize cookies until after the route is determined");
        }
        path = resolve(normalized_url, path);
      }
      return (0, import_cookie.serialize)(name, value, { ...defaults, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain)) continue;
      if (!path_matches(destination.pathname, cookie.options.path)) continue;
      const encoder = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  const internal_queue = [];
  function set_internal(name, value, options2) {
    if (!normalized_url) {
      internal_queue.push(() => set_internal(name, value, options2));
      return;
    }
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name] = { name, value, options: { ...options2, path } };
  }
  function set_trailing_slash(trailing_slash) {
    normalized_url = normalize_path(url.pathname, trailing_slash);
    internal_queue.forEach((fn) => fn());
  }
  return { cookies, new_cookies, get_cookie_header, set_internal, set_trailing_slash };
}
function domain_matches(hostname, constraint) {
  if (!constraint) return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized) return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint) return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized) return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix2(options2.path);
      headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, { ...options2, path }));
    }
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie) request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename) || filename in manifest2._.server_assets;
        const is_asset_html = manifest2.assets.has(filename_html) || filename_html in manifest2._.server_assets;
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else if (read_implementation && file in manifest2._.server_assets) {
            const length = manifest2._.server_assets[file];
            const type = manifest2.mimeTypes[file.slice(file.lastIndexOf("."))];
            return new Response(read_implementation(file), {
              headers: {
                "Content-Length": "" + length,
                "Content-Type": type
              }
            });
          }
          return await fetch(request);
        }
        if (has_prerendered_path(manifest2, base + decoded)) {
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await internal_fetch(request, options2, manifest2, state);
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str, {
              decodeValues: false
            });
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name, value, {
              path,
              encode: (value2) => value2,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  };
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
async function internal_fetch(request, options2, manifest2, state) {
  if (request.signal) {
    if (request.signal.aborted) {
      throw new DOMException("The operation was aborted.", "AbortError");
    }
    let remove_abort_listener = () => {
    };
    const abort_promise = new Promise((_, reject) => {
      const on_abort = () => {
        reject(new DOMException("The operation was aborted.", "AbortError"));
      };
      request.signal.addEventListener("abort", on_abort, { once: true });
      remove_abort_listener = () => request.signal.removeEventListener("abort", on_abort);
    });
    const result = await Promise.race([
      respond(request, options2, manifest2, {
        ...state,
        depth: state.depth + 1
      }),
      abort_promise
    ]);
    remove_abort_listener();
    return result;
  } else {
    return await respond(request, options2, manifest2, {
      ...state,
      depth: state.depth + 1
    });
  }
}
var body;
var etag;
var headers;
function get_public_env(request) {
  body ?? (body = `export const env=${JSON.stringify(public_env)}`);
  etag ?? (etag = `W/${Date.now()}`);
  headers ?? (headers = new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  }));
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  const is_route_resolution_request = has_resolution_suffix2(url.pathname);
  const is_data_request = has_data_suffix2(url.pathname);
  const remote_id = get_remote_id(url);
  if (options2.csrf_check_origin && request.headers.get("origin") !== url.origin) {
    const opts = { status: 403 };
    if (remote_id && request.method !== "GET") {
      return json(
        {
          message: "Cross-site remote requests are forbidden"
        },
        opts
      );
    }
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE");
    if (forbidden) {
      const message = `Cross-site ${request.method} form submissions are forbidden`;
      if (request.headers.get("accept") === "application/json") {
        return json({ message }, opts);
      }
      return text(message, opts);
    }
  }
  if (options2.hash_routing && url.pathname !== base + "/" && url.pathname !== "/[fallback]") {
    return text("Not found", { status: 404 });
  }
  let invalidated_data_nodes;
  if (is_route_resolution_request) {
    url.pathname = strip_resolution_suffix2(url.pathname);
  } else if (is_data_request) {
    url.pathname = strip_data_suffix2(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  } else if (remote_id) {
    url.pathname = base;
    url.search = "";
  }
  const headers2 = {};
  const { cookies, new_cookies, get_cookie_header, set_internal, set_trailing_slash } = get_cookies(
    request,
    url
  );
  const event = {
    [EVENT_STATE]: create_event_state(state, options2),
    cookies,
    // @ts-expect-error `fetch` needs to be created after the `event` itself
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params: {},
    platform: state.platform,
    request,
    route: { id: null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0,
    isRemoteRequest: !!remote_id
  };
  event.fetch = create_fetch({
    event,
    options: options2,
    manifest: manifest2,
    state,
    get_cookie_header,
    set_internal
  });
  if (state.emulator?.platform) {
    event.platform = await state.emulator.platform({
      config: {},
      prerender: !!state.prerendering?.fallback
    });
  }
  let resolved_path = url.pathname;
  if (!remote_id) {
    const prerendering_reroute_state = state.prerendering?.inside_reroute;
    try {
      if (state.prerendering) state.prerendering.inside_reroute = true;
      resolved_path = await options2.hooks.reroute({ url: new URL(url), fetch: event.fetch }) ?? url.pathname;
    } catch {
      return text("Internal Server Error", {
        status: 500
      });
    } finally {
      if (state.prerendering) state.prerendering.inside_reroute = prerendering_reroute_state;
    }
  }
  try {
    resolved_path = decode_pathname(resolved_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  if (resolved_path !== url.pathname && !state.prerendering?.fallback && has_prerendered_path(manifest2, resolved_path)) {
    const url2 = new URL(request.url);
    url2.pathname = is_data_request ? add_data_suffix2(resolved_path) : is_route_resolution_request ? add_resolution_suffix2(resolved_path) : resolved_path;
    const response = await fetch(url2, request);
    const headers22 = new Headers(response.headers);
    if (headers22.has("content-encoding")) {
      headers22.delete("content-encoding");
      headers22.delete("content-length");
    }
    return new Response(response.body, {
      headers: headers22,
      status: response.status,
      statusText: response.statusText
    });
  }
  let route = null;
  if (base && !state.prerendering?.fallback) {
    if (!resolved_path.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    resolved_path = resolved_path.slice(base.length) || "/";
  }
  if (is_route_resolution_request) {
    return resolve_route(resolved_path, new URL(request.url), manifest2);
  }
  if (resolved_path === `/${app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (!remote_id && resolved_path.startsWith(`/${app_dir}`)) {
    const headers22 = new Headers();
    headers22.set("cache-control", "public, max-age=0, must-revalidate");
    return text("Not found", { status: 404, headers: headers22 });
  }
  if (!state.prerendering?.fallback && !remote_id) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(resolved_path);
      if (!match) continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        event.route = { id: route.id };
        event.params = decode_params(matched);
        break;
      }
    }
  }
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  let trailing_slash = "never";
  try {
    const page_nodes = route?.page ? new PageNodes(await load_page_nodes(route.page, manifest2)) : void 0;
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (page_nodes) {
        if (BROWSER) ;
        trailing_slash = page_nodes.trailing_slash();
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash ?? "never";
        if (BROWSER) ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash);
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state.before_handle || state.emulator?.platform) {
        let config = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender = node.prerender ?? prerender;
        } else if (page_nodes) {
          config = page_nodes.get_config() ?? config;
          prerender = page_nodes.prerender();
        }
        if (state.before_handle) {
          state.before_handle(event, config, prerender);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config, prerender });
        }
      }
    }
    set_trailing_slash(trailing_slash);
    if (state.prerendering && !state.prerendering.fallback && !state.prerendering.inside_reroute) {
      disable_search(url);
    }
    const response = await with_event(
      event,
      () => options2.hooks.handle({
        event,
        resolve: (event2, opts) => (
          // counter-intuitively, we need to clear the event, so that it's not
          // e.g. accessible when loading modules needed to handle the request
          with_event(
            null,
            () => resolve2(event2, page_nodes, opts).then((response2) => {
              for (const key2 in headers2) {
                const value = headers2[key2];
                response2.headers.set(
                  key2,
                  /** @type {string} */
                  value
                );
              }
              add_cookies_to_headers(response2.headers, Object.values(new_cookies));
              if (state.prerendering && event2.route.id !== null) {
                response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
              }
              return response2;
            })
          )
        )
      })
    );
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value) headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(new_cookies));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve2(event2, page_nodes, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (options2.hash_routing || state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (remote_id) {
        return await handle_remote_call(event2, options2, manifest2, remote_id);
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (!page_nodes) {
            throw new Error("page_nodes not found. This should never happen");
          } else if (page_methods.has(method)) {
            response = await render_page(
              event2,
              route.page,
              options2,
              manifest2,
              state,
              page_nodes,
              resolve_opts
            );
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("Route is neither page nor endpoint. This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        const headers22 = new Headers(request.headers);
        headers22.set("x-sveltekit-error", "true");
        return await fetch(request, { headers: headers22 });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        if (BROWSER && event2.url.pathname === "/.well-known/appspecific/com.chrome.devtools.json") ;
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function load_page_nodes(page2, manifest2) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
    manifest2._.nodes[page2.leaf]()
  ]);
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
function set_app(value) {
}
var prerender_env_handler = {
  get({ type }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type} instead`
    );
  }
};
var init_promise;
var _options, _manifest;
var Server = class {
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options);
    /** @type {import('@sveltejs/kit').SSRManifest} */
    __privateAdd(this, _manifest);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {import('@sveltejs/kit').ServerInitOptions} opts
   */
  async init({ env, read }) {
    const prefixes = {
      public_prefix: __privateGet(this, _options).env_public_prefix,
      private_prefix: __privateGet(this, _options).env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes);
    const public_env2 = filter_public_env(env, prefixes);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (read) {
      const wrapped_read = (file) => {
        const result = read(file);
        if (result instanceof ReadableStream) {
          return result;
        } else {
          return new ReadableStream({
            async start(controller) {
              try {
                const stream = await Promise.resolve(result);
                if (!stream) {
                  controller.close();
                  return;
                }
                const reader = stream.getReader();
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  controller.enqueue(value);
                }
                controller.close();
              } catch (error2) {
                controller.error(error2);
              }
            }
          });
        }
      };
      set_read_implementation(wrapped_read);
    }
    await (init_promise ?? (init_promise = (async () => {
      try {
        const module = await get_hooks();
        __privateGet(this, _options).hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ status, error: error2 }) => console.error(status === 404 && /** @type {Error} */
          error2?.message || error2)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          handleValidationError: module.handleValidationError || (({ issues }) => {
            console.error("Remote function schema validation failed:", issues);
            return { message: "Bad Request" };
          }),
          reroute: module.reroute || (() => {
          }),
          transport: module.transport || {}
        };
        set_app({
          decoders: module.transport ? Object.fromEntries(Object.entries(module.transport).map(([k, v]) => [k, v.decode])) : {}
        });
        if (module.init) {
          await module.init();
        }
      } catch (e) {
        {
          throw e;
        }
      }
    })()));
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/vercel-tmp/![-]/catchall/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ?? (value = value = fn());
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["favicon.svg", "icon-192.svg", "icon-512.svg", "manifest.json", "sw.js"]),
    mimeTypes: { ".svg": "image/svg+xml", ".json": "application/json", ".js": "text/javascript" },
    _: {
      client: { start: "_app/immutable/entry/start.BQJ5RzBd.js", app: "_app/immutable/entry/app.fF_AcmTS.js", imports: ["_app/immutable/entry/start.BQJ5RzBd.js", "_app/immutable/chunks/rtUqGhUU.js", "_app/immutable/chunks/BAzXF0TR.js", "_app/immutable/entry/app.fF_AcmTS.js", "_app/immutable/chunks/BAzXF0TR.js", "_app/immutable/chunks/IHki7fMi.js"], stylesheets: [], fonts: [], uses_env_dynamic_public: false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4)))
      ],
      remotes: {},
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        },
        {
          id: "/about",
          pattern: /^\/about\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 3 },
          endpoint: null
        }
      ],
      prerendered_routes: /* @__PURE__ */ new Set([]),
      matchers: async () => {
        return {};
      },
      server_assets: {}
    }
  };
})();

// .svelte-kit/vercel-tmp/![-]/catchall/edge.js
var server = new Server(manifest);
var origin;
var initialized = server.init({
  env: (
    /** @type {Record<string, string>} */
    process.env
  ),
  read: async (file) => {
    const response = await fetch(`${origin}/${file}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${file}: ${response.status} ${response.statusText}`);
    }
    return response.body;
  }
});
var edge_default = async (request, context) => {
  if (!origin) {
    origin = new URL(request.url).origin;
    await initialized;
  }
  return server.respond(request, {
    getClientAddress() {
      return (
        /** @type {string} */
        request.headers.get("x-forwarded-for")
      );
    },
    platform: {
      context
    }
  });
};
export {
  edge_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=index.js.map
