import { useState } from "react";
import Title from "./Title";
import Service from "./Service";
import { services } from "../data";

const Services = () => {

    const [servicesData, setServicesData] = useState(services);


    return (
        <section className="section services" id="services">
            <Title title="our" subTitle="services" />

            <div className="section-center services-center">

                {servicesData.map((service) => {
                    return <Service {...service} key={service.id} />;
                })}
            </div>
        </section>
    );
};

export default Services;