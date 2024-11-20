from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# connection to database
# TODO: transition SQLite database to PostgreSQL
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

# new Task class
# TODO: add more fields
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Integer, default=0)
    data_created  = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Task %r>' % self.id

# main page
@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template("index.html")

@app.route('/api/get-tasks', methods=['GET'])
def get_tasks():
    tasks = Todo.query.order_by(Todo.data_created).all()
    tasks_set, i = {}, 0
    for task in tasks:
        task = {
            'content': task.content,
            'completed': task.completed,
            'data_created': task.data_created
        }
        tasks_set[i] = task
        i += 1

    return tasks_set

# delete tasks function; then reloads the index page
@app.route('/delete/<int:id>')
def delete(id):
    task_to_delete = Todo.query.get_or_404(id)

    try:
        db.session.delete(task_to_delete)
        db.session.commit()
        return redirect('/')

    except:
        return "There was a problem deleting your task"

# task update page
@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
    task = Todo.query.get_or_404(id)

    if request.method == 'POST':
        task.content = request.form['content']

        try:
            db.session.commit()
            return redirect('/')
        except:
            return "There was an issue updating your task"
    else:
        return render_template('update.html', task=task)

if __name__ == '__main__':
    app.run(debug=True)