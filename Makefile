.PHONY: image

REPOSITORY ?= iannar
TAG = $(shell git rev-parse HEAD)

echo:
	echo $$REPOSITORY

image:
	docker build -t $(REPOSITORY):$(TAG) .
	docker tag $(REPOSITORY):$(TAG) $(REPOSITORY):latest

push:
	echo $$DOCKER_PASSWORD | docker login -u $$DOCKER_USERNAME --password-stdin $$DOCKER_REGISTRY
	docker push $(REPOSITORY):$(TAG)
	docker push $(REPOSITORY):latest
