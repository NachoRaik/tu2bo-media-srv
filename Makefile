.PHONY: build
build:
	docker build -t tu2bo-app-server .

.PHONY: run
run:
	docker run -it -p 3000:3000 tu2bo-app-server 

.PHONY: plain-install
plain-install:
	cd src; npm install;

.PHONY: plain-run
plain-run:
	cd src; npm start;

.PHONY: test
test:
	cd src; npm test;

.PHONY: ping
ping:
	curl -vvv "localhost:3000/ping"


.PHONY: help
help:
	@echo 'Usage: make <target>'
	@echo ''
	@echo 'Available targets are:'
	@echo ''
	@grep -E '^\.PHONY: *' $(MAKEFILE_LIST) | cut -d' ' -f2- | sort