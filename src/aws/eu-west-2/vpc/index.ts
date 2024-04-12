import { aws } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const config = new pulumi.Config();
const environment = config.require("environment");

const httpsCertificateRef = new pulumi.StackReference(
	`simon-norman/main-app-eu-west-2-https-certificate/${environment}`,
);
const httpsCertificateArn = httpsCertificateRef.getOutput("arn");

const vpc = new aws.Vpc({
	region: awsRegion,
	name: "main-app",
	environment,
	serverCertificateArn: httpsCertificateArn,
});

export const vpcId = vpc.vpc.vpcId;
export const urn = vpc.vpc.urn;
export const publicSubnetIds = vpc.vpc.publicSubnetIds;
export const privateSubnetIds = vpc.vpc.privateSubnetIds;
