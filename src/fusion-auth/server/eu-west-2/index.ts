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

// const vpnSecurityGroupId = vpcStackRef.getOutput("vpnSecurityGroupId");
// const isolatedSubnetIds = vpcStackRef.getOutput("isolatedSubnetIds");
const publicSubnetIds = vpcStackRef.getOutput("publicSubnetIds");

const envHostedZoneRef = helpers.getStackRef({
	environment,
	name: "environment-hosted-zone",
	region: awsRegion,
	productName,
});
const environmentHostedZoneId = envHostedZoneRef.getOutput("zoneId");

const httpsCertificateRef = helpers.getStackRef({
	environment,
	name: "https-certificate",
	region: awsRegion,
	productName,
});

const certificateArn = httpsCertificateRef.getOutput("arn");

const server = new aws.FusionAuthServer({
	region: awsRegion,
	name: "fusion-auth",
	environment,
	subnetId: publicSubnetIds.apply((ids) => ids[0]),
	certificateArn,
	hostedZoneId: environmentHostedZoneId,
	vpcId: vpcStackRef.getOutput("vpcId"),
});
