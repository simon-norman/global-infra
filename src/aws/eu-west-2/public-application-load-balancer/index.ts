import { aws, helpers } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";
import { productName } from "src/helpers/references";

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

const publicSubnetIds = vpcStackRef.getOutput("publicSubnetIds");

const securityGroupsRef = helpers.getStackRef({
	environment,
	name: "security-groups",
	region: awsRegion,
	productName,
});
const securityGroup = securityGroupsRef.getOutput(
	"inboundPublicTlsOutboundAll",
);

const httpsCertificateRef = helpers.getStackRef({
	environment,
	name: "https-certificate",
	region: awsRegion,
	productName,
});

const certificateArn = httpsCertificateRef.getOutput("arn");

const publicLoadBalancer = new aws.ApplicationLoadBalancer({
	region: awsRegion,
	name: "main",
	environment,
	subnetIds: publicSubnetIds,
	securityGroup: securityGroup.apply((group) => group.id),
	isInternal: false,
	httpsCertificateArn: certificateArn,
});

export const arn = publicLoadBalancer.loadBalancer.loadBalancer.arn;
export const urn = publicLoadBalancer.loadBalancer.loadBalancer.urn;
export const id = publicLoadBalancer.loadBalancer.loadBalancer.id;
export const listenerArn = publicLoadBalancer.listener.arn;
export const dnsName = publicLoadBalancer.loadBalancer.loadBalancer.dnsName;
