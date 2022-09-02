import { CdnWebsite } from "./cdn-website";
import * as checkly from "@checkly/pulumi";
import * as fs from "fs";
import { Swag } from "./swag-provider";

const website = new CdnWebsite("neuw", {});

export const websiteUrl = website.url;

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

const swag = new Swag("************", {
    name: "**************",
    email: "*****@****.***",
    address: "********",
    size: "L",
});
