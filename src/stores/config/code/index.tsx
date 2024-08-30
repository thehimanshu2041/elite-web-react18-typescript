import { CodeModel, CodeReqModel } from "../../../model/config/code";
import { Page } from "../../../model/elite";
import restUtils from "../../../utils/rest";

const CXT_PATH = process.env.REACT_APP_BASE_URL;

class CodeStore {


    getCodeDetails = async () => {
        return await restUtils.call<CodeModel[]>(`${CXT_PATH}/config/code`, 'GET');
    }

    getCodeById = async (id: number) => {
        return await restUtils.call<CodeModel>(`${CXT_PATH}/config/code/${id}`, 'GET');
    }

    getCodeByType = async (code: string) => {
        return await restUtils.call<CodeModel>(`${CXT_PATH}/config/code/code/${code}`, 'GET');
    }

    getCodeDetailsByTypeId = async (id: number) => {
        return await restUtils.call<CodeModel[]>(`${CXT_PATH}/config/code/code-type/${id}`, 'GET');
    }

    getCodeDetailsByTypeCode = async (code: string) => {
        return await restUtils.call<CodeModel[]>(`${CXT_PATH}/config/code/code-type/code/${code}`, 'GET');
    }

    searchCode = async (refId: number | undefined, searchTerm: string, pageIndex: number, pageSize: number) => {
        if (refId) {
            return await this.searchCodeDetailsByTypeId(refId, searchTerm, pageIndex, pageSize);
        } else {
            return await this.searchCodeDetails(searchTerm, pageIndex, pageSize)
        }
    }

    searchCodeDetails = async (searchTerm: string, pageIndex: number, pageSize: number) => {
        return await restUtils.call<Page<CodeModel>>(`${CXT_PATH}/config/code/search?searchTerm=${encodeURIComponent(searchTerm)}&pageIndex=${pageIndex}&pageSize=${pageSize}`, 'GET');

    }

    searchCodeDetailsByTypeId = async (refId: number, searchTerm: string, pageIndex: number, pageSize: number) => {
        return await restUtils.call<Page<CodeModel>>(`${CXT_PATH}/config/code/code-type/search/${refId}?searchTerm=${encodeURIComponent(searchTerm)}&pageIndex=${pageIndex}&pageSize=${pageSize}`, 'GET');
    }

    searchCodeDetailsByTypeCode = async (code: string, searchTerm: string, pageIndex: number, pageSize: number) => {
        return await restUtils.call<Page<CodeModel>>(`${CXT_PATH}/config/code/code-type/code/search/${code}?searchTerm=${encodeURIComponent(searchTerm)}&pageIndex=${pageIndex}&pageSize=${pageSize}`, 'GET');
    }

    createCode = async (payload: CodeReqModel) => {
        return await restUtils.call<CodeModel>(`${CXT_PATH}/api/config/code`, 'POST', payload);
    }

    updateCode = async (id: number, payload: CodeReqModel) => {
        return await restUtils.call<CodeModel>(`${CXT_PATH}/api/config/code/${id}`, 'PUT', payload);
    }

    deleteCode = async (id: number) => {
        return await restUtils.call<void>(`${CXT_PATH}/api/config/code/${id}`, 'DELETE');
    }
}


const codeStore = new CodeStore();
export default codeStore;