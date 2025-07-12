const Home = () => {
    return (
        <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Swapsy 👋</h1>
        <p className="text-gray-600 mb-6">Browse users and explore the skills they offer.</p>

        {/* Placeholder Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((id) => (
            <div key={id} className="p-4 border rounded shadow hover:shadow-md transition">
                <h2 className="text-lg font-semibold">User {id}</h2>
                <p className="text-sm text-gray-500">Skill: Web Development</p>
            </div>
            ))}
        </div>
        </div>
    );
};

export default Home;
