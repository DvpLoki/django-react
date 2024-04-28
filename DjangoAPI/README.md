# Django REST API

## simple blog api

- ### JWT based user authentication
- ### CRUD operations on posts

#### endpoints

- `/register` --post data-- name,email,password
- `/login` --post data-- email,password
- `/login/refresh` --post data-- refresh_token
- `/posts` --get
- `/posts?limit=10&offset=10` --get ( if more than 10 posts exist)
- `/posts` --post data-- title,content --Authentication token
- `/post/id` --get
- `/post/id` --put data-- title,content --Authentication token
- `/post/id` --delete --Authentication token
- `/users` --get
- `/users/id` --get
- `/me` --get ( gets current user )
