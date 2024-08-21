import { CodeTypeModel } from "../../../model/config/code-type";
import restUtils from "../../../utils/rest-utils";

const CXT_PATH = process.env.REACT_APP_BASE_URL;

class CodeTypeStore {

    getCodeTypes = async () => {
        return await restUtils.call<CodeTypeModel[]>(`${CXT_PATH}/api/config/code-type`, 'GET');
    }

    getCodeTypesById = async (id: number) => {
        return await restUtils.call<CodeTypeModel>(`${CXT_PATH}/api/config/code-type/${id}`, 'GET');
    }

    saveCodeType = async (payload: CodeTypeModel) => {
        return await restUtils.call<CodeTypeModel>(`${CXT_PATH}/api/config/code-type`, 'POST', payload);
    }

    updateCodeType = async (id: number, payload: CodeTypeModel) => {
        return await restUtils.call<CodeTypeModel>(`${CXT_PATH}/api/config/code-type/${id}`, 'PUT', payload);
    }

    deleteCodeType = async (id: number) => {
        return await restUtils.call<CodeTypeModel>(`${CXT_PATH}/api/config/code-type/${id}`, 'DELETE');
    }

}


const codeTypeStore = new CodeTypeStore();
export default codeTypeStore;