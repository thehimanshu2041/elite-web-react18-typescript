import { Page } from "../../model/elite";
import { UserModel, UserPasswordPatchReqModel, UserPatchReqModel, UserPatchSettingReqModel, UserReqModel, UserSettingModel } from "../../model/user";
import restUtils from "../../utils/rest";

const CXT_PATH = process.env.REACT_APP_BASE_URL;

class UserStore {

    getUserDetails = async () => {
        return await restUtils.call<UserModel>(`${CXT_PATH}/api/user`, 'GET');
    }

    getUserDetailById = async (id: number) => {
        return await restUtils.call<UserModel>(`${CXT_PATH}/api/user/${id}`, 'GET');
    }

    updateUserDetail = async (id: number, payload: UserReqModel) => {
        return await restUtils.call<UserModel>(`${CXT_PATH}/api/user/${id}`, 'PUT', payload);
    }

    patchUserDetail = async (id: number, payload: UserPatchReqModel) => {
        return await restUtils.call<UserModel>(`${CXT_PATH}/api/user/${id}`, 'PATCH', payload);
    }

    patchUserPassword = async (id: number, payload: UserPasswordPatchReqModel) => {
        return await restUtils.call<UserModel>(`${CXT_PATH}/api/user/password/${id}`, 'PATCH', payload);
    }

    deleteUserDetail = async (id: number) => {
        return await restUtils.call<boolean>(`${CXT_PATH}/api/user/${id}`, 'DELETE');
    }

    getUserSettings = async () => {
        return await restUtils.call<UserSettingModel>(`${CXT_PATH}/api/user/settings`, 'GET');
    }

    patchUserSettings = async (id: number, payload: UserPatchSettingReqModel) => {
        return await restUtils.call<UserSettingModel>(`${CXT_PATH}/api/user/settings/${id}`, 'PATCH', payload);
    }

    getUserDetailsPdf = async () => {
        return await restUtils.call<any>(`${CXT_PATH}/api/user/pdf`, 'GET', null, 'blob');
    }

    getUserDetailsQR = async () => {
        return await restUtils.call<any>(`${CXT_PATH}/api/user/qr`, 'GET', null, 'blob');
    }

    searchUserDetails = async (searchTerm: string, pageIndex: number, pageSize: number) => {
        return await restUtils.call<Page<UserModel>>(`${CXT_PATH}/api/user/search?searchTerm=${encodeURIComponent(searchTerm)}&pageIndex=${pageIndex}&pageSize=${pageSize}`, 'GET');
    }

}


const userStore = new UserStore();
export default userStore;