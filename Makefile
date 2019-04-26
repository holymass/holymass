.PHONY: image

REPOSITORY ?= iannar
TAG ?= latest

image:
	docker build -t $(REPOSITORY):$(TAG) .

push:
	docker push $(REPOSITORY):$(TAG)
