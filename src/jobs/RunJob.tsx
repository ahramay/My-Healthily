import React, { useState } from 'react'; //useMemo

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import Button from  '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Form from '../styleguide/layout/Form';
import FormLabel from '../styleguide/form/Text/FormLabel';
import TextField from '../styleguide/form/Text/Field';
import ButtonIcon from '../styleguide/ButtonIcon';
import Loader from '../styleguide/Loader';

import { API_JOBS } from '../services/api/config';
import { serviceQuery } from '../services/query';

export interface Props {
	calcSettingsID: any;
	onSuccess: (val: any, name: string) => void | undefined;
	onError: (val: any, name: string) => void | undefined;
	onSaveStart?: (val: any, name: string) => void | undefined;
};

const RunJob: React.FC<Props> = ({
	calcSettingsID,
	onSuccess,
	onError,
	onSaveStart,
}) => {

	const [jobFields, setJobFields] = useState<any>({
		valuationDate: '',
		runDate: '',
		simulatorCalcSerialID: null,
	});

	const [result, setResult] = useState<any>({});
	const [showLoader, setShowLoader] = useState<boolean>(false);
	const [jobStarted, setJobStarted] = useState<boolean>(false);

	const handleJobFields = (value: any, name: string) => {
        setJobFields({
            ...jobFields,
            [name]: value,
        })
		setJobStarted(false);
    }
	
	const makeJob = () => {
		setShowLoader(true);
		const jobAPIData = {
			valuationDate: jobFields.valuationDate,
			runDate: jobFields.runDate,
			simulatorCalcSerialID: parseInt(calcSettingsID)
		};
		serviceQuery(API_JOBS).create(jobAPIData).then(async (response) => {
			setResult(response.data);
		}).catch(err => {
			console.warn(err)
			onError(err, 'error');
		}).finally(() => {
			onSuccess(result, 'success');
			setShowLoader(false);
			setJobStarted(true);
		});
	}

	const canMakeJob = () => {
		return jobFields.valuationDate && jobFields.runDate && jobStarted === false;
	};

	return (
		<Card>
			<Form>
				<CardContent>
					
					<Typography>Run a job with these settings</Typography>
					
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} xl={6}>
							<FormLabel label="Valuation Date">
								<TextField 
									name="valuationDate" value={jobFields.valuationDate} error={true} required={true} disabled={showLoader}
									onChange={handleJobFields} type="date"
								/>
							</FormLabel>
						</Grid>

						<Grid item xs={12} sm={6} xl={6}>
							<FormLabel label="Run Date">
								<TextField 
									name="runDate" value={jobFields.runDate} error={true} required={true} disabled={showLoader} 
									onChange={handleJobFields} type="date"
								/>
							</FormLabel>
						</Grid>
					</Grid>
					{!showLoader && 
						<Box display="flex" flexDirection="row" mt={2}>
							<Box p={1} width="50%">
								<Button variant="contained" color="secondary" size="large" disableElevation={true} disabled={!canMakeJob()}
								onClick={ makeJob } >
									<ButtonIcon icon="check_circle" label="Run Job" />
								</Button>
							</Box>
							{ jobStarted && 
								<Box p={1} flexShrink={1}><Typography>Job added to queue.</Typography></Box>
							}
						</Box>
					}
					{showLoader && <Loader margin={2} /> }

				</CardContent>
			</Form>
		</Card>

	);
}

export default React.memo(RunJob);