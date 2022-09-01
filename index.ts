import { CdnWebsite } from "./cdn-website";

const website = new CdnWebsite("neuw", {});

export const websiteUrl = website.url;

import * as checkly from "@checkly/pulumi";
import * as fs from "fs";

new checkly.Check("index-page", {
    activated: true,
    frequency: 10,
    type: "BROWSER",
    locations: ["ap-south-1"],
    script: websiteUrl.apply((url) =>
        fs
            .readFileSync("checkly-embed.js")
            .toString("utf8")
            .replace("{{websiteUrl}}", url)
    ),
});
