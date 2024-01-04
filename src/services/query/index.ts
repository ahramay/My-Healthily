import axios from 'axios';
import { bearerToken } from 'utility/sessions';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;

export const serviceQuery = (url: string) => {
    return {

        fetchAll: () => axios.get(url, { headers: { Authorization: `Bearer ${bearerToken}`}}),
        fetchById: (id: string, qsKey?: string, qsVal?: string) => {
            url = url + '/' + id;
            if (qsKey && qsVal) {
                url += '?' + qsKey + '=' + qsVal;
            }
            return axios.get(url, { headers: { Authorization: `Bearer ${bearerToken}`}});
        },
        put: (data: Object) => axios.put(url, data, { headers: { 'Authorization' : `Bearer ${bearerToken}`}}),
        post: (data: Object) => axios.post(url, data, { headers: { 'Authorization': `Bearer ${bearerToken}`}}),
		create: (data: Object) => axios.post(url, data, { headers: { 'Authorization': `Bearer ${bearerToken}`}}),
        update: (id: string, data: Object) => axios.post(url + '/' + id, { headers: { 'Authorization': `Bearer ${bearerToken}`}}, data),
        delete: (id: string) => axios.delete(url + '/' + id, { headers: { 'Authorization': `Bearer ${bearerToken}`}}),
        push: (data: Object, header: Object) => axios.post(url, data, header)
    }
}

export const deleteResource = async (url: string, id: string) => {
    if (!url || !id) return;
    await serviceQuery(url).delete(id).then(async (result) => {
        return result;
    }).catch(err => {
        if (err) return false;
        return;
    });
};

export const getUserMetadata = async (getAccessTokenSilently: any) => {
    try {
        const accessToken = await getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
        });
        if (accessToken) {
            return {status: 'success', data: accessToken};
        } else {
            return {status: 'error', data: 'Error'};
        }

    } catch (e) {
        return {status: 'error', data: (e as Error).message};
    }
};