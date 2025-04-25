import { aws, fusionAuth, helpers } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";
import { productName } from "../../helpers/references";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const config = new pulumi.Config();
const environment = config.require("environment");

new fusionAuth.FusionAuthComponent({
	region: awsRegion,
	name: "fusion-auth-setup",
	environment,
	users: [
		{
			password: process.env.LOCATIONS_API_INTERNAL_PASSWORD as string,
			email: `locations-api-${environment.split("-"[0])}@${productName}.com`,
			roles: [],
		},
		{
			password: process.env.MOCK_API_INTERNAL_PASSWORD as string,
			email: `mock-api-${environment.split("-"[0])}@${productName}.com`,
			roles: ["locations-api:base"],
		},
		{
			password: process.env.TEST_ENVIRONMENT_SETUP_CLIENT_SECRET as string,
			email: `test-environment-${environment.split("-"[0])}@${productName}.com`,
			roles: ["locations-api:base"],
		},
	],
	roles: ["locations-api:base"],
	applicationName: "main-new-app",
	apiKey: process.env.FUSION_AUTH_API_KEY as string,
	host: process.env.FUSION_AUTH_HOST as string,
	tenantId: process.env.FUSION_AUTH_TENANT_ID as string,
});
