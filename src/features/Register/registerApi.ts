// A mock function to mimic making an async request for data
const baseApiUrl = "https://rickandmortyapi.com/api/character";

export async function fetchCharacters(page: number) {
    try {
        const response = await fetch(`${baseApiUrl}/?page=${page}`);
        console.log(response);
        if(response.ok) {
            let result = await response.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}
  