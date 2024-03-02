import { aws } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

const pgpPublicKey = config.require("pgppublickey");

const adminUserGroup = new aws.LocalAdminUserGroup({});
const adminUserGroupName = adminUserGroup.group.name.apply((name) => name);

const users = [
	{
		firstName: "simon",
		surname: "norman1",
		userGroupNames: [adminUserGroupName],
		pgpKey: pgpPublicKey,
	},
];

const newUsers = users.map((user) => new aws.User(user));

for (const user of newUsers) {
	user.accessKey.id.apply((id) => console.log(id));
	user.accessKey.secret.apply((secret) => console.log(secret));
}

export const groupUrn = adminUserGroup.urn;
