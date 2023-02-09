import { apiFetch, makeHook } from 'api/ApiService';


const baseUrl = 'https://dog.ceo/api';

// GET Breeds
const getBreeds = async () => apiFetch<any>(`${baseUrl}/breeds/list/all`, { method: 'get' });
const useGetBreeds = () => makeHook<any>(getBreeds)();

// GET Breed Image
const getBreedImage = async (breed: string) => apiFetch<any>(`${baseUrl}/breed/${breed}/images`, { method: 'get' });

const dogsApi = {
    useGetBreeds,
    getBreedImage
};

export default dogsApi;
