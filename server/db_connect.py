import psycopg2

class DBConnect:
    def __init__(self):
        self.conn = None
        self.cur = None

        self.__set_connection()

    def __set_connection(self):
        try:
            self.conn = psycopg2.connect(
                host="localhost",
                database="task_list",
                user="postgres",
                password="Shipovnik",
                port=5432)
            self.cur = self.conn.cursor()
        except Exception as error:
            print(error)
            self.__close()

    def get_all_tasks(self):
        self.cur.execute("SELECT * FROM task")
        return self.cur.fetchall()

    def create_new_task(self, content, date, group, status, priority):
        self.cur.execute(
            "INSERT INTO task (task_content, date, task_group, task_status, priorty) VALUES (%s, %s, %s, %s, %s)",
            (content, date, group, status, priority))
        self.conn.commit()

    def update_task_content(self, id, content):
        self.cur.execute(
            "UPDATE task SET task_content = %s WHERE id = %s",
            (content, id)
        )
        self.conn.commit()

    def update_task_group(self, task_id, group):
        self.cur.execute(
            "UPDATE task SET task_group = %s WHERE id = %s",
            (group, task_id))
        self.conn.commit()

    def update_task_status(self, task_id, status):
        self.cur.execute(
            "UPDATE task SET task_status = %s WHERE id = %s",
            (status, task_id))
        self.conn.commit()

    def delete_task(self, task_id):
        self.cur.execute(
            "DELETE FROM task WHERE id = %s",
            (task_id,))
        self.conn.commit()

    def __close(self):
        self.cur.close()
        self.conn.close()