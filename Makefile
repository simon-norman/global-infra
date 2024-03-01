DOPPLER_CMD := doppler run --

users_up:
	@cd ./src/aws/eu-west-2/users && $(DOPPLER_CMD) pulumi up -s $(STACK)
.PHONY: pulumi_up

users_down:
	@cd ./src/aws/eu-west-2/users && $(DOPPLER_CMD) pulumi up -s $(STACK)
.PHONY: pulumi_up

vpc_up:
	@cd ./src/aws/eu-west-2 && $(DOPPLER_CMD) pulumi up -s $(STACK)
.PHONY: pulumi_up

vpc_down:
	@cd ./src/aws-eu-west-2 && $(DOPPLER_CMD) pulumi down -s $(STACK)
.PHONY: pulumi_up