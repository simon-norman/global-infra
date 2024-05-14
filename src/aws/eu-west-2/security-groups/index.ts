import { helpers } from "@breeze32/shared-infra";
import { aws } from "@breeze32/shared-infra";
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
