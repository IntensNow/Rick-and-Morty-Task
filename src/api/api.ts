import { Nullable } from "../typing/types";

const baseApiUrl = "https://rickandmortyapi.com/api/character";

export async function fetchCharacters(page: number, name: Nullable<string>) {
    let params = `?page=${page}`;
    if(name) {
        params = `${params}&name=${name}`;
    }

    try {
        const response = await fetch(`${baseApiUrl}/${params}`);
        console.log('response in api is')
        console.dir(response);
        if(response.ok) {
            let result = await response.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function fetchSingleCharacter(id: number) {
    try {
        const response = await fetch(`${baseApiUrl}/${id}`);
        if(response.ok) {
            let result = await response.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}
  