import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div>
            <h1>Вывод с сервера</h1>
            <pre>Страница не найдена</pre>
            <Link to="/">На главную</Link>
        </div>
    );
}

export default NotFoundPage;