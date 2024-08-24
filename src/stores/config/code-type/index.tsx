import { CodeTypeModel } from "../../../model/config/code-type";
import { Page } from "../../../model/elite";
import restUtils from "../../../utils/rest";

const CXT_PATH = process.env.REACT_APP_BASE_URL;

class CodeTypeStore {

    getCodeTypes = async () => {
        return await restUtils.call<CodeTypeModel[]>(`${CXT_PATH}/api/config/code-type`, 'GET');
    }

    searchCodeTypes = async (searchTerm: string, pageIndex: number, pageSize: number) => {
        return await restUtils.call<Page<CodeTypeModel>>(`${CXT_PATH}/api/config/code-type/search?searchTerm=${encodeURIComponent(searchTerm)}&pageIndex=${pageIndex}&pageSize=${pageSize}`, 'GET');
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