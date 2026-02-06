function Greetings({ lang, children }) {
    let greeting;

    switch (lang) {
        case "de":
            greeting = "Hallo";
            break;
        case "fr":
            greeting = "Bonjour";
            break;
        case "es":
            greeting = "Hola";
            break;
        case "fi":
            greeting = "Hei";
            break;
        case "en":
        default:
            greeting = "Hello";
    }

    const boxStyle = {
        border: "2px solid black",
        padding: "16px",
        margin: "12px auto",
        width: "600px",
        fontSize: "22px",
        boxSizing: "border-box",
    };

    return (
        <div style={boxStyle}>
            {greeting} {children}
        </div>
    );
}

export default Greetings;