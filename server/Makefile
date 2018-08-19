REPOSITORY=alexandersaenen

install:
	yarn \
		&& $(call runPostgres,local) \
		&& yarn flow:install
	# if we fail to execute the initDB script due to connection error
	# then increase the sleep value in the runPostgres function below
	yarn initDevDB

uninstall:
	rm -f yarn.lock
	rm -f package-lock.json
	rm -rf node_modules

reinstall: clean-containers uninstall install

dev: start-containers
	yarn start:dev

test: clean-test-containers
	$(call runPostgres,test)
	yarn test; make clean-test-containers

start-containers:
	$(call startContainer,local,postgres)

stop-containers:
	$(call stopContainer,local,postgres)

clean-containers:
	$(call cleanContainer,local,postgres)

clean-test-containers:
	$(call cleanContainer,test,postgres)

run-test-postgres:
	docker pull postgres
	docker run --name test-weakly-postgres \
		-p 5463:5432 \
		-e POSTGRES_PASSWORD=testing11! \
		-e POSTGRES_USER=WeaklyTester \
		-e POSTGRES_DB=weakly-test \
		-d postgres

run-local-postgres:
	docker pull postgres:10.4
	docker run --name local-weakly-postgres \
		-p 8082:5432 \
		-e POSTGRES_PASSWORD=weakly11! \
		-e POSTGRES_USER=Weakly \
		-e POSTGRES_DB=weakly \
		-d postgres:10.4

define cleanContainer
	-docker stop $(1)-weakly-$(2)
	-docker rm $(1)-weakly-$(2)
endef

define startContainer
	docker start $(1)-weakly-$(2)
endef

define stopContainer
	docker stop $(1)-weakly-$(2)
endef

define runPostgres
	make run-$(1)-postgres && sleep 5
endef

build:
	docker build --rm -t $(REPOSITORY)/weakly-api .

push:
	docker push $(REPOSITORY)/weakly-api:latest
