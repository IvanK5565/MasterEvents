PROJECT_NAME=react_express_project

build:
	docker-compose -p $(PROJECT_NAME) build

up:
	docker-compose -p $(PROJECT_NAME) up -d

down:
	docker-compose -p $(PROJECT_NAME) down

logs:
	docker-compose -p $(PROJECT_NAME) logs -f

restart: down up

prune:
	docker system prune -f

stop:
	docker-compose -p $(PROJECT_NAME) stop
