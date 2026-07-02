import { useEffect, useState } from 'react';
import type { Todo } from '../dto/todo.dto';


function TodoPage() {
    const [forecast, setForecast] = useState<Todo[]>([]);
    const [forecastInput, setForecastInput] = useState<Todo>({ id: 0, title: "", isCompleted: false });
    const [forecastEdit, setForecastEdit] = useState<Todo>({ id: 0, title: "", isCompleted: false });


    useEffect(() => {
        fetch("http://localhost:5112/api/todos",
            { method: "GET" }
        )
            .then(response => response.json())
            .then(data => setForecast(data))
            .catch(error => console.error("Ошибка при загрузке данных:", error));
    }, []);

    const CreateTodo = () => {
        fetch("http://localhost:5112/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: forecastInput.title || "Новая задача", isCompleted: forecastInput.isCompleted || false })
        })
            .then(response => {
                if (!response.ok) throw new Error("Ошибка сервера!");
                return response.json();
            })
            .then(data => {
                setForecast([...forecast, data]);
                setForecastInput({ id: 0, title: "", isCompleted: false });
            })
            .catch(error => console.error("Ошибка при загрузке данных:", error));
    };

    const UpdateTodo = (id: number) => {
        fetch(`http://localhost:5112/api/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: forecastEdit.title || "Новая задача", isCompleted: forecastEdit.isCompleted || false })
        })
            .then(response => {
                if (!response.ok) throw new Error("Ошибка сервера!");
                return response.json();
            })
            .then(data => {
                setForecast(forecast.map(todo => todo.id === id ? data : todo));
                setForecastEdit({ id: 0, title: "", isCompleted: false });
            })
            .catch(error => console.error("Ошибка при загрузке данных:", error));
        closeEditModal();
    };


    const deleteTodo = (id: number) => {
        fetch(`http://localhost:5112/api/todos/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    setForecast(forecast.filter(todo => todo.id !== id));
                } else {
                    console.error("Ошибка при удалении задачи");
                }
            })
            .catch(error => console.error("Ошибка при загрузке данных:", error));
    };

    const openEditModal = (id: number) => {
        const todoToEdit = forecast.find(todo => todo.id === id);
        if (todoToEdit) {
            setForecastEdit(todoToEdit);
            document.querySelector(".modal")?.classList.remove("hidden");
        }
    };

    const closeEditModal = () => {
        setForecastEdit({ id: 0, title: "", isCompleted: false });
        document.querySelector(".modal")?.classList.add("hidden");
    }

    return (
        <div>
            <h1>Вывод с сервера TodoPage</h1>
            <div>
                <h1>Создание задачи</h1>
                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"}
                    onClick={CreateTodo}>Создать задачу в БД</button>

                <input type="text" placeholder="Введите название задачи" className="border p-2 mt-4 w-full" value={forecastInput.title || ""}
                    onChange={(e) => setForecastInput({ ...forecastInput, title: e.target.value })} />

                <input type="checkbox" className="ml-2" checked={forecastInput.isCompleted || false}
                    onChange={(e) => setForecastInput({ ...forecastInput, isCompleted: e.target.checked })} />
                <label className="ml-1">Завершено</label>
            </div>

            <pre>{forecast?.map((todo) => (
                <div key={todo.id}>
                    <p>Название: {todo.title}</p>
                    <p>Завершено: {todo.isCompleted ? "Да" : "Нет"}</p>
                    <div>
                        <button
                            onClick={() => openEditModal(todo.id)}
                            className={"bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out"}>
                            Изменить
                        </button>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className={"bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out ml-2"}>
                            Удалить
                        </button>
                    </div>
                </div>
            ))}</pre>

            <div className="modal hidden fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blur-sm ">
                <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                    <input type="text" placeholder="Введите название задачи" className="border p-2 mt-4 w-full" value={forecastEdit.title || ""}
                        onChange={(e) => setForecastEdit({ ...forecastEdit, title: e.target.value })} />

                    <input type="checkbox" className="ml-2" checked={forecastEdit.isCompleted || false}
                        onChange={(e) => setForecastEdit({ ...forecastEdit, isCompleted: e.target.checked })} />
                    <label className="ml-1">Завершено</label>

                    <div className="flex gap-2 center mt-4">
                        <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-2"}
                            onClick={() => UpdateTodo(forecastEdit.id)}>Изменить</button>
                        <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-2"}
                            onClick={closeEditModal}>Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoPage;