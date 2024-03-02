DOPPLER_CMD := doppler run --


aws_all_infra_up:
	@$(MAKE) vpc_up STACK=$(STACK)
	@$(MAKE) security_groups_up STACK=$(STACK)
	@$(MAKE) public_alb_up STACK=$(STACK)
.PHONY: alb_all_infra_up

aws_all_infra_down:
	@$(MAKE) public_alb_down STACK=$(STACK)
	@$(MAKE) security_groups_down STACK=$(STACK)
	@$(MAKE) vpc_down STACK=$(STACK)
.PHONY: aws_all_infra_down

public_alb_up:
	@cd ./src/aws/eu-west-2/public-application-load-balancer && $(DOPPLER_CMD) pulumi up -s $(STACK)
.PHONY: public_alb_up

public_alb_down:
	@cd ./src/aws/eu-west-2/public-application-load-balancer && $(DOPPLER_CMD) pulumi down -s $(STACK)
.PHONY: public_alb_down

users_up:
	@cd ./src/aws/eu-west-2/users && $(DOPPLER_CMD) pulumi up -s $(STACK)
.PHONY: users_up

users_down:
	@cd ./src/aws/eu-west-2/users && $(DOPPLER_CMD) pulumi up -s $(STACK)
.PHONY: users_down

vpc_up:
	@cd ./src/aws/eu-west-2/vpc && $(DOPPLER_CMD) pulumi up -s $(STACK)
.PHONY: vpc_up

vpc_down:
	@cd ./src/aws/eu-west-2/vpc && $(DOPPLER_CMD) pulumi down -s $(STACK)
.PHONY: vpc_down

security_groups_up:
	@cd ./src/aws/eu-west-2/security-groups && $(DOPPLER_CMD) pulumi up -s $(STACK)
.PHONY: security_groups_up

security_groups_down:
	@cd ./src/aws/eu-west-2/security-groups && $(DOPPLER_CMD) pulumi down -s $(STACK)
.PHONY: security_groups_down

base_64_encode:
	base64 -i $(INPUT_FILE) -o encoded_base64.txt
.PHONY: base_64_encode

base_64_decode:
	base64 --decode -i $(INPUT_FILE) -o pub_key.asc
.PHONY: base_64_encode

# remove % from output of this
keybase_decrypt:
	echo $(INPUT) | base64 --decode | keybase pgp decrypt
.PHONY: base_64_encode

