export enum NOTIFICATION_STATUS {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export const NOTIFICATION_MESSAGES = {
    ALERT : NOTIFICATION_STATUS,
    FIELD_EMPTY_ALERT : 'Error: Fields cannot be empty',
    LOGIN_AUTHENTICATE: 'Authenticating...',
    LOGIN_ERROR : 'Login Error: Email / Password is incorrect',
    LOGIN_SUCCESS : 'Login Successful',
    REGISTER_ERROR : 'Error: Email / Activtion Key is incorrect',
    RECORD_SAVING_SUCCESS : 'Record saved successfully',
    RECORD_SAVING_ALERT : 'Error: Unable to save record, please try again',
    RECORD_CREATED_SUCCESS : 'Record created successfully',
    RECORD_UPDATED_SUCCESS : 'Record updated successfully',
    RECORD_DELETED_SUCCESS : 'Record deleted successfully',
    SERVICE_ERROR: 'Service Error',
}

export const SERVER_API = process.env.REACT_APP_AUTH0_SERVER;

const cTypeBase = [
	[[0.86, 0.3712, 0.33999999999999997]],
	[[0.86, 0.3712, 0.33999999999999997],
		[0.33999999999999997, 0.8287999999999999, 0.86]],
	[[0.86, 0.3712, 0.33999999999999997],
		[0.33999999999999997, 0.86, 0.3712],
		[0.3712, 0.33999999999999997, 0.86]],
	[[0.86, 0.3712, 0.33999999999999997],
		[0.5688000000000001, 0.86, 0.33999999999999997],
		[0.33999999999999997, 0.8287999999999999, 0.86],
		[0.6311999999999998, 0.33999999999999997, 0.86]],
	[[0.86, 0.3712, 0.33999999999999997],
		[0.7247999999999999, 0.86, 0.33999999999999997],
		[0.33999999999999997, 0.86, 0.5792000000000002],
		[0.33999999999999997, 0.5167999999999995, 0.86],
		[0.7871999999999999, 0.33999999999999997, 0.86]],
	[[0.86, 0.3712, 0.33999999999999997],
		[0.8287999999999999, 0.86, 0.33999999999999997],
		[0.33999999999999997, 0.86, 0.3712],
		[0.33999999999999997, 0.8287999999999999, 0.86],
		[0.3712, 0.33999999999999997, 0.86],
		[0.86, 0.33999999999999997, 0.8287999999999999]],
	[[0.86, 0.3712, 0.33999999999999997],
		[0.86, 0.8169142857142857, 0.33999999999999997],
		[0.4573714285714283, 0.86, 0.33999999999999997],
		[0.33999999999999997, 0.86, 0.6683428571428571],
		[0.33999999999999997, 0.6059428571428571, 0.86],
		[0.5197714285714281, 0.33999999999999997, 0.86],
		[0.86, 0.33999999999999997, 0.7545142857142858]],
	[[0.86, 0.3712, 0.33999999999999997],
		[0.86, 0.7612000000000001, 0.33999999999999997],
		[0.5688000000000001, 0.86, 0.33999999999999997],
		[0.33999999999999997, 0.86, 0.5012000000000001],
		[0.33999999999999997, 0.8287999999999999, 0.86],
		[0.33999999999999997, 0.43879999999999986, 0.86],
		[0.6311999999999998, 0.33999999999999997, 0.86],
		[0.86, 0.33999999999999997, 0.6987999999999996]]
	];

export const getBaseColours = (howMany: number) => { // One for each scenario type
	howMany = howMany - 1;
	if (howMany < 0) {
		return [];
	}
	let rv:any = cTypeBase[howMany];
	return rv;
};

export const expandBaseColours = (bCols: any, howMany: number, cIndex:number) => {

	let data = copyObject(bCols); // make sure we copy to avoid contamination
	let rv = [];

	for (let i = 0; i < data.length; i += 1) {
		let bc = data[i];
		let bco = [];

		for (let j = 0; j < howMany; j += 1) {
			bc[cIndex] += 0.01;
			const rgb = [(bc[0] * 255).toFixed(0), (bc[1] * 255).toFixed(0), (bc[2] * 255).toFixed(0)];
			bco.push('rgb(' + rgb.join(',') + ')');
		}
		rv.push(bco);
	}
	return rv;
}

export const copyObject = (obj: any) => {

	try {
		obj = JSON.parse(JSON.stringify(obj));
	} catch (e) {
		console.error('WARNING: cannot copy object, passing a reference');
	}
	return obj;
}