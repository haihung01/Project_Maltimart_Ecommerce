
import React from 'react';
import { Container } from 'reactstrap';
import '../../styles/common-section.scss'

const CommonSection = ({ title }) => {
    return (
        <section className='common_section'>
            <Container>
                {/* <img src={xxx} alt="" /> */}

                <h1>{title}</h1>
            </Container>
        </section>
    );
};

export default CommonSection;