#!/bin/sh
set -e

if [[ "$1" = 'node'  ]]; then
  dockerize -wait tcp://database:5432 -timeout 5m exec "$@"
fi

exec "$@"
