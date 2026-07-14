
const AUDIT_UA_PATTERN =
  /lighthouse|chrome-lighthouse|headlesschrome|pagespeed|google page speed|gtmetrix|pingdom|speed insights/i;

const SOFTWARE_RENDERER_PATTERN =
  /swiftshader|llvmpipe|software|basic render|microsoft basic|angle \(google/i;

function isAuditUserAgent(userAgent) {
  return typeof userAgent === "string" && AUDIT_UA_PATTERN.test(userAgent);
}

export function isLighthouseOrHeadless() {
  if (typeof navigator === "undefined") return false;

  if (navigator.webdriver === true) return true;

  return isAuditUserAgent(navigator.userAgent); 
}

export function isSoftwareRenderer() {
  if (typeof document === "undefined") return false;

  try {
    const probe = document.createElement("canvas");
    const gl =
      probe.getContext("webgl") || probe.getContext("experimental-webgl");
    const debugInfo = gl?.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : gl?.getParameter(gl.RENDERER);

    return (
      typeof renderer === "string" && SOFTWARE_RENDERER_PATTERN.test(renderer)
    );
  } catch {
 
    return true;
  }
}

export function isAuditEnvironment() {
  return isLighthouseOrHeadless() || isSoftwareRenderer();
}
