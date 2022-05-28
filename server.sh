#!/bin/zsh
echo $SHELL
set -e

export AWS_PROFILE='aws_profile'
export AWS_REGION='region'
export REGION='region'
export NODE_ENV='development'
export STAGE='stage'

echo 'Starting service...'
npx serverless offline --stage $STAGE --region $AWS_REGION --host 0.0.0.0
