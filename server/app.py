from datetime import date

from flask import Flask, render_template, jsonify
from flask_cors import CORS
from flask_restful import Resource, Api, reqparse

from server.ai.ai import categorize_task, predict_priority
from server.db_connect import DBConnect

# connection to database
app = Flask(__name__)
# allow check api work on localhost
CORS(app)

# Connect to the database
db_connection = DBConnect()


def get_all_tasks():
    tasks_list = []
    for task in db_connection.get_all_tasks():
        task_date = task[2]

        task_elem = {
            "id": task[0],
            "content": task[1],
            "date": {
                "year": task_date.year,
                "month": task_date.month,
                "day": task_date.day
            },
            "group": task[3],
            "status": task[4],
            "priority": task[5]
        }
        tasks_list.append(task_elem)
    return tasks_list

class Task():
    def __init__(self,
                 id = None,
                 content = None,
                 date = None,
                 group = None,
                 status = None,
                 priority = None):
        self.id = id
        self.content = content
        self.date = date
        self.group = group
        self.status = status
        self.priority = priority

    def create_new_task(self):
        db_connection.create_new_task(self.content, self.date, self.group, self.status, self.priority)

    def modify_content(self, content):
        db_connection.update_task_content(self.id, content)

    def switch_status(self, new_status):
        db_connection.update_task_status(self.id, new_status)

    def switch_group(self, new_group):
        db_connection.update_task_group(self.id, new_group)


# api configuration
api = Api(app)

# tasks arguments
tasks_args = reqparse.RequestParser()
tasks_args.add_argument("content", type=str, required=True, help="Content is required")
tasks_args.add_argument("date", type=str, required=True)


class TasksList(Resource):
    @staticmethod
    def get():
        tasks = get_all_tasks()
        return tasks

    def post(self):
        # Parsing values from POST request
        args = tasks_args.parse_args()

        try:
            # Automatic group selection for task using AI
            task_group = categorize_task(args["content"])

            # Automatic selection of a priority status based on task
            task_priority = predict_priority(args["content"])

            # Creating and adding the task to the database
            task = Task(
                content=args['content'],
                date=date.today(),
                group=task_group,
                status="not started",
                priority=task_priority
            )
            task.create_new_task()

            # Returning a success message
            return jsonify({"message": "Task added successfully"}), 201

        except ValueError as ve:
            return {"error": f"Invalid date format: {str(ve)}"}, 400
        except Exception as e:
            return {"error": str(e)}, 500


class ModifyTasksList(Resource):
    # update request
    def put(self, task_id):
        # Parsing values from POST request
        args = tasks_args.parse_args()

        # Updating task content
        # Check if 'content' or other fields are present in the request
        if 'content' in args:
            DBConnect.update_task_content(task_id, args['content'])

        # Updating task status
        if 'status' in args:
            DBConnect.update_task_content(task_id, args['status'])

        # Return all tasks
        tasks = get_all_tasks()
        return tasks

    # managing delete request
    def delete(self, task_id):
        DBConnect.delete_task(task_id)
        # Return an empty response with a 204 status code
        return '', 204

#setting up API resource
api.add_resource(TasksList, '/api/tasks/')
api.add_resource(ModifyTasksList, '/api/tasks/<int:task_id>')

# main page
@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)
