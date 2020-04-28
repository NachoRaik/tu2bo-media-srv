build:
	docker build -t tu2bo-app-server .

run:
	docker run -it -p 3000:3000 tu2bo-app-server 

plain-build:
	cd src; npm install;

plain-run:
	cd src; npm start;

plain-test:
	cd src; npm test;

ping:
	curl -vvv "localhost:3000/ping"