run:
	node bin/gendiff.js

publish:
	npm publish --dry-run

link:
	sudo npm link

install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

.PHONY: test