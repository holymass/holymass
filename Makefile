.PHONY: image

REPOSITORY ?= iannar
TAG = $(shell git describe --tags | tr -d 'v')

image:
	docker build -t $(REPOSITORY):$(TAG) .
	docker tag $(REPOSITORY):$(TAG) $(REPOSITORY):latest

push:
	docker push $(REPOSITORY):$(TAG)
	docker push $(REPOSITORY):latest
