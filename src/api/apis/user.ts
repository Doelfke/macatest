import { apiFetch, makeHook, makePost } from 'api/ApiService';
import { ConfigService } from 'core/Services/ConfigService';


const baseUrl = ConfigService.getString('API_ENDPOINT') + '/user';


// GET Self
const getSelf = async () => apiFetch<any>(`${baseUrl}/self`, { method: 'get' });
const useGetSelf = () => makeHook<any>(getSelf)();

// Accept Invite
const createProfile = async () => apiFetch<boolean>(`${baseUrl}/create-profile`, { method: 'post' });
const useCreateProfile = () => makePost<boolean>(() => createProfile());


const userApi = {
    useGetSelf,
    useCreateProfile,
};
export default userApi;
