import { aws } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const config = new pulumi.Config();
const environment = config.require("environment");

const vpcStackRef = new pulumi.StackReference(
	`simon-norman/main-app-eu-west-2-vpc/${environment}`,
);

const vpcId = vpcStackRef.getOutput("vpcId");

const inboundPublicTlsOutbound =
	new aws.SecurityGroupInboundPublicTlsOutboundAll({
		region: awsRegion,
		name: "main-app-inbound-tls-outbound-all",
		environment,
		vpcId,
	});

const inboundFromAlbSecurityGroupOutboundAll =
	new aws.SecurityGroupInboundPrivateOutboundAll({
		region: awsRegion,
		name: "main-app-inbound-alb-outbound-all",
		environment,
		vpcId,
		sourceSecurityGroupId: inboundPublicTlsOutbound.securityGroup.id,
	});

type Group = typeof inboundPublicTlsOutbound.securityGroup;

const getGroupOutputs = (group: Group) => {
	return {
		arn: group.arn,
		urn: group.urn,
		id: group.id,
	};
};

export const inboundPublicTlsOutboundAll = getGroupOutputs(
	inboundPublicTlsOutbound.securityGroup,
);

export const inboundAlbSecurityGroupOutboundAll = getGroupOutputs(
	inboundFromAlbSecurityGroupOutboundAll.securityGroup,
);
