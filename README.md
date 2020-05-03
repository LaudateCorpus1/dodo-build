[![build-test](https://github.com/cacoco/dodo-build/workflows/build-test/badge.svg?branch=master)](https://github.com/cacoco/dodo-build/actions/)
# Dodo Build Github Action

A GitHub Action to run [Dodo](https://github.com/twitter/dodo), the Twitter OSS project builder.

## Usage:

In your GitHub Actions workflow, create a "dodo-build" job which will run the builder.
Then specify this job in the [`jobs.<job_id>.needs`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idneeds). 

Note: it is best if this action is used with caches for maven, ivy, and the Dodo project builder state.

```diff
+++ .github/workflows/ci.yml
  name: CI
  on:
    push:
  jobs:
+   dodo-build:
+     runs-on: ubuntu-latest
+     steps:
+       - uses: actions/setup-java@v1
+         with:
+           java-version: 1.8
+       - uses: olafurpg/setup-scala@v7
+         with:
+           java-version: 1.8
+       - name: cache/maven
+         uses: actions/cache@v1
+         with:
+           path: ~/.m2/repository
+           key: ${{ runner.os }}-maven-${{ hashFiles('**/pom.xml') }}
+           restore-keys: |
+             ${{ runner.os }}-maven-
+       - name: cache/ivy2-cache
+         uses: actions/cache@v1
+         with:
+           path: ~/.ivy2/cache
+           key: ${{ runner.os }}-sbt-ivy-cache-
+       - name: cache/ivy2-local
+         uses: actions/cache@v1
+         with:
+           path: ~/.ivy2/local/com.twitter
+           key: ${{ runner.os }}-sbt-ivy-local-
+       - name: cache/dodo
+         uses: actions/cache@v1
+         with:
+           path: ~/.dodo
+           key: ${{ runner.os }}-dodo-
+       - name: dodo/run
+         uses: cacoco/dodo-build@v1
+         with:
+           project: scrooge
    test:
+     needs: dodo-build
      runs-on: ubuntu-latest
```
