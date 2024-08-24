import { AuthUserModel } from "../../model/auth";
import { Page } from "../../model/elite";
import restUtils from "../../utils/rest";

const CXT_PATH = process.env.REACT_APP_BASE_URL;

class UserStore {

    searchUser = async (searchTerm: string, pageIndex: number, pageSize: number) => {
        return await restUtils.call<Page<AuthUserModel>>(`${CXT_PATH}/api/user/search?searchTerm=${encodeURIComponent(searchTerm)}&pageIndex=${pageIndex}&pageSize=${pageSize}`, 'GET');
    }

    getUserById = async (id: number) => {
        return await restUtils.call<AuthUserModel>(`${CXT_PATH}/api/user/${id}`, 'GET');
    }

    updateUser = async (id: number, payload: AuthUserModel) => {
        return await restUtils.call<AuthUserModel>(`${CXT_PATH}/api/user/${id}`, 'PUT', payload);
    }

    downloadUserInfo = async () => {
        return await restUtils.call<any>(`${CXT_PATH}/api/user/download`, 'GET', null, 'blob');
    }

}


const userStore = new UserStore();
export default userStore;