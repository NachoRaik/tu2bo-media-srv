.PHONY: install
install:
	cd src; npm install;

.PHONY: run
run:
	cd src; npm start;

.PHONY: test
test:
	cd src; npm test;

.PHONY: ping
ping:
	curl -vvv "localhost:5005/ping"

.PHONY: help
help:
	@echo 'Usage: make <target>'
	@echo ''
	@echo 'Available targets are:'
	@echo ''
	@grep -E '^\.PHONY: *' $(MAKEFILE_LIST) | cut -d' ' -f2- | sort