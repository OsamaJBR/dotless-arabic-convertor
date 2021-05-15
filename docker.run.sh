#!/bin/bash
docker build -f Dockerfile -t dotless-core .

docker service create --mode=replicated --name=dotless --replicas=3 --publish=3000:3000 --limit-memory=250MB dotless-core