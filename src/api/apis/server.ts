import { apiFetch, makeHook, makePost } from 'api/ApiService';
import { ConfigService } from 'core/Services/ConfigService';
import { ApiDto } from 'server/dto/api.dto';
import { CreateApiDto } from 'server/dto/create-api.dto';
import { UpdateApiDto } from 'server/dto/update-api.dto';


const baseUrl = ConfigService.getString('API_ENDPOINT') + '/server';

// GET Single APi
const getApi = async (apiId: number) => apiFetch<ApiDto>(`${baseUrl}/api/${apiId}`, { method: 'get' });
const useGetApi = (apiId: number) => makeHook<ApiDto>(() => getApi(apiId));

// GET ALL Apis
const getApis = async () => apiFetch<ApiDto[]>(`${baseUrl}/api/all`, { method: 'get' });
const useGetApis = () => makeHook<ApiDto[]>(getApis)();

// CREATE Api
const createApi = async (data: CreateApiDto) => apiFetch<ApiDto>(`${baseUrl}/api`, { method: 'post', body: JSON.stringify(data) });
const useCreateApi = (data: CreateApiDto) => makePost<ApiDto>(() => createApi(data));

// UPDATE Api
const updateApi = async (data: UpdateApiDto) => apiFetch<ApiDto>(`${baseUrl}/api/${data.id}`, { method: 'post', body: JSON.stringify(data) });
const useUpdateApi = (data: UpdateApiDto) => makePost<ApiDto>(() => updateApi(data));

// CREATE Api
const deleteApi = async (apiId: number) => apiFetch<boolean>(`${baseUrl}/api/${apiId}`, { method: 'delete' });
const useDeleteApi = (apiId: number) => makePost<boolean>(() => deleteApi(apiId));

const serverApi = {
    useGetApi,
    useGetApis,
    useCreateApi,
    useUpdateApi,
    useDeleteApi
};
export default serverApi;
