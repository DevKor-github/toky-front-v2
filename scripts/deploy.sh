#!/bin/bash
IMAGE_FILE_PATH="/home/ec2-user/app/image.txt"
IMAGE_NAME=$(cat "$IMAGE_FILE_PATH") #image.txt에 저장한 도커이미지 정보

CURRENT_PID=$(docker container ls -q)

if [-z $CURRENT_PID]
then
  echo "> 현재 구동중인 Docker Container가 없습니다"
else
  echo "> docker stop $CURRENT_PID"
  sudo docker stop $CURRENT_PID
  sleep 4
fi

echo "> login to ECR"
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin [ECR_REGISTRY__NAME]

echo "> docker pull $IMAGE_NAME"
docker pull $IMAGE_NAME

echo "> docker run $IMAGE_NAME"
docker run -dp 3000:3000 $IMAGE_NAME