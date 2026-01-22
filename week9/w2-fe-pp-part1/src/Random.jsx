function Random(props) {
    return (
        <div className="random-number-card border">

            <p>
                <strong>Random value between :</strong> {props.min}
                <strong> and </strong> {props.max} <strong> => </strong>
                {" "} {Math.floor(Math.random() * (props.max - props.min + 1) + props.min)}
            </p>

        </div>
    )
}
export default Random;