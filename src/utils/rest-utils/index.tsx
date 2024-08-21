import axiosUtils from '../axios-utils';
import loadingStore from '../../stores/loading';
import snackbarUtils from '../snackbar-utils';

// Define the HTTP methods as a TypeScript union type
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

class RestUtils {
    // Define a generic method for API calls
    async call<T>(url: string, method: HttpMethod, body?: any): Promise<T> {
        try {
            loadingStore.setLoading(true);
            let response;

            switch (method) {
                case 'POST':
                    response = await axiosUtils.post<T>(url, body);
                    break;
                case 'PUT':
                    response = await axiosUtils.put<T>(url, body);
                    break;
                case 'DELETE':
                    response = await axiosUtils.delete<T>(url);
                    break;
                case 'GET':
                default:
                    response = await axiosUtils.get<T>(url);
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
