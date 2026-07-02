import { Link } from 'react-router-dom';

function App() {
  const linksStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out";
  const links = [
    { href: "/todo", label: "Список задач" },
  ];

  return (
    <div className={`flex flex-col items-center justify-center gap-2`}>
      <h1>Добро пожаловать!</h1>
      {links.map(link => (
        <Link key={link.href} className={linksStyle} to={link.href}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default App;