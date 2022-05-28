install:
	yarn install --production=false

deploy:
	npx sls deploy -s ${stage}
