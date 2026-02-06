import {services} from '../data'
import Title from './Title'
import {useState} from 'react';

const Service = ({id, icon, title, text, detail, removeService}) => {
    return (
        <article className="services">
            <span className="service-icon">{icon}</span>
            <h4 className="service-title">{title}</h4>
            <p className="service-text">{text}</p>
            <p className="service-detail">{detail}</p>
            <button className="service-button" onClick={() => removeService(id)}></button>
        </article>
    );
};

const Services = () => {
    const [servicesData, setServicesData] = useState(services);

    const removeService = (id) => {
        const newServices = services.filter(service => service.id !== id);
        setServicesData(newServices);
    };


    return (
        <section className="section services" id="services">
            <Title title="Our" subTitle="Services"/>

            <div className="section-center services-center">
                {servicesData.map(service => {
                    return (
                        <Service
                            key={service.id}
                            {...service}
                            removeService={removeService}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default Services;