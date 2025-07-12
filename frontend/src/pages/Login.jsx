const Login = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form>
            <input
                type="email"
                placeholder="Email"
                className="w-full mb-3 px-3 py-2 border rounded"
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full mb-4 px-3 py-2 border rounded"
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Login
            </button>
            </form>
        </div>
        </div>
    );
};

export default Login;
