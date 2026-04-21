import { makeAutoObservable } from 'mobx';

class SelectionModel {
	purpose: string | undefined = undefined;
	location: string | undefined = undefined;
	technology: string | undefined = undefined;
	firstTime: boolean | undefined = undefined;
	caseSelected: string | undefined = undefined;
	userName: string | undefined = undefined;
	userId: string | undefined = undefined;
	datasetsSubmitted: string[] = [];
	datasetSelected: string | undefined = undefined;

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}
	setPurpose(value: string) {
		this.purpose = value;
	}

	setLocation(value: string) {
		this.location = value;
	}
	setUserId(value: string) {
		this.userId = value;
	}
	setCase(value: string) {
		this.caseSelected = value;
	}
	setTechnology(value: string) {
		this.technology = value;
	}
	setFirstTime(value: boolean) {
		this.firstTime = value;
	}
	setUserName(value: string) {
		this.userName = value;
	}
	setDatasetsSubmitted(value: string) {
		this.datasetsSubmitted.push(value);
	}
	setDatasetSelected(value: string) {
		this.datasetSelected = value;
	}
}

// export all models
export const selections: SelectionModel = new SelectionModel();