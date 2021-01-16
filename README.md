# node-ts-test
💨 Node.js, Typescript and Express simple CRUD API


## Setup project

### Create PostgreSQL instance with docker

```
docker pull postgres:latest
```

```
docker run -d —name test-crud -p 5432:5432 -e 'POSTGRES_PASSWORD=openpgpwd' postgres
```

### Init database
```
npm run initdb
```

### Run via npm

```
npm start
```

Check your **Hello World** message on `localhost:8080`


## Usage

- Open any API client such as Postman
- Add `Authorization: 1` to Headers
- Set Body format to `x-www-form-urlencoded`
- Add name, surname, title and content with dummy text to Body

- Try the endpoints listed below:
    <br><br>
- <strong>USERS</strong>
    - <pre><strong>GET</strong> localhost:8080/api/users</pre>
    - <pre><strong>GET</strong> localhost:8080/api/users/USER_ID</pre>
    - <pre><strong>POST</strong> localhost:8080/api/users</pre>
    - <pre><strong>PUT</strong> localhost:8080/api/users/USER_ID</pre>
    - <pre><strong>DELETE</strong> localhost:8080/api/users/USER_ID</pre>
        <br><br>
- <strong>POSTS</strong>
    - <pre><strong>GET</strong> localhost:8080/api/posts</pre>
    - <pre><strong>GET</strong> localhost:8080/api/posts/POST_ID</pre>
    - <pre><strong>POST</strong> localhost:8080/api/posts</pre>
    - <pre><strong>PUT</strong> localhost:8080/api/posts/POST_ID</pre>
    - <pre><strong>DELETE</strong> localhost:8080/api/posts/POST_ID</pre>
        <br><br>
- <strong>CHECK POST LIKES</strong>
    - <pre><strong>GET</strong> localhost:8080/api/posts/POST_ID/likes</pre>
        <br>
- <strong>LIKE/UNLIKE POST</strong>
    - <pre><strong>POST</strong> localhost:8080/api/like/POST_ID</pre>

        <br>
### Testing

```
npm run test
```