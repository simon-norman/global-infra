import { aws } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const config = new pulumi.Config();
const environment = config.require("environment");

const cluster = new aws.Ec2Cluster({
	region: awsRegion,
	name: "main-app",
	environment,
});

export const arn = cluster.cluster.arn;
export const urn = cluster.cluster.urn;
export const zoneId = cluster.cluster.id;
