import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadCharacter, selectCard } from "./cardSlice";
import styles from "./Card.module.css";
import ErrorOverlay from "../../views/ErrorOverlay/ErrorOverlay";
import { RequestStatus } from "../../typing/types";

const REQUEST_ERROR_MESSAGE = "An error occurred while requesting character information. Check internet connection";

export default function Card() {
    let { id } = useParams();

    const { character, status } = useAppSelector(selectCard);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadCharacter(Number(id)));
    }, [])

    if(status === RequestStatus.LOADING) {
        return <Spinner animation="border" variant="light" />
    }

    return <div className={styles.container}>
            { status === RequestStatus.FAILED && <ErrorOverlay text={REQUEST_ERROR_MESSAGE}/> }
            <Image src={character?.image}/>
            <Table hover>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{character?.name}</td>
                    </tr>
                    <tr>
                        <td>Origin</td>
                        <td>{character?.origin.name}</td>
                    </tr>
                    <tr>
                        <td>Species</td>
                        <td>{character?.species}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{character?.status}</td>
                    </tr>
                </tbody>
            </Table>
        </div>;
  }