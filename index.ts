import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as fs from "fs";
import * as mime from "mime";
const staticWebsiteDirectory = "website";

const bucket = new aws.s3.BucketV2(
    "bucketV2",
    {
        tags: {
            Name: "My bucket",
        },
    }
);

const bucketAcl = new aws.s3.BucketAclV2("bAcl", {
    bucket: bucket.id,
    acl: aws.s3.PublicReadAcl,
});

fs.readdirSync(staticWebsiteDirectory).forEach((file) => {
    const filePath = `${staticWebsiteDirectory}/${file}`;
    const fileContent = fs.readFileSync(filePath).toString();

    new aws.s3.BucketObject(file, {
        bucket: bucket.id,
        source: new pulumi.asset.FileAsset(filePath),
        contentType: mime.getType(filePath) || undefined,
        acl: aws.s3.PublicReadAcl,
    });
});