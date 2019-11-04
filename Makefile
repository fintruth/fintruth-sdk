pkg ?= server
env ?= stage

NAME = nidus/${pkg}
PACKAGE = ./packages/${pkg}
VERSION = $(shell ./version.sh ${pkg})

# import package config
conf ?= $(PACKAGE)/.env
include $(conf)
export $(shell sed 's/=.*//' $(conf))

# import deploy config
# You can change the default deploy config with `make conf="deploy-other.env" release`
dpl ?= deploy.env
include $(dpl)
export $(shell sed 's/=.*//' $(dpl))

# Output help
.PHONY: help

help: ## This help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# Yarn tasks
yarn-build: ## Build all packages
	yarn lerna run build --scope=@fintruth-sdk/${pkg}

yarn-build-release: ## Build all packages for release
	ENV=$(env) yarn lerna run build:release --scope=@fintruth-sdk/${pkg}

# Docker tasks
build: ## Build image
	docker-compose build ${pkg}

dev: # Run dependency containers in background for local dev
	docker-compose -f docker-compose.yml up -d

up: ## Run all containers using a dev build
	yarn build
	docker-compose up --build

rm: ## Stop and remove a running container
	docker rm $(NAME)

release: yarn-build-release build publish ## Make a release by building and publishing the `{version}` and `latest` tagged containers to ECR

stage: yarn-build-release build publish-uat ## Make a release by building and publishing the `{version}` and `latest` tagged containers to ECR

# Docker publish
publish: repo-login publish-latest publish-version ## Publish the `{version}` ans `latest` tagged containers to ECR

publish-latest: tag-latest ## Publish the `latest` tagged container to ECR
	@echo 'publish latest to $(DOCKER_REPO)'
	docker push $(DOCKER_REPO)/$(NAME):latest

publish-uat: repo-login tag-uat ## Publish the `latest_uat` tagged container to ECR
	@echo 'publish latest to $(DOCKER_REPO)'
	docker push $(DOCKER_REPO)/$(NAME):latest_uat

publish-version: tag-version ## Publish the `{version}` tagged container to ECR
	@echo 'publish $(VERSION) to $(DOCKER_REPO)'
	docker push $(DOCKER_REPO)/$(NAME):$(VERSION)

# Docker tagging
tag: tag-latest tag-version ## Generate container tags for the `{version}` ans `latest` tags

tag-latest: ## Generate container `latest` tag
	@echo 'create tag latest'
	docker tag $(NAME) $(DOCKER_REPO)/$(NAME):latest

tag-uat: ## Generate container `latest_uat` tag
	@echo 'create tag latest_uat'
	docker tag $(NAME) $(DOCKER_REPO)/$(NAME):latest_uat

tag-version: ## Generate container `{version}` tag
	@echo 'create tag $(VERSION)'
	docker tag $(NAME) $(DOCKER_REPO)/$(NAME):$(VERSION)

CMD_REPOLOGIN := "eval $$\( aws ecr"
ifdef AWS_CLI_PROFILE
CMD_REPOLOGIN += " --profile $(AWS_CLI_PROFILE)"
endif
ifdef AWS_CLI_REGION
CMD_REPOLOGIN += " --region $(AWS_CLI_REGION)"
endif
CMD_REPOLOGIN += " get-login --no-include-email \)"

repo-login: ## Auto login to AWS-ECR using aws-cli
	@eval $(CMD_REPOLOGIN)

version: ## Output the current version
	@echo $(VERSION)

