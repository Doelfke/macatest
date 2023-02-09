import { useState, useEffect, DependencyList } from 'react';
import clonedeep from 'lodash.clonedeep';

import { AuthService } from 'core/Services/AuthService';

import userApi from './apis/user';
import serverApi from './apis/server';
import dogsApi from './apis/dogs';


const ApiService = {
    userApi,
    serverApi,
    dogsApi
};
export default ApiService;


export const apiFetch = async <T>(input: RequestInfo, init?: RequestInit) => {

    const token = AuthService.getToken();

    const headers = init?.headers || {};
    // @ts-ignore
    headers.authorization = 'Bearer ' + token;
    // @ts-ignore
    headers['Content-Type'] = 'application/json';
    // @ts-ignore
    headers.mode = 'cors';

    const result = await fetch(input, { ...init, headers });

    if (result.status === 401) {
        AuthService.logOut();
    }


    const body = await result.text();
    if (!body.startsWith('{') && !body.startsWith('[') && !body.startsWith('true') && !body.startsWith('false')) {
        // @ts-ignore
        return body as T;
    }


    const jsonResult = JSON.parse(body) as T;
    return jsonResult;
};


export interface ApiResult<T> {
    data?: T;
    isLoading: boolean;
    error?: string | NestValidationError[];
    errorCode?: number;
    refetch: () => void;
}

export const makeHook = <T>(apiFunction: () => Promise<T>, dependencies: DependencyList = []) => () => {
    const [fakeDependency, setFakeDependency] = useState(1);
    const refetch = () => setFakeDependency(fakeDependency + 1);

    const [result, setResult] = useState({ isLoading: true } as ApiResult<T>);

    useEffect(() => {
        apiFunction()
            .then((apiResult: NestResponse) => {
                if (apiResult.statusCode) {
                    setResult({ isLoading: false, error: apiResult.message, errorCode: apiResult.statusCode, refetch });
                    return;
                }
                const clonedResult = clonedeep(apiResult);
                setResult({ data: clonedResult, isLoading: false, refetch });
            })
            .catch((err) => {
                setResult({ isLoading: false, error: err, refetch });
            });
        // eslint-disable-next-line
    }, [fakeDependency, ...dependencies]);

    return result;
};

export const makePost = <T>(apiFunction: () => Promise<T>) => {
    return apiFunction()
        .then((apiResult: NestResponse) => {
            if (apiResult.statusCode) {
                return { error: apiResult.message, errorCode: apiResult.statusCode, isLoading: false } as ApiResult<T>;
            }
            const clonedResult = clonedeep(apiResult);
            return { data: clonedResult, isLoading: false } as ApiResult<T>;
        });
};


interface NestValidationError {
    target: {};
    property: string;
    value: any;
    constraints: {
        [type: string]: string;
    };
    children: NestValidationError[];
}

type NestResponse = any | {
    message?: any;
    statusCode?: number;
};