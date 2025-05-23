import {
  addGlobalContexts,
  newTracker,
  enableActivityTracking,
} from "@snowplow/browser-tracker";
import { SnowplowEcommercePlugin } from "@snowplow/browser-plugin-snowplow-ecommerce";
import { PerformanceNavigationTimingPlugin } from "@snowplow/browser-plugin-performance-navigation-timing";
import { SiteTrackingPlugin } from "@snowplow/browser-plugin-site-tracking";
import { config } from "@/config";
import { addHotjarUserContext } from "./contexts/hotJarContext";
import { addGitScmReleaseContext } from "./contexts";

if (!config.tracking.SNOWPLOW_COLLECTOR_URL) {
  throw "No Snowplow collector URL configured.";
}

export const tracker = newTracker(
  "sp",
  config.tracking.SNOWPLOW_COLLECTOR_URL,
  {
    appId: config.tracking.SNOWPLOW_APP_ID,
    crossDomainLinker: function (linkElement) {
      return linkElement.href === "https://snowplow.io/";
    },
    contexts: {
      session: true,
      browser: true,
    },
    plugins: [
      PerformanceNavigationTimingPlugin(),
      SnowplowEcommercePlugin(),
      SiteTrackingPlugin(),
    ],
  }
);

addGlobalContexts([addHotjarUserContext, addGitScmReleaseContext]);

// Add Page Pings, Link Links, Button Clicks, Form Submission here