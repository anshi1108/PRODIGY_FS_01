import './Main.css'

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className='main_container'>
			<nav className='navbar'>
				<h1>Loggers</h1>
				<button className='white_btn'onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className='textpart'>
				<h1>Welcome to the main page</h1>
			</div>
		</div>
	);
};

export default Main;