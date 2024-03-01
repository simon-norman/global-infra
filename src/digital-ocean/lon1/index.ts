import { digitalOcean } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const environment = config.require("environment");

const vpc = new digitalOcean.Vpc({
	region: "lon1",
	environment,
	name: "main-app",
});

export const vpcId = vpc.vpc.id;
export const urn = vpc.vpc.urn;
export const name = vpc.vpc.name;
export const vpcUrn = vpc.vpc.vpcUrn;
