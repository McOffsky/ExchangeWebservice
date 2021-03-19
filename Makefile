# HELP
.PHONY: help

help: ## Makefile help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

dev: ## Start dev env
	test -s .env || cp .env.dist .env
	sudo -E docker-compose up

bash: ## Access node container command line
	test -s .env || cp .env.dist .env
	sudo -E docker-compose run node bash

build-prod: ## Build prod image
	sudo docker build -t exchange_webservice .

run-prod: ## Build and run prod image
	$(MAKE) build-prod
	test -s .env || cp .env.dist .env
	sudo docker run -it -p 3001:3000 exchange_webservice

tests: ## Run test on application
	test -s .env || cp .env.dist .env
	sudo -E docker-compose run node npm run test
	sudo -E docker-compose run node npm run test:e2e

test-coverage: ## Show test coverage
	test -s .env || cp .env.dist .env
	sudo -E docker-compose run node npm run test:cov