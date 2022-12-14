import { useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { useNavigate } from "react-router-dom";

import { changeFilterName, changePaging, INITIAL_CURRENT_PAGE, loadCharacters, selectRegister } from "./registerSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from './Register.module.css';
import Paging from "../../views/Paging";
import Input from "../../views/Input";
import { RequestStatus } from "../../typing/types";
import ErrorOverlay from "../../views/ErrorOverlay/ErrorOverlay";

const REQUEST_ERROR_MESSAGE = `An error occurred while requesting a list of characters. 
    Check internet connection 
    or change filtering by name.`;

export default function Register() {

    const { characters, paging, status } = useAppSelector(selectRegister);
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(loadCharacters({ page: INITIAL_CURRENT_PAGE, filterName: "" }));
    }, [])

    return <div className={styles.container}>
            { status === RequestStatus.FAILED && <ErrorOverlay text={REQUEST_ERROR_MESSAGE}/> }
            <h1>Ultra Multi-Universe DB for Rick and Morty characters</h1>
            <Table striped bordered hover className={styles.table}>
                <thead>
                    <tr>
                    <th></th>
                    <th>#</th>
                    <th className={styles.nameHeadingCell}>
                        Name
                        <Input 
                            onChange={value => dispatch(changeFilterName(value))}
                            className={styles.filterInput}
                        />
                    </th>
                    <th>Species</th>
                    </tr>
                </thead>
                <tbody>
                    {characters?.map(({id, name, species, image}) =>
                        <tr key={id} onClick={() => navigate(`/${id}`)}>
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
                            onChange={page => dispatch(changePaging(page))}
                    /> 
            }
        </div>;
  }