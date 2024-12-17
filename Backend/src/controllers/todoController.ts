import { Request, Response } from 'express';
import * as TodoModel from '../models/todoModel';

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await TodoModel.getTodos();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    const { task } = req.body;
    try {
        const newTodo = await TodoModel.createTodo(task);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo' });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { task, completed } = req.body;
    try {
        const updatedTodo = await TodoModel.updateTodo(+id, task, completed);
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo' });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await TodoModel.deleteTodo(+id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo' });
    }
};
