DOCKER_COMPOSE = docker-compose

format:
	npm run format

logs:
	@$(DOCKER_COMPOSE) logs -f

build-dev:
	@$(DOCKER_COMPOSE) --profile development build

down-dev:
	@$(DOCKER_COMPOSE) --profile development down

up-dev:
	@$(DOCKER_COMPOSE) --profile development up

build-prod:
	@$(DOCKER_COMPOSE) --profile production build

down-prod:
	@$(DOCKER_COMPOSE) --profile production down

up-prod:
	@$(DOCKER_COMPOSE) --profile production up

restart-dev:
	make down-dev && make build-dev && make up-dev

restart-prod:
	make down-prod && make build-prod && make up-prod