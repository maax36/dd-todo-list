'use client';

import { useState, useRef } from 'react';
import styles from './styles.module.css';

type Task = {
  id: string;
  text: string;
};

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'vite-проект для React+TS' },
    { id: '2', text: 'часть 1 Auth.js+Prisma+app-router' },
    { id: '3', text: 'Урок создание API использую Prisma' },
    { id: '4', text: 'Урок cоздание API' },
    { id: '5', text: 'Тема: Урок создание API c разделением прав' },
    { id: '6', text: 'Урок remult' },
  ]);
  const [input, setInput] = useState('');
  const draggedItem = useRef<number | null>(null);

  const handleAddTask = () => {
    setTasks([...tasks, { id: Date.now().toString(), text: input }]);
    setInput('');
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleDragStart = (index: number) => {
    draggedItem.current = index;
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedItem.current === null || draggedItem.current === index) return;

    const newTasks = [...tasks];
    const movedTask = newTasks.splice(draggedItem.current, 1)[0];
    newTasks.splice(index, 0, movedTask);

    setTasks(newTasks);
    draggedItem.current = null;
  };

  return (
    <div className={styles.container}>
      <h2>Не сделанные (просроченные) дз</h2>
      <p>напомните еще раз пожалуйста, если эти задания не будут сданы, все равно будет считаться что обучение за год прошел с учетом того что будет итоговая?</p>
      <div className={styles.inputContainer}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Добавить..." className={styles.input} />
        <button onClick={handleAddTask} className={styles.button}>Добавить</button>
      </div>
      <ul className={styles.list}>
        {tasks.map((task, index) => (
          <li
            key={task.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className={styles.item}
          >
            {task.text}
            <button className={styles.delete} onClick={() => handleDeleteTask(task.id)}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
}