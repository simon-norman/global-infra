import { aws, helpers } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";
import { productName } from "../../../helpers/references";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const config = new pulumi.Config();
const environment = config.require("environment");

const vpcStackRef = helpers.getStackRef({
	environment,
	name: "vpc",
	region: awsRegion,
	productName,
});

const vpcId = vpcStackRef.getOutput("vpcId");

const publicSubnetIds = vpcStackRef.getOutput("publicSubnetIds");

const datadogApiKeySecretArn = config.require("datadog-secret-arn");

const dbStackRef = helpers.getStackRef({
	environment,
	name: "locations-db",
	region: awsRegion,
	productName,
});

const dbAddress = dbStackRef.getOutput("dbAddress");

const dbInstances = [
	{
		region: awsRegion,
		name: "locations",
		databaseName: "locations",
		hostname: dbAddress,
	},
];

const agent = new aws.DatadogDatabaseMonitoringAgent({
	vpcId,
	// @ts-ignore
	instances: dbInstances,
	datadogApiKeySecretArn,
	region: awsRegion,
	name: "main-app",
	environment,
	subnetId: publicSubnetIds.apply((ids) => ids[0]),
});

export const urn = agent.urn;
