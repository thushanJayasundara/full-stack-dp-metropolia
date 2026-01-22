import "./assets/css/CreditCard.css"
import visaImg from "./assets/images/visa.png";
import masterImg from "./assets/images/master.png";

function CreditCard(props) {
    const {
        type,
        number,
        expirationMonth,
        expirationYear,
        bank,
        owner,
        bgColor,
        color,
    } = props;

    const maskedNumber = "•••• •••• •••• " + number.slice(-4);


    const month =
        expirationMonth < 10
            ? "0" + expirationMonth
            : expirationMonth;

    const  cardTypeImg = type.toLocaleLowerCase() === "visa" ? visaImg : masterImg;;

    return (
        <div className="credit-card"
            style={{
                backgroundColor: bgColor,
                color: color,
            }}
        >
            <div className="credit-card-type">  <img src={cardTypeImg} alt={type}/> </div>
            <div className="credit-card-number"> {maskedNumber} </div>
            <div className="credit-card-info">
                <span> Expires {month}/{expirationYear}</span>
                <span>{bank}</span>
            </div>
            <div className="credit-card-owner"> {owner} </div>

        </div>
    );
}

export default CreditCard;