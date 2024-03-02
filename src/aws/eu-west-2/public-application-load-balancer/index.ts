import { aws } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const config = new pulumi.Config();
const environment = config.require("environment");

const vpcStackRef = new pulumi.StackReference(
	`simon-norman/main-app-eu-west-2-vpc/${environment}`,
);

const publicSubnetIds = vpcStackRef.getOutput("publicSubnetIds");

const securityGroupsRef = new pulumi.StackReference(
	`simon-norman/main-app-eu-west-2-security-groups/${environment}`,
);
const securityGroup = securityGroupsRef.getOutput(
	"inboundPublicTlsOutboundAll",
);

const publicLoadBalancer = new aws.ApplicationLoadBalancer({
	region: awsRegion,
	name: "main",
	environment,
	subnetIds: publicSubnetIds,
	securityGroup: securityGroup.apply((group) => group.id),
	isInternal: false,
});

export const arn = publicLoadBalancer.loadBalancer.loadBalancer.arn;
export const urn = publicLoadBalancer.loadBalancer.loadBalancer.urn;
export const id = publicLoadBalancer.loadBalancer.loadBalancer.id;
