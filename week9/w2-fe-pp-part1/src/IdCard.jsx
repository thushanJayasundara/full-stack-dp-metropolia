function IdCard(props) {
    return (
        <div className="id-card">
            <img
                src={props.picture}
                alt="profile"
                className="id-card-image"
            />

            <div className="id-card-info">
                <p>
                    <strong>First name:</strong> {props.firstName}
                </p>
                <p>
                    <strong>Last name:</strong> {props.lastName}
                </p>
                <p>
                    <strong>Gender:</strong> {props.gender}
                </p>
                <p>
                    <strong>Height:</strong>{" "}
                    {(props.height / 100).toFixed(2)}m
                </p>
                <p>
                    <strong>Birth:</strong>{" "}
                    {props.birth.toDateString()}
                </p>
            </div>
        </div>
    );
}

export default IdCard;