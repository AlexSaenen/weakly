install:
	yarn \
		&& $(call runPostgres,local)
	# if we fail to execute the initDB script due to connection error
	# then increase the sleep value in the runPostgres function below
	NODE_ENV=dev yarn initDB

uninstall:
	rm -rf yarn.lock
	rm -rf package-lock.json
	rm -rf node_modules

reinstall: clean-containers uninstall install

dev: start-containers
	yarn start:dev

test:
	$(call cleanContainer,test,postgres)
	$(call runPostgres,test)
	yarn test

start-containers:
	$(call startContainer,local,postgres)

clean-containers:
	$(call cleanContainer,local,postgres)

run-test-postgres:
	docker pull postgres
	docker run --name test-weakly-postgres \
		-p 5432:5432 \
		-e POSTGRES_PASSWORD=testing11! \
		-e POSTGRES_USER=WeaklyTester \
		-e POSTGRES_DB=weakly-test \
		-d postgres

run-local-postgres:
	docker pull postgres
	docker run --name local-weakly-postgres \
		-p 5432:5432 \
		-e POSTGRES_PASSWORD=weakly11! \
		-e POSTGRES_USER=Weakly \
		-e POSTGRES_DB=weakly \
		-d postgres

define cleanContainer
	-docker stop $(1)-weakly-$(2)
	-docker rm $(1)-weakly-$(2)
endef

define startContainer
	docker start $(1)-weakly-$(2)
endef

define runPostgres
	make run-$(1)-postgres && sleep 5
endef
