.PHONY: up down build logs shell-frontend shell-backend test-backend check-docker

check-docker:
	@if ! docker info > /dev/null 2>&1; then \
		echo "Docker is not running. Please start Docker and try again."; \
		exit 1; \
	fi

up: check-docker
	docker compose up -d

down: check-docker
	docker compose down

build: check-docker
	docker compose build

logs: check-docker
	docker compose logs -f

shell-frontend: check-docker
	docker compose exec frontend /bin/sh

shell-backend: check-docker
	docker compose exec backend /bin/sh

test-backend: check-docker
	docker compose exec backend poetry run pytest

install-dependencies:
	cd frontend && pnpm install
	cd backend && poetry install || (echo "Poetry install failed. Please check your pyproject.toml file." && exit 1)

setup-env:
	@if [ ! -f backend/.env ]; then \
		cp backend/.env.example backend/.env; \
		echo "Please update backend/.env with your actual API key and database URL"; \
	else \
		echo "backend/.env already exists. Skipping."; \
	fi

init: check-docker setup-env install-dependencies build up