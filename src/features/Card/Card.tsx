import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadCharacter, selectCard } from "./cardSlice";
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import styles from "./Card.module.css";

export default function Card() {
    let { id } = useParams();

    const { character, status } = useAppSelector(selectCard);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadCharacter(Number(id)));
    }, [])

    if(status === "loading") {
        return <Spinner animation="border" variant="light" />
    }

    return <div className={styles.container}>
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