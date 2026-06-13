import Link from 'next/link';

function NotFoundPage() {
    return (
        <div>
            <h1>Вывод с сервера</h1>
            <pre>Страница не найдена</pre>
            <Link href="/">На главную</Link>
        </div>
    );
}

export default NotFoundPage;