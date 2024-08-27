.PHONY: up down build logs shell-frontend shell-backend test-backend check-docker pull up-dev down-dev build-dev restart-dev clean install-dependencies setup-env init init-dev down-build-up down-build-up-dev rollback notify help lint-frontend lint-backend format-backend check-types migrate make-migration build-frontend build-backend deploy-prod restart-backend restart-frontend check-dependencies build-frontend run-frontend

# Variáveis
COMPOSE_FILE=docker-compose.yml
COMPOSE_DEV_FILE=docker-compose.dev.yml
NETWORK_NAME=my_project_network

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
up: check-docker
	docker compose -f $(COMPOSE_FILE) up -d

down: check-docker
	docker compose -f $(COMPOSE_FILE) down

build: check-docker pull
	docker compose -f $(COMPOSE_FILE) build
	$(MAKE) test-backend

up-dev: check-docker
	docker compose -f $(COMPOSE_DEV_FILE) up -d --build --force-recreate

down-dev: check-docker
	docker compose -f $(COMPOSE_DEV_FILE) down

build-dev: check-docker pull
	docker compose -f $(COMPOSE_DEV_FILE) build --no-cache

logs: check-docker
	docker compose logs -f

# Frontend Specific Commands
build-frontend: check-docker
	docker compose -f $(COMPOSE_DEV_FILE) build frontend

run-frontend: check-docker
	docker compose -f $(COMPOSE_DEV_FILE) up -d frontend

build-and-run-frontend: build-frontend run-frontend

shell-frontend: check-docker
	docker compose -f $(COMPOSE_DEV_FILE) exec frontend /bin/sh

# Backend Specific Commands
shell-backend: check-docker
	docker compose -f $(COMPOSE_DEV_FILE) exec backend /bin/sh

test-backend: check-docker
	docker compose -f $(COMPOSE_DEV_FILE) exec backend poetry run pytest

test-coverage: check-docker
	docker compose -f $(COMPOSE_DEV_FILE) exec backend poetry run pytest --cov=src

test-backend-dev: check-docker
	docker compose -f $(COMPOSE_DEV_FILE) run --rm backend poetry run pytest

# Initialization
install-dependencies: check-dependencies
	@(cd frontend && pnpm install) &
	@(cd backend && poetry install) &
	wait

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

down-build-up-dev: down-dev build-dev up-dev

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
lint-frontend: check-docker
	docker compose exec frontend pnpm run lint

lint-backend: check-docker
	docker compose exec backend poetry run flake8

format-backend: check-docker
	docker compose exec backend poetry run black .

check-types: check-docker
	docker compose exec backend poetry run mypy src/

# Migrations
migrate: check-docker
	docker compose exec backend poetry run alembic upgrade head

make-migration: check-docker
	docker compose exec backend poetry run alembic revision --autogenerate -m "Migration message"

# Build Artifacts
build-backend: check-docker
	docker compose exec backend poetry build

# Deployment
deploy-prod:
	@echo "Deploying to production..."
	# Add your deployment commands here
	# e.g., ssh to server, git pull, docker-compose up -d

# Shortcuts
u: up
d: down
b: build
r: restart-dev

# Help
help:
	@echo "Available commands:"
	@echo "  make up                     - Start services in detached mode"
	@echo "  make down                   - Stop services"
	@echo "  make build                  - Build services"
	@echo "  make logs                   - Follow logs"
	@echo "  make shell-frontend         - Access shell in frontend container"
	@echo "  make shell-backend          - Access shell in backend container"
	@echo "  make test-backend           - Run backend tests"
	@echo "  make test-coverage          - Run backend tests with coverage"
	@echo "  make clean                  - Clean up Docker artifacts"
	@echo "  make init                   - Initialize the project environment"
	@echo "  make init-dev               - Initialize the development environment"
	@echo "  make down-build-up          - Stop, build, and start services"
	@echo "  make rollback               - Rollback to the previous stable version"
	@echo "  make notify                 - Send a notification upon completion"
	@echo "  make lint-frontend          - Lint the frontend code"
	@echo "  make lint-backend           - Lint the backend code"
	@echo "  make format-backend         - Format the backend code"
	@echo "  make check-types            - Check Python types in the backend"
	@echo "  make migrate                - Apply database migrations"
	@echo "  make make-migration         - Create a new database migration"
	@echo "  make build-frontend         - Build the frontend artifacts"
	@echo "  make run-frontend           - Run the frontend container"
	@echo "  make build-and-run-frontend - Build and run the frontend container"
	@echo "  make build-backend          - Build the backend artifacts"
	@echo "  make deploy-prod            - Deploy to production"
	@echo "  make restart-backend        - Restart the backend service"
	@echo "  make restart-frontend       - Restart the frontend service"
	@echo "  make install-dependencies   - Install dependencies"
	

# New command to remove everything
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
