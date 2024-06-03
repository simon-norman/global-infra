DOPPLER_CMD := doppler run --


aws_all_infra_up:
	# @$(MAKE) environment_zones_up STACK=$(STACK)
	# @$(MAKE) https_certificate_up STACK=$(STACK)
	@$(MAKE) vpc_up STACK=$(STACK)
	@$(MAKE) security_groups_up STACK=$(STACK)
	@$(MAKE) ec2_cluster_up STACK=$(STACK)
	@$(MAKE) public_alb_up STACK=$(STACK)
.PHONY: alb_all_infra_up

aws_all_infra_down:
	@$(MAKE) public_alb_down STACK=$(STACK)
	@$(MAKE) ec2_cluster_down STACK=$(STACK)
	@$(MAKE) https_certificate_down STACK=$(STACK)
	@$(MAKE) environment_zones_down STACK=$(STACK)
	@$(MAKE) security_groups_down STACK=$(STACK)
	@$(MAKE) vpc_down STACK=$(STACK)
.PHONY: aws_all_infra_down


https_certificate_up:
	@cd ./src/aws/eu-west-2/https-certificates && $(DOPPLER_CMD) pulumi up -r -f -s $(STACK)
.PHONY: https_certificate_up

https_certificate_down:
	@cd ./src/aws/eu-west-2/https-certificates && $(DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: https_certificate_down

environment_zones_up:
	@cd ./src/aws/eu-west-2/environment-hosted-zones && $(DOPPLER_CMD) pulumi up -r -f -s $(STACK)
.PHONY: environment_zones_up

environment_zones_down:
	@cd ./src/aws/eu-west-2/environment-hosted-zones && $(DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: environment_zones_down

master_zone_up:
	@cd ./src/aws/eu-west-2/master-hosted-zone && $(DOPPLER_CMD) pulumi up -r -s master
.PHONY: master_zone_up

master_zone_down:
	@cd ./src/aws/eu-west-2/master-hosted-zone && $(DOPPLER_CMD) pulumi down -r -s master
.PHONY: master_zone_down

public_alb_up:
	@cd ./src/aws/eu-west-2/public-application-load-balancer && $(DOPPLER_CMD) pulumi up -r -f -s $(STACK)
.PHONY: public_alb_up

public_alb_down:
	@cd ./src/aws/eu-west-2/public-application-load-balancer && $(DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: public_alb_down

ci_cd_users_up:
	@cd ./src/aws/eu-west-2/ci-cd-users && $(DOPPLER_CMD) pulumi up -r -s $(STACK)
.PHONY: ci_cd_users_up

ci_cd_users_down:
	@cd ./src/aws/eu-west-2/ci-cd-users && $(DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: ci_cd_users_down

doppler_role_up:
	@cd ./src/aws/global/doppler-role && $(DOPPLER_CMD) pulumi up -r -s $(STACK)
.PHONY: doppler_role_up

doppler_role_down:
	@cd ./src/aws/global/doppler-role && $(DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: doppler_role_down

db_up:
	@cd ./src/aws/eu-west-2/database && $(DOPPLER_CMD) pulumi up -r -s $(STACK)
.PHONY: db_up

db_down:
	@cd ./src/aws/eu-west-2/database && $(DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: db_down

users_up:
	@cd ./src/aws/eu-west-2/users && $(DOPPLER_CMD) pulumi up -r -s $(STACK)
.PHONY: users_up

users_down:
	@cd ./src/aws/eu-west-2/users && $(DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: users_down

vpc_up:
	@cd ./src/aws/eu-west-2/vpc && $(DOPPLER_CMD) pulumi up -r -s $(STACK)
.PHONY: vpc_up

vpc_down:
	@cd ./src/aws/eu-west-2/vpc && $(DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: vpc_down

security_groups_up:
	@cd ./src/aws/eu-west-2/security-groups && $(DOPPLER_CMD) pulumi up -r -f -s $(STACK)
.PHONY: security_groups_up

security_groups_down:
	@cd ./src/aws/eu-west-2/security-groups && $(DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: security_groups_down

ec2_cluster_up:
	@cd ./src/aws/eu-west-2/ec2-cluster && $(DOPPLER_CMD) pulumi up -r -f -s $(STACK)
.PHONY: ec2_cluster_up

ec2_cluster_down:
	@cd ./src/aws/eu-west-2/ec2-cluster && $(DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: ec2_cluster_down

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

