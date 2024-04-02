import { aws } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const config = new pulumi.Config();
const environment = config.require("environment");

const masterHostedZoneRef = new pulumi.StackReference(
	"simon-norman/main-app-eu-west-2-master-hosted-zone/master",
);

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
