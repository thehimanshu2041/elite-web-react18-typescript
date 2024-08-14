import axiosUtils from './axiosUtils';
import loadingStore from '../stores/loading';
import snackbarUtils from './snackbarUtils';

// Define the HTTP methods as a TypeScript union type
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

class RestUtils {
    // Define a generic method for API calls
    async call<T>(url: string, method: HttpMethod, body?: any, showError?: boolean): Promise<T> {
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
            if (showError) {
                snackbarUtils.error(error.message);
            }
            console.error(error);
            return null as any;
        } finally {
            loadingStore.setLoading(false);
        }
    }
}

const restUtils = new RestUtils();
export default restUtils;
