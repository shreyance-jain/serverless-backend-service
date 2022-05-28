install:
	yarn install

deploy:
	npx sls deploy -s ${stage}
