import { CodeModel } from "../config/code";
import { CountryModel } from "../config/country";

export interface UserReqModel {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    gender: number;
    address: string;
    phone: number;
    country: number;
}

export interface UserPatchReqModel {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    gender: number;
    address: string;
    phone: number;
    country: number;
}

export interface UserPasswordPatchReqModel {
    old_password: string;
    password: string;
}

export interface UserModel {
    id: number;
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    gender: CodeModel;
    address: string;
    phone: number;
    country: CountryModel;
    roles?: string[];
}

export interface UserSettingReqModel {
    uid: string;
    secret: string;
    token: string;
    notification: boolean;
    email: boolean;
    night_mode: boolean;
}

export interface UserPatchSettingReqModel {
    refresh_credentials: boolean;
    notification: boolean;
    email: boolean;
    night_mode: boolean;
}

export interface UserSettingModel {
    id: number;
    uid: string;
    secret: string;
    token: string;
    notification: boolean;
    email: boolean;
    night_mode: boolean;
}