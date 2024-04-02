import { aws } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

const pgpPublicKey = config.require("pgppublickey");

const ciUsers = new aws.CiCdUserGroup({});
const ciUserGroupName = ciUsers.group.name.apply((name) => name);

const users = [
	{
		firstName: "ci-cd",
		surname: "user",
		userGroupNames: [ciUserGroupName],
		pgpKey: pgpPublicKey,
	},
];

const newUsers = users.map((user) => new aws.ServiceUser(user));

for (const user of newUsers) {
	user.accessKey.id.apply((id) => console.log(id));
	user.accessKey.secret.apply((secret) => console.log(secret));
}

export const groupUrn = ciUsers.urn;
