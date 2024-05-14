import { aws, helpers } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";
import { productName } from "src/helpers/references";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const config = new pulumi.Config();
const environment = config.require("environment");

const environmentHostedZoneRef = helpers.getStackRef({
	environment,
	name: "environment-hosted-zone",
	region: awsRegion,
	productName,
});

const environmentHostedZoneId = environmentHostedZoneRef.getOutput("zoneId");

const certificate = new aws.HttpsCertificate({
	region: awsRegion,
	name: "main-app",
	environment,
	route53ZoneId: environmentHostedZoneId,
});

export const arn = certificate.certificate.arn;
export const urn = certificate.certificate.urn;
export const id = certificate.certificate.id;
