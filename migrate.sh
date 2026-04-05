#!/bin/bash
export PRISMA_CLI_QUERY_ENGINE_TYPE=library
npx prisma migrate dev --name init
