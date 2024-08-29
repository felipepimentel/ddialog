.PHONY: up down build logs shell test check-docker pull clean install-dependencies setup-env init rollback notify help lint format check-types migrate make-migration deploy-prod restart remove-all

# Variables
COMPOSE_FILE := docker-compose.yml
COMPOSE_DEV_FILE := docker-compose.dev.yml
NETWORK_NAME := my_project_network

# Checks
check-docker:
	@if ! docker info > /dev/null 2>&1; then \
		echo "Docker is not running. Please start Docker and try again."; \
		exit 1; \
	fi

check-dependencies:
	@command -v pnpm >/dev/null 2>&1 || { echo >&2 "pnpm is not installed. Please install it."; exit 1; }
	@command -v poetry >/dev/null 2>&1 || { echo >&2 "poetry is not installed. Please install it."; exit 1; }

# Network Management
create-network:
	@docker network create $(NETWORK_NAME) || echo "Network already exists."

# Docker Compose Commands
define docker_compose_command
	docker compose -f $(1) $(2)
endef

up: check-docker
	$(call docker_compose_command,$(COMPOSE_FILE),up -d)

down: check-docker
	$(call docker_compose_command,$(COMPOSE_FILE),down)

build: check-docker pull
	$(call docker_compose_command,$(COMPOSE_FILE),build)
	$(MAKE) test

logs:
	$(call docker_compose_command,$(COMPOSE_FILE),logs -f)

# Development Commands
up-dev: check-docker
	$(call docker_compose_command,$(COMPOSE_DEV_FILE),up -d --build --force-recreate)

down-dev: check-docker
	$(call docker_compose_command,$(COMPOSE_DEV_FILE),down)

build-dev: check-docker pull
	$(call docker_compose_command,$(COMPOSE_DEV_FILE),build --no-cache)

# Shell Access
shell-%: check-docker
	$(call docker_compose_command,$(COMPOSE_DEV_FILE),exec $* /bin/sh)

# Testing
test: check-docker
	$(call docker_compose_command,$(COMPOSE_DEV_FILE),exec backend poetry run pytest)

test-coverage: check-docker
	$(call docker_compose_command,$(COMPOSE_DEV_FILE),exec backend poetry run pytest --cov=src)

# Service Management
restart-%: check-docker
	$(call docker_compose_command,$(COMPOSE_DEV_FILE),restart $*)

# Initialization
install-dependencies: check-dependencies
	@(cd frontend && pnpm install) & (cd backend && poetry install) & wait

setup-env:
	@if [ ! -f backend/.env ]; then \
		cp backend/.env.example backend/.env; \
		echo "Please update backend/.env with your actual API key and database URL"; \
	else \
		echo "backend/.env already exists. Skipping."; \
	fi

init: check-docker setup-env install-dependencies build up

init-dev: check-docker setup-env install-dependencies build-dev up-dev

# Build and Restart Commands
down-build-up: down build up

restart-dev: down-dev build-dev up-dev

clean:
	docker compose down -v --rmi all --remove-orphans
	docker volume prune -f
	docker system prune -f

rollback:
	@echo "Rolling back to previous stable version..."
	docker compose down
	git checkout stable
	$(MAKE) build up

# Notification
notify:
	@echo "Build completed successfully!" | notify-send "Build Notification"

# Linting and Formatting
lint:
	$(call docker_compose_command,$(COMPOSE_DEV_FILE),exec frontend pnpm run lint)
	$(call docker_compose_command,$(COMPOSE_DEV_FILE),exec backend poetry run flake8)

format:
	$(call docker_compose_command,$(COMPOSE_DEV_FILE),exec backend poetry run black .)

check-types: check-docker
	$(call docker_compose_command,$(COMPOSE_DEV_FILE),exec backend poetry run mypy src/)

# Migrations
migrate: check-docker
	$(call docker_compose_command,$(COMPOSE_DEV_FILE),exec backend poetry run alembic upgrade head)

make-migration: check-docker
	$(call docker_compose_command,$(COMPOSE_DEV_FILE),exec backend poetry run alembic revision --autogenerate -m "Migration message")

# Deployment
deploy-prod:
	@echo "Deploying to production..."
	# Add your deployment commands here

# Shortcuts
u: up
d: down
b: build
r: restart-dev

# Help
help:
	@echo "Available commands:"
	@echo "  make up                - Start services in detached mode (production)"
	@echo "  make down              - Stop services (production)"
	@echo "  make build             - Build services (production)"
	@echo "  make up-dev            - Start services in detached mode (development)"
	@echo "  make down-dev          - Stop services (development)"
	@echo "  make build-dev         - Build services (development)"
	@echo "  make logs              - Follow logs"
	@echo "  make shell-[service]   - Access shell in specified container"
	@echo "  make test              - Run backend tests"
	@echo "  make test-coverage     - Run backend tests with coverage"
	@echo "  make clean             - Clean up Docker artifacts"
	@echo "  make init              - Initialize the project environment (production)"
	@echo "  make init-dev          - Initialize the development environment"
	@echo "  make down-build-up     - Stop, build, and start services (production)"
	@echo "  make restart-dev       - Restart development environment"
	@echo "  make rollback          - Rollback to the previous stable version"
	@echo "  make notify            - Send a notification upon completion"
	@echo "  make lint              - Lint the frontend and backend code"
	@echo "  make format            - Format the backend code"
	@echo "  make check-types       - Check Python types in the backend"
	@echo "  make migrate           - Apply database migrations"
	@echo "  make make-migration    - Create a new database migration"
	@echo "  make deploy-prod       - Deploy to production"
	@echo "  make restart-[service] - Restart the specified service"
	@echo "  make install-dependencies - Install dependencies"
	@echo "  make remove-all        - Remove all project-related Docker resources"

# Remove everything
remove-all: check-docker
	@echo "Removing all project-related containers, volumes, and networks..."
	docker compose -f $(COMPOSE_FILE) down -v --remove-orphans
	docker compose -f $(COMPOSE_DEV_FILE) down -v --remove-orphans
	docker volume rm $$(docker volume ls -q | grep ddialog) 2>/dev/null || true
	docker network rm $(NETWORK_NAME) 2>/dev/null || true
	docker system prune -af --volumes
	@echo "Removing database files..."
	rm -rf backend/src/alembic/versions/*.py
	@echo "Project has been completely removed."