import { BaseSyntheticEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';   

interface IInput {
    onChange(value: string) : void;
    emitTimeout?: number;
    className?: string;
}

export default function Input({ onChange, emitTimeout = 1000, className }: IInput)  {
    const [ value, setValue ] = useState("");
    const [ timerId, setTimerId ] = useState(0);

    const onInputChange = (e: BaseSyntheticEvent) => {
        setValue(e.target.value);
        clearTimeout(timerId);
        const id = setTimeout(onChange, emitTimeout, e.target.value);
        setTimerId(id);
    }

    return (
        <InputGroup className={className}>
            <Form.Control placeholder="filter by name..." onChange={onInputChange} value={value}/>
        </InputGroup>
    )
}