// A mock function to mimic making an async request for data
const baseApiUrl = "https://rickandmortyapi.com/api/character";

export async function fetchCharacters() {
    try {
        const response = await fetch(`${baseApiUrl}`);
        console.log(response);
        if(response.ok) {
            let result = await response.json();
            console.dir(result);
            return result.results;
        }
    } catch (error) {
        console.error(error);
    }
}
  