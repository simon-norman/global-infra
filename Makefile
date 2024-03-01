DOPPLER_CMD := doppler run --

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
	@cd ./src/aws-eu-west-2 && $(DOPPLER_CMD) pulumi down -s $(STACK)
.PHONY: vpc_down

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

