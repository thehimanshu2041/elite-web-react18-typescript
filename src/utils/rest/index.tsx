import axiosUtils from '../axios';
import loadingStore from '../../stores/loading';
import snackbarUtils from '../snackbar';
import { HttpMethod } from '../../model/elite';

class RestUtils {

    async call<T>(url: string, method: HttpMethod, body?: any, responseType?: any): Promise<T> {
        try {
            loadingStore.setLoading(true);
            let response;
            switch (method) {
                case 'POST':
                    if (responseType) {
                        response = await axiosUtils.post<T>(url, body, { responseType: responseType });
                    } else {
                        response = await axiosUtils.post<T>(url, body);
                    }
                    break;
                case 'PUT':
                    if (responseType) {
                        response = await axiosUtils.put<T>(url, body, { responseType: responseType });
                    } else {
                        response = await axiosUtils.put<T>(url, body);
                    }
                    break;
                case 'PATCH':
                    if (responseType) {
                        response = await axiosUtils.patch<T>(url, body, { responseType: responseType });
                    } else {
                        response = await axiosUtils.patch<T>(url, body);
                    }
                    break;
                case 'DELETE':
                    if (responseType) {
                        response = await axiosUtils.delete<T>(url, { responseType: responseType });
                    } else {
                        response = await axiosUtils.delete<T>(url);
                    }
                    break;
                case 'GET':
                default:
                    if (responseType) {
                        response = await axiosUtils.get<T>(url, { responseType: responseType });
                    } else {
                        response = await axiosUtils.get<T>(url);
                    }
                    break;
            }
            return response.data;
        } catch (error: any) {
            console.error(error);
            if (error.response?.data?.error) {
                const tempError = error.response.data.error;
                if (typeof tempError === 'string') {
                    snackbarUtils.error(tempError);
                } else {
                    snackbarUtils.error(tempError?.message);
                }
            } else {
                snackbarUtils.error(error.message);
            }
            return null as any;
        } finally {
            loadingStore.setLoading(false);
        }
    }
}

const restUtils = new RestUtils();
export default restUtils;
