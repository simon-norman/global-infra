import { aws } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const hostedZone = new aws.MasterHostedZone({
	region: awsRegion,
	name: "main-app",
});

export const arn = hostedZone.zone.arn;
export const urn = hostedZone.zone.urn;
export const zoneId = hostedZone.zone.zoneId;
