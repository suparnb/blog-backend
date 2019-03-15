For the video game reviewer app, I have used Redis as the in memory datastore to save the data, NodeJs as an API that interacts with Redis to save and fetch the data and React as the frontend.

Redis can be directly refered from Docker hub.

For Node and React, I have created microservices for the backend and frontend and committed those in github. The repository urls are as follows :

React frontend  :
------------------
https://github.com/suparnb/blog-frontend

NodeJs backend :
------------------
https://github.com/suparnb/blog-backend

Note : I choose to run a Jenkins server running on the cloud with which I have created a webhook integration with github rather than directly creating a hook with dockerhub. Any commit to githubs remote repository will trigger the build and create a new image and will store it in my docker hub repository. Here is the url : https://hub.docker.com/u/suparnb


Commands to Run (Assuming you are using CentOs 7) :
#######################################################
yum install docker -y

systemctl start docker && systemctl enable docker

docker run -d -p 6379:6379 --name blog-db-container redis

docker run -d -p 3001:3001 --name blog-backend-container suparnb/blog-backend:7

docker run -d -p 3000:3000 --name blog-frontend-container suparnb/blog-frontend:8
