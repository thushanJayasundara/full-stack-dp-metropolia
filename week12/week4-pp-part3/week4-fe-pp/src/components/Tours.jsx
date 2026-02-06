import { useState } from "react";
import Title from "./Title";
import Tour from "./Tour";
import { tours } from "../data";

const Tours = () => {
    const [toursData, setToursData] = useState(tours);

    const removeTour = (id) => {
        setToursData((prev) => prev.filter((tour) => tour.id !== id));
    };

    return (
        <section className="section" id="tours">
            <Title title="featured" subTitle="tours" />

            <div className="section-center featured-center">
                {toursData.map((tour) => (
                    <Tour key={tour.id} {...tour} removeTour={removeTour} />
                ))}
            </div>
        </section>
    );
};

export default Tours;