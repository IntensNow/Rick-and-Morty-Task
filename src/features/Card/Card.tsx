import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadCharacter, selectCard } from "./cardSlice";
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';

export default function Card() {
    let { id } = useParams();

    const { character } = useAppSelector(selectCard);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadCharacter(Number(id)));
    }, [])

    return <div>
        <Image src={character?.image}/>
            <Table bordered hover>
                <tbody>
                    <tr>
                        <td>name</td>
                        <td>{character?.name}</td>
                    </tr>
                    <tr>
                        <td>origin</td>
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