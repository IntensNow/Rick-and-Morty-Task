import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { loadCharacters, selectRegister } from "./registerSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    const { characters } = useAppSelector(selectRegister);
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(loadCharacters());
    }, [])

    return <div>
            <Table striped bordered hover width={'1200px'}>
                <thead>
                    <tr>
                    <th></th>
                    <th>#</th>
                    <th>Name</th>
                    <th>Species</th>
                    </tr>
                </thead>
                <tbody>
                    {characters?.map(({id, name, species, image}) =>
                        <tr onClick={() => navigate(`/${id}`)}>
                            <td><Image src={image} rounded height={'60px'}/></td>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{species}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>;
  }