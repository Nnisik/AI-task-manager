from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort

# connection to database
# TODO: transition SQLite database to PostgreSQL
app = Flask(__name__)
# allow check api work on localhost
CORS(app)
# creating a database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
# api configuration
api = Api(app)

# new Task class
# TODO: add more fields
class TaskModel(db.Model):
    __tablename__ = 'task_model'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    data_created  = db.Column(db.DateTime, default=datetime.now)

    def __repr__(self):
        return f"Task(content={self.content}, data={self.data_created})"

# tasks arguments
tasks_args = reqparse.RequestParser()
tasks_args.add_argument("content", type=str, required=True)
tasks_args.add_argument("date", type=str, required=True)

#api fields
taskFields = {
    'id':fields.Integer,
    'content':fields.String,
    'date':fields.DateTime
}

#tasks API
class Tasks(Resource):
    @marshal_with(taskFields)
    def get(self):
        tasks = TaskModel.query.all()
        return tasks

    @marshal_with(taskFields)
    def post(self):
        args = tasks_args.parse_args()
        date_value = datetime.strptime(args["date"], "%Y-%m-%d %H:%M:%S")
        # FIXME: rename everywhere to "date"
        # FIXME: date value sets as "null"
        task = TaskModel(content = args["content"], data_created=date_value)
        db.session.add(task)
        db.session.commit()
        tasks = TaskModel.query.all()
        return tasks, 201

    # TODO: update option
    # TODO: delete option

#setting up API resource
api.add_resource(Tasks, '/api/tasks/')

# main page
@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)


# !TODO: connect AI
# !TODO: users