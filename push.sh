# Authenticate with AWS credentials
$(aws ecr get-login --no-include-email --region us-west-2)

docker tag fintruth/server:latest 903633799253.dkr.ecr.us-west-2.amazonaws.com/fintruth/server
docker push 903633799253.dkr.ecr.us-west-2.amazonaws.com/fintruth/server:latest

docker tag fintruth/client:latest 903633799253.dkr.ecr.us-west-2.amazonaws.com/fintruth/client
docker push 903633799253.dkr.ecr.us-west-2.amazonaws.com/fintruth/client:latest
