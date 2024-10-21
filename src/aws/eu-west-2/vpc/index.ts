import { aws } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const config = new pulumi.Config();
const environment = config.require("environment");

const vpc = new aws.Vpc({
	region: awsRegion,
	name: "main-app",
	environment,
	allowDnsResolution: true,
	// vpn: {
	//   samlVpnEndpointServerCertificateArn:
	// 	"arn:aws:acm:eu-west-2:211125444328:certificate/cad5b32a-3e39-47c0-8422-0c6408c53c6d",
	// sslVpnEndpointServerCertificateArn:
	// 	"arn:aws:acm:eu-west-2:211125444328:certificate/cad5b32a-3e39-47c0-8422-0c6408c53c6d",
	// sslVpnEndpointClientCertificateArn:
	// 	"arn:aws:acm:eu-west-2:211125444328:certificate/cad5b32a-3e39-47c0-8422-0c6408c53c6d",
	// }
});

export const vpcId = vpc.vpc.vpcId;
export const urn = vpc.vpc.urn;
export const publicSubnetIds = vpc.vpc.publicSubnetIds;
export const privateSubnetIds = vpc.vpc.privateSubnetIds;
export const isolatedSubnetIds = vpc.vpc.isolatedSubnetIds;
// export const vpnSecurityGroupId = vpc.vpn?.endpointSecurityGroup.securityGroup.id;
// export const vpnConnectCheckEcsDns = vpc.vpn?.ecsForConnectivityCheck.privateDns;
// export const vpnConnectCheckEcsIp = vpc.vpn?.ecsForConnectivityCheck.privateIp;
