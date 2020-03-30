# FancyTodo-server

## POST TODOS

---------------------------------------------------------------------------------

Add a json data containing a single to-do task.

- URL:
/todos

- Method:
POST

- URL Params:
NONE

- Data Params:
NONE

- Success Response:

Code: 200
Content: 
{
    "title: "Learn REST API",
    "description": "Learn how to create RESTful API with Express and Sequelize",
    "status":
    "due_date": "2020-01-29"
}


- Error Response

    - Code: 404 NOT FOUND
      Content: { error : "Task doesn't exist" }
    OR
    - Code: Code: 401 UNAUTHORIZED
      Content: { error : "You are unauthorized to make this request." }