To spin up MYSQL server as a container

```docker run -p 3306:3306 --name nodejs-mysql -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_DATABASE=user_db -d mysql:5.7```

To open it with an interactive shell

```docker exec -it <container-id> bash```