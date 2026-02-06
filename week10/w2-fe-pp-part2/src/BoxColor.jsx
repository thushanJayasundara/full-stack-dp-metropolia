function BoxColor({ r, g, b }) {
    const toHex = (value) => value.toString(16).padStart(2, "0");

    const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    const boxColor = {
        backgroundColor: `rgb(${r}, ${g}, ${b})`,
        color: "white",
        border: "2px solid black",
        width: "600px",
        height: "120px",
        margin: "16px auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        fontWeight: "bold",
    };

    return (
        <div style={boxColor}>
            <div>{`rgb(${r},${g},${b})`}</div>
            <div>{hexColor}</div>
        </div>
    );
}

export default BoxColor;