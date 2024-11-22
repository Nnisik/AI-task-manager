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
    data_created  = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Task %r>' % self.id

# main page
@app.route('/')
def index():
    ## variant of page activity when were made any changes to database filling
    ## made using POST http protocol
#    if request.method == 'POST':
        # FIXME: add form validation
#        task_content = request.form['content']
 #       new_task = Todo(content = task_content)
  #      try:
   #         db.session.add(new_task)
    #        db.session.commit()
     #       return redirect('/')
      #  except:
       #     return "There was an issue adding your task"
    # else:
    #    tasks = Todo.query.order_by(Todo.data_created).all()
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

# TODO: APIs
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

# TODO: API for deleting task from database
@app.route('api/delete_task/<int:id>', method=['POST'])
def delete_task(id):
    pass

# TODO: API for updating task
@app.route('api/update_task/<int:id>', method=['POST'])
def update_task(id):
    pass


"""
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
"""

"""
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
"""

if __name__ == '__main__':
    app.run(debug=True)