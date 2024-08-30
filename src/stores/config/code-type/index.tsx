import { CodeTypeModel, CodeTypeReqModel } from "../../../model/config/code-type";
import { Page } from "../../../model/elite";
import restUtils from "../../../utils/rest";

const CXT_PATH = process.env.REACT_APP_BASE_URL;

class CodeTypeStore {

    getCodeTypeDetails = async () => {
        return await restUtils.call<CodeTypeModel[]>(`${CXT_PATH}/config/code-type`, 'GET');
    }

    getCodeTypeById = async (id: number) => {
        return await restUtils.call<CodeTypeModel>(`${CXT_PATH}/config/code-type/${id}`, 'GET');
    }

    getCodeTypeByCode = async (code: string) => {
        return await restUtils.call<CodeTypeModel>(`${CXT_PATH}/config/code-type/code/${code}`, 'GET');
    }

    searchCodeTypeDetails = async (searchTerm: string, pageIndex: number, pageSize: number) => {
        return await restUtils.call<Page<CodeTypeModel>>(`${CXT_PATH}/config/code-type/search?searchTerm=${encodeURIComponent(searchTerm)}&pageIndex=${pageIndex}&pageSize=${pageSize}`, 'GET');
    }

    createCodeType = async (payload: CodeTypeReqModel) => {
        return await restUtils.call<CodeTypeModel>(`${CXT_PATH}/api/config/code-type`, 'POST', payload);
    }

    updateCodeType = async (id: number, payload: CodeTypeReqModel) => {
        return await restUtils.call<CodeTypeModel>(`${CXT_PATH}/api/config/code-type/${id}`, 'PUT', payload);
    }

    deleteCodeType = async (id: number) => {
        return await restUtils.call<CodeTypeModel>(`${CXT_PATH}/api/config/code-type/${id}`, 'DELETE');
    }

}


const codeTypeStore = new CodeTypeStore();
export default codeTypeStore;