#! /usr/bin/env bash

set -euo pipefail

docker -v

echo "$DOCKER_PASSWORD" | docker login --username "$DOCKER_USERNAME" --password-stdin

VERSION="$TRAVIS_TAG"

NAME='textbook/impasse'
MAJOR="$(echo $VERSION | cut -d. -f1)"
MINOR="$(echo $VERSION | cut -d. -f2)"

for TAG in "$MAJOR" "$MAJOR.$MINOR" "$VERSION"; do
  docker tag "$NAME" "$NAME:$TAG"
done

docker push "$NAME"
