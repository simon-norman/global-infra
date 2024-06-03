import { aws, helpers } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";
import { productName } from "../../../helpers/references";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const config = new pulumi.Config();
const environment = config.require("environment");

const masterHostedZoneRef = helpers.getStackRef({
	environment: "master",
	name: "master-hosted-zone",
	region: awsRegion,
	productName,
});

const masterZoneId = masterHostedZoneRef.getOutput("zoneId");

const hostedZone = new aws.EnvironmentHostedZone({
	region: awsRegion,
	name: "main-app",
	environment,
	masterZoneId: masterZoneId,
});

export const arn = hostedZone.zone.arn;
export const urn = hostedZone.zone.urn;
export const zoneId = hostedZone.zone.zoneId;
