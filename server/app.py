from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from datetime import datetime
from flask_restful import Resource, Api, reqparse, fields, marshal_with

from server.ai.ai import categorize_task, predict_priority
from server.db_connect import DBConnect

# connection to database
app = Flask(__name__)
# allow check api work on localhost
CORS(app)

# Connect to the database
# TODO: configuration file for project
db_connection = DBConnect()


def get_all_tasks():
    return db_connection.get_all_tasks()


class Task():
    def __init__(self, content, date, group, status, priority):
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

#api fields
taskFields = {
    'id':fields.Integer,
    'content':fields.String,
    'date':fields.DateTime
}

class TasksList(Resource):
    @marshal_with(taskFields)
    def get(self):
        tasks = get_all_tasks()
        return tasks

    # FIXME: rewrite to work
    @marshal_with(taskFields)
    def post(self):
        # Parsing values from POST request
        args = tasks_args.parse_args()

        try:
            # Extracting and parsing the date
            date_string = args["date"]  # Get the date from the parsed args
            parsed_date = datetime.strptime(date_string, '%Y-%m-%d')  # Convert string to datetime

            # Automatic group selection for task using AI
            task_group = categorize_task(args["content"])

            # Automatic selection of a priority status based on task
            task_priority = predict_priority(args["content"])

            # Creating and adding the task to the database
            task = Task(
                content=args['content'],
                date=args['date'],
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

class TasksListModify(Resource):
    # update request
    # FIXME: rewrite to work
    @marshal_with(taskFields)
    def put(self, task_id):
        # Updating task content
        # Check if 'content' or other fields are present in the request
        if 'content' in request.json:
            task.content = request.json['content']

        # Updating task status
        if 'status' in request.json:
            task.status = request.json['status']

        # Commit changes to the database
        db.session.commit()
        # Return all tasks
        tasks = TaskModel.query.all()
        return tasks

    # FIXME: rewrite to work
    # managing delete request
    @marshal_with(taskFields)
    def delete(self, task_id):
        # Fetch the task by its ID or return a 404
        task = TaskModel.query.get_or_404(task_id)
        # Delete the task
        db.session.delete(task)
        db.session.commit()
        # Return an empty response with a 204 status code
        return '', 204

#setting up API resource
api.add_resource(TasksList, '/api/tasks/')
api.add_resource(TasksListModify, '/api/tasks/<int:task_id>')

# main page
@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)

# !TODO: users