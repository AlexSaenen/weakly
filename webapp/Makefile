REPOSITORY=alexandersaenen

.PHONY: build

all: install

install:
	yarn

uninstall:
	rm -f yarn.lock
	rm -f package-lock.json
	rm -rf node_modules

reinstall: uninstall install

dev:
	yarn start

build:
	yarn
	yarn build
	docker build --rm -t $(REPOSITORY)/weakly-webapp .

push:
	docker push $(REPOSITORY)/weakly-webapp:latest
