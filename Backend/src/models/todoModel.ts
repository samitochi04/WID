import db from '../config/db';

export const getTodos = async () => {
    return db.any('SELECT * FROM todos');
};

export const createTodo = async (task: string) => {
    return db.one('INSERT INTO todos(task) VALUES($1) RETURNING *', [task]);
};

export const updateTodo = async (id: number, task: string, completed: boolean) => {
    return db.one('UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *', [task, completed, id]);
};

export const deleteTodo = async (id: number) => {
    return db.none('DELETE FROM todos WHERE id = $1', [id]);
};
