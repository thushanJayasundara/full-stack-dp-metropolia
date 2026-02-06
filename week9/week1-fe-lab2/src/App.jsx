function Bye() {
    return <p>Goodbye, React!</p>;
}

function Hello() {
    return <p>Hello, React!</p>;
}

function App() {
    return (
        <div>
            <Hello />
            <Bye />
        </div>
    );
}

export default App;