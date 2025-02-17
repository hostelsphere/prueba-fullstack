import { useState } from "react";

interface ContactFormProps {
    onSubmit: () => void;
}

const Form: React.FC<ContactFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        onSubmit();
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
    };

    const percentages = {
        PMS: 10,
        OTA: 40,
        Innovador: 50,
    };

    return (
        <div className="card-body w-1/2 items-center text-center">
            <form 
            className="flex flex-col justify-between bg-v1-tertiary-50 border-v1-neutral-100 p-6 rounded-3xl min-h-full border-2"
            onSubmit={handleSubmit}>
                {Object.keys(percentages).map((option) => (
                    <div key={option} className="flex items-center justify-between mb-4">
                        <button
                            className={`relative border-2 p-4 text-left font-bold rounded-lg focus:border-v1-primary-800 focus:bg-v1-tertiary-100 ${isSubmitted ? 'bg-v1-tertiary-100' : selectedOption === option ? 'bg-v1-tertiary-100' : ''}`}
                            type="button"
                            onClick={() => handleOptionClick(option)}
                            style={{ width: '100%' }}
                        >
                            <span>
                                {option === 'PMS' && '🏥 Un nuevo PMS para hoteles'}
                                {option === 'OTA' && '✈ Una nueva OTA solo para hostels'}
                                {option === 'Innovador' && '🚀 Algo más innovador'}
                            </span>
                            {isSubmitted && selectedOption === option && (
                                <img
                                    src="https://img.icons8.com/?size=100&id=11208&format=png&color=16504d"
                                    alt="Selected"
                                    className="inline-block ml-2 w-6 h-6"
                                />
                            )}
                            {isSubmitted && (
                                <div className="absolute inset-0 bg-v1-primary-950 opacity-25 rounded-l-lg" style={{ width: `${percentages[option as keyof typeof percentages]}%` }}></div>
                            )}
                        </button>
                        {isSubmitted && <span className="ml-4">{percentages[option as keyof typeof percentages]}%</span>}
                    </div>
                ))}
                {!isSubmitted ? (
                    <div className="flex border-t-2 border-v1-neutral-100 pt-5 gap-5">
                        <input 
                        className="w-full p-3 rounded-lg bg-v1-tertiary-75" 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Ingresa tu mail" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required/>
                        <button type="submit" className="flex gap-3 items-center bg-v1-primary-950 p-3 rounded-lg text-v1-primary-50 text-nowrap min-w-max">Enviar <img className="w-5 h-5" src="https://img.icons8.com/?size=100&id=39969&format=png&color=ffffff" alt="" /></button>
                    </div>
                ) : (
                    <div className="text-center pt-5">
                        <h2 className="text-xl text-v1-primary-950 font-semibold">¡Respuesta enviada! Gracias por tu interés.</h2>
                        <p className="text-gray-600">Hasta ahora, hemos recibido 286 votos.</p>
                    </div>
                )}
            </form>
        </div>
    );
}

export default Form;