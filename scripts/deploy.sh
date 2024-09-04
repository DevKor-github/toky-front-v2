#!/bin/bash

IMAGE_FILE_PATH="/home/ec2-user/app/image.txt"
REGISTRY_FILE_PATH="/home/ec2-user/app/registry.txt"
IMAGE_NAME=$(cat "$IMAGE_FILE_PATH") # image.txt에 저장한 도커 이미지 정보
CONTAINER_NAME="toky-container" # 원하는 컨테이너 이름으로 설정
ECR_REGISTRY_NAME=$(cat "$REGISTRY_FILE_PATH") # registry.txt에 저장한 ECR 레지스트리 정보
# 현재 실행 중인 컨테이너 ID 조회
CURRENT_PID=$(docker container ls -q --filter "name=$CONTAINER_NAME")

# 현재 실행 중인 컨테이너가 있으면 중지하고 제거
if [ -z "$CURRENT_PID" ]; then
  echo "> 현재 구동중인 Docker Container가 없습니다"
else
  echo "> docker stop $CURRENT_PID"
  sudo docker stop $CURRENT_PID

  echo "> docker rm $CURRENT_PID"
  sudo docker rm $CURRENT_PID
  sleep 4
fi

echo "> login to ECR"
echo "> ecr registry name: $ECR_REGISTRY_NAME"
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $ECR_REGISTRY_NAME

echo "> docker pull $IMAGE_NAME"
docker pull $IMAGE_NAME
if [ $? -ne 0 ]; then
  echo "Docker 이미지 풀 실패"
  exit 1
fi

echo "> docker run -dp 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME"
docker run -dp 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
if [ $? -ne 0 ]; then
  echo "Docker 컨테이너 실행 실패"
  exit 1
fi

echo "> 새 Docker 컨테이너가 성공적으로 실행되었습니다: $CONTAINER_NAME"
