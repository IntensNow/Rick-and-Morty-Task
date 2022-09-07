import { Nullable } from "./registerSlice";

const baseApiUrl = "https://rickandmortyapi.com/api/character";

export async function fetchCharacters(page: number, name: Nullable<string>) {
    let params = `?page=${page}`;
    if(name) {
        params = `${params}&name=${name}`;
    }

    try {
        const response = await fetch(`${baseApiUrl}/${params}`);
        if(response.ok) {
            let result = await response.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}
  