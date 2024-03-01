// import { parseArgs } from "util";
// import { $ } from "bun";

// // const { values } = parseArgs({
// // 	args: Bun.argv,
// // 	options: {
// // 		cmd: {
// // 			type: "string",
// // 		},
// // 	},
// // 	strict: true,
// // 	allowPositionals: true,
// // });
// // if (!values.cmd) throw new Error("No script provided");

// const dopplerCmd = "doppler run -- ";

// // biome-ignore lint/correctness/noUnusedVariables: <explanation>
// const vpcPulumiUp = async () => {
// 	await $`${dopplerCmd} pulumi up`;
// };

// const scripts: Record<string, () => Promise<void>> = {
// 	vpcPulumiUp,
// };

// vpcPulumiUp();

// // const scriptToCall = scripts[values.cmd];
// // if (!scriptToCall) throw new Error("No matching script fn found");

// // scriptToCall();
