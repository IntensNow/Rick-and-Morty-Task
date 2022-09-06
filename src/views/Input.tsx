import { BaseSyntheticEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';   

interface IInput {
    onChange(value: string) : void;
    emitTimeout?: number;
}

export default function Input({ onChange, emitTimeout = 1000 }: IInput)  {
    const [ value, setValue ] = useState("");
    const [ timerId, setTimerId ] = useState(0);

    const onInputChange = (e: BaseSyntheticEvent) => {
        setValue(e.target.value);
        clearTimeout(timerId);
        const id = setTimeout(onChange, emitTimeout, e.target.value);
        setTimerId(id);
    }

    return (
        <InputGroup>
            <InputGroup.Text>filter by name</InputGroup.Text>
            <Form.Control placeholder="..." onChange={onInputChange} value={value}/>
        </InputGroup>
    )
}