import { aws } from "@breeze32/shared-infra";

const policy = {
	Version: "2012-10-17",
	Statement: [
		{
			Sid: "AllowSecretsManagerAccess",
			Effect: "Allow",
			Action: [
				"secretsmanager:GetSecretValue",
				"secretsmanager:DescribeSecret",
				"secretsmanager:PutSecretValue",
				"secretsmanager:CreateSecret",
				"secretsmanager:DeleteSecret",
				"secretsmanager:TagResource",
				"secretsmanager:UpdateSecret",
			],
			Resource: "*",
		},
	],
};

const role = new aws.CrossAccountAccessRole({
	// @ts-ignore
	policy,
	name: "global-secrets-access",
	trustedAccountIds: ["299900769157"],
});

export const urn = role.role.urn;
export const arn = role.role.arn;
export const name = role.role.name;
export const id = role.role.id;

role.role.arn.apply((value) => console.log("doppler role arn", value));
