import { aws } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const environment = config.require("environment");

const adminUserGroup = new aws.LocalAdminUserGroup({ environment });
const adminUserGroupName = adminUserGroup.group.name.apply((name) => name);

const users = [
	{
		firstName: "simon",
		surname: "norman",
		userGroupNames: [adminUserGroupName],
	},
];

const newUsers = users.map((user) => new aws.User({ ...user, environment }));

for (const user of newUsers) {
	user.accessKey.id.apply((id) => console.log(id));
	user.accessKey.secret.apply((secret) => console.log(secret));
}

export const groupUrn = adminUserGroup.urn;
