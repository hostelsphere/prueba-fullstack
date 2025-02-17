import { useState } from 'react';
import Form from './Form';
import Info from './Info';

function Card () {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFormSubmit = () => {
        setIsSubmitted(true);
    };
  return (
    <div className="card flex gap-5 bg-v1-tertiary-100 shadow-lg rounded-3xl m-auto container p-10 max-w-7xl">
            <Info />
            <Form onSubmit={handleFormSubmit} />
    </div>
  )
}

export default Card;