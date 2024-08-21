import { CodeModel } from "../../../model/config/code";
import restUtils from "../../../utils/rest-utils";

const CXT_PATH = process.env.REACT_APP_BASE_URL;

class CodeStore {


    getCodeById = async (id: number) => {
        return await restUtils.call<CodeModel>(`${CXT_PATH}/api/config/code/${id}`, 'GET');
    }

    saveCode = async (payload: CodeModel) => {
        return await restUtils.call<CodeModel>(`${CXT_PATH}/api/config/code`, 'POST', payload);
    }

    updateCode = async (id: number, payload: CodeModel) => {
        return await restUtils.call<CodeModel>(`${CXT_PATH}/api/config/code/${id}`, 'PUT', payload);
    }

    getCodesByType = async (type: string) => {
        return await restUtils.call<CodeModel[]>(`${CXT_PATH}/api/config/code/code-type/code/${type}`, 'GET');
    }

    getCodesById = async (id: number) => {
        return await restUtils.call<CodeModel[]>(`${CXT_PATH}/api/config/code/code-type/${id}`, 'GET');
    }

    deleteCodesById = async (id: number) => {
        return await restUtils.call<void>(`${CXT_PATH}/api/config/code/${id}`, 'DELETE');
    }

}


const codeStore = new CodeStore();
export default codeStore;