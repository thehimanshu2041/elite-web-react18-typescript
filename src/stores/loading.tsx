import { makeObservable, observable, action } from 'mobx';

class Loading {
    isloading: boolean = false;

    constructor() {
        makeObservable(this, {
            isloading: observable,
            setLoading: action,
        });
    }

    setLoading = (value: boolean) => {
        this.isloading = value;
    };
}

const loadingStore = new Loading();
export default loadingStore;
