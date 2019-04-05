.PHONY: image

REPOSITORY=iannar
TAG=$(shell git rev-parse HEAD)

image:
	time docker build -t $(REPOSITORY):$(TAG) .
	docker tag $(REPOSITORY):$(TAG) $(REPOSITORY):latest
