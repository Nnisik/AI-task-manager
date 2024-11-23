from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

# connection to database
# TODO: transition SQLite database to PostgreSQL
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

# new Task class
# TODO: add more fields
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Integer, default=0)
    data_created  = db.Column(db.DateTime, default=datetime.now)

    def __repr__(self):
        return '<Task %r>' % self.id

# main page
@app.route('/')
def index():
    return render_template("index.html")

# TODO: API for getting all tasks from database
@app.route('/api/get_tasks')
def get_data():
    tasks = Todo.query.order_by(Todo.data_created).all()
    tasks_set = []
    for task in tasks:
        task_set = {
            "id": task.id,
            "content": task.content,
            "completed": task.completed,
            "date": task.data_created
        }
        tasks_set.append(task_set)
    return tasks_set

# APIs
# API for creating new task and adding its data into a database
@app.route('api/create_task/', method=['POST'])
def create_task():
    content = request.json['content']
    new_task = Todo(content = content)
    try:
        db.session.add(new_task)
        db.session.commit()
        return
    except:
        return "There was an issue adding your task"

# API for deleting task from database
@app.route('api/delete_task/<int:id>', method=['DELETE'])
def delete_task(id):
    task = Todo.query.get_or_404(id)
    try:
        db.session.delete(task)
        db.session.commit()
        return
    except:
        return "There was an issue deleting your task"

# API for updating task
@app.route('api/update_task/<int:id>', method=['PUT'])
def update_task(id):
    task = Todo.query.get_or_404(id)
    try:
        task.content = request.json['content']
        task.completed = request.json['completed']
        db.session.commit()
        return
    except:
        return "There was an issue updating your task"

if __name__ == '__main__':
    app.run(debug=True)