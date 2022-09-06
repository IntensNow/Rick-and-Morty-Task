import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { loadCharacters, selectRegister } from "./registerSlice";
import { useNavigate } from "react-router-dom";

import styles from './Register.module.css';
import Paging from "../../views/Paging";

export default function Register() {

    const { characters, paging } = useAppSelector(selectRegister);
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(loadCharacters(1));
    }, [])

    return <div>
            <Table striped bordered hover className={styles.table}>
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
                            <td><Image src={image} rounded height={'25px'}/></td>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{species}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            { 
                paging.total && 
                    <Paging current={paging.current} 
                            total={paging.total} 
                            onChange={(target: number) => dispatch(loadCharacters(target))}
                    /> 
            }
        </div>;
  }