import restUtils from "../../utils/rest-utils";

const CXT_PATH = process.env.REACT_APP_BASE_URL;

class UserStore {

    downloadUserInfo = async () => {
        return await restUtils.call<any>(`${CXT_PATH}/api/user/download`, 'GET', null, 'blob');
    }

}


const userStore = new UserStore();
export default userStore;