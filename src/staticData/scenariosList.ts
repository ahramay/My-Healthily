import { companyData } from "./usersList";
export const subscriptionType = [
  'No need for approval',
  'Needs approval by Admin only',
  'Needs approval by Admin / Super Admin',
  'Needs approval by Super Admin',
  'Needs approval by Creator',
]
export const subscriptionTypesList = [
  {
      label: 'No need for approval',
      value: 'no-need',
  },
  {
      label: 'Needs approval by Admin only',
      value: 'need-admin-only',
  },
  {
      label: 'Needs approval by Admin / Super Admin',
      value: 'need-admin-or-super-admin',
  },
  {
      label: 'Needs approval by Super Admin',
      value: 'need-super-admin',
  },
  {
      label: 'Needs approval by Creator',
      value: 'need-creator',
  },
]
export const scenariosList = [
    {
       id: '01',
       name: 'First Scenario',
       subscription: subscriptionTypesList[0].value,
       company: companyData[1],
    },
    {
       id: '02',
       name: 'Second Scenario',
       subscription: subscriptionTypesList[1].value,
       company: companyData[1],
    },
    {
       id: '03',
       name: 'Third Scenario',
       subscription: subscriptionTypesList[2].value,
       company: companyData[1],
    },
    {
       id: '04',
       name: 'Fourth Scenario',
       subscription: subscriptionTypesList[3].value,
       company: companyData[1],
    },
    {
       id: '05',
       name: 'Fifth Scenario',
       subscription: subscriptionTypesList[4].value,
       company: companyData[1],
    },
    {
       id: '06',
       name: 'Sixth Scenario',
       subscription: '',
       company: companyData[1],
    },
    {
       id: '07',
       name: 'Seventh Scenario',
       subscription: '',
       company: companyData[1],
    },
    {
       id: '08',
       name: 'Eight Scenario',
       subscription: '',
       company: companyData[2],
    },
    {
       id: '09',
       name: 'Nineth Scenario',
       subscription: '',
       company: companyData[2],
    },
    {
       id: '10',
       name: 'Tenth Scenario',
       subscription: '',
       company: companyData[2],
    },
];

export const historicColumnHeaders = [
   '3M', '6M', '12M', '18M', '2Y', '3Y', '5Y', '10Y',
];

export const scenariosColumnsData = [
    {
       title: historicColumnHeaders[0],
       value: 10.01,
       type: '%',
    },
    {
       title: historicColumnHeaders[1],
       value: 10.60,
       type: '%',
    },
    {
       title: historicColumnHeaders[2],
       value: 10.80,
       type: '%',
    },
    {
       title: historicColumnHeaders[3],
       value: 10.90,
       type: '%',
    },
    {
       title: historicColumnHeaders[4],
       value: 11.12,
       type: '%',
    },
    {
       title: historicColumnHeaders[5],
       value: 11.21,
       type: '%',
    },
    {
       title: historicColumnHeaders[6],
       value: 12.01,
       type: '%',
    },
    {
       title: historicColumnHeaders[7],
       value: 12.20,
       type: '%',
    },
];

export const getBlankScenarioColumnData = () => {
	let d = JSON.parse(JSON.stringify(scenariosColumnsData)); // copy to avoid reference bugs.
	for (let i = 0; i < d.length; i += 1) {
		let r = d[i];
		r.value = null;
	}
	return d;
}

export const scenariosData = [
    {
       id: '01',
       name: 'US Equities',
       data: scenariosColumnsData,
       input: 30,
    },
    {
       id: '02',
       name: 'Japanese Equities',
       data: scenariosColumnsData,
       input: 10,
    },
    {
       id: '03',
       name: 'Euro Bonds',
       data: scenariosColumnsData,
       input: 50,
    },
    {
       id: '04',
       name: 'UK Equity',
       data: scenariosColumnsData,
       input: 20,
    },
    {
       id: '05',
       name: 'Asian Equity',
       data: scenariosColumnsData,
       input: 10,
    },
];

export const forecastTypes = [
  {
    value: 1,
    label: 'Return',
  },
  {
    value: 2,
    label: 'Volatility',
  },
  /* {
    value: 3,
    label: 'Range',
  }, */
];

export const forecastIndexes = [
  {
    value: 1,
    label: 'S&P 500',
  },
  {
    value: 2,
    label: 'Russell 2000',
  },
  {
    value: 3,
    label: 'MSCI EAFE (Europe, Asia, Far East)',
  },
  {
    value: 4,
    label: 'Dow Jones Industrial Average',
  },
  {
    value: 5,
    label: 'Consumer Price Index',
  },
];

export const forecastClassList = [
  {
    value: 1,
    label: 'Equity',
  },
  {
    value: 2,
    label: 'Cash Equivalents',
  },
  {
    value: 3,
    label: 'Bonds',
  },
  {
    value: 4,
    label: 'Real Estate',
  },
  {
    value: 5,
    label: 'Gold',
  },
  {
    value: 6,
    label: 'Precious Metals & Commodities',
  },
  {
    value: 7,
    label: 'Alternative Investments',
  },
];

export const forecastGeographyList = [
  {
    value: 1,
    label: 'USA',
  },
  {
    value: 2,
    label: 'UK',
  },
  {
    value: 3,
    label: 'China',
  },
  {
    value: 4,
    label: 'Japan',
  },
  {
    value: 5,
    label: 'India',
  },
];

export const forecastCurrencyList = [
  {
    value: 1,
    label: 'USD',
  },
  {
    value: 2,
    label: 'GBP',
  },
  {
    value: 3,
    label: 'JPY',
  },
  {
    value: 4,
    label: 'EUR',
  },
  {
    value: 5,
    label: 'INR',
  },
];
/*
export const assetAndWeightList = [
  {
    "assetID": "AMZN",
    "name": "Amazon",
    "quantity": 2.3,
    "hedgeRatio": 0
  },
  {
    "assetID": "INTC",
    "name": "Intel corporation",
    "quantity": 1.2,
    "hedgeRatio": 0
  }
]*/

export const assetAndWeightList = [
  {
       id: 'SAPUSEQ',
       name: 'US Equities',
       asset: '',
       portfolioClass: '',
       geography: '',
       currency: '',
       weight: '20',
       weightType: '%',
  },
  {
       id: 'SAPJPEQ',
       name: 'Japan Equities',
       asset: '',
       portfolioClass: '',
       geography: '',
       currency: '',
       weight: '3',
       weightType: '%',
  },
  {
       id: 'SAPCNEQ',
       name: 'China Equities',
       asset: '',
       portfolioClass: '',
       geography: '',
       currency: '',
       weight: '3',
       weightType: '%',
  },
  {
       id: 'SAPUKEQ',
       name: 'UK Equities',
       asset: '',
       portfolioClass: '',
       geography: '',
       currency: '',
       weight: '3',
       weightType: '%',
  },
	{
		id: 'SAPEUXUKEQ',
		name: 'Europe Ex-UK Equities',
		asset: '',
		portfolioClass: '',
		geography: '',
		currency: '',
		weight: '7',
		weightType: '%',
	 },
	 {
		id: 'SAPCAEQ',
		name: 'Canada Equities',
		asset: '',
		portfolioClass: '',
		geography: '',
		currency: '',
		weight: '3',
		weightType: '%',
	 },
	 {
		id: 'SAPAUEQ',
		name: 'Australia Equities',
		asset: '',
		portfolioClass: '',
		geography: '',
		currency: '',
		weight: '3',
		weightType: '%',
	 },
	 {
		id: 'SAPADEMEQ',
		name: 'Advanced Emerging Equities',
		asset: '',
		portfolioClass: '',
		geography: '',
		currency: '',
		weight: '3',
		weightType: '%',
	 },
	 {
		id: 'SAPUSGBD',
		name: 'US Gov Bonds',
		asset: '',
		portfolioClass: '',
		geography: '',
		currency: '',
		weight: '10',
		weightType: '%',
	 },
	 {
		id: 'SAPUSCP',
		name: 'US Corp Bonds',
		asset: '',
		portfolioClass: '',
		geography: '',
		currency: '',
		weight: '5',
		weightType: '%',
	 },
	 {
		id: 'SAPGBXUSBD',
		name: 'World Ex-US Gov Bonds',
		asset: '',
		portfolioClass: '',
		geography: '',
		currency: '',
		weight: '10',
		weightType: '%',
	 },
	 {
		id: 'SAPGBXUSCP',
		name: 'World Ex-US Corp Bonds',
		asset: '',
		portfolioClass: '',
		geography: '',
		currency: '',
		weight: '5',
		weightType: '%',
	 },
	 {
		id: 'SAPPRIEQ',
		name: 'World Private Equity',
		asset: '',
		portfolioClass: '',
		geography: '',
		currency: '',
		weight: '5',
		weightType: '%',
	 },
	 {
		id: 'SAPRESTATE',
		name: 'World Real Estate',
		asset: '',
		portfolioClass: '',
		geography: '',
		currency: '',
		weight: '5',
		weightType: '%',
	 },
	 {
		id: 'SAPCOM',
		name: 'World Commodities',
		asset: '',
		portfolioClass: '',
		geography: '',
		currency: '',
		weight: '5',
		weightType: '%',
	 },
	 {
		id: 'SAPGLHF',
		name: 'World Hedge Funds',
		asset: '',
		portfolioClass: '',
		geography: '',
		currency: '',
		weight: '5',
		weightType: '%',
	 },
	 {
		id: 'SAPINFR',
		name: 'World Infrastructure',
		asset: '',
		portfolioClass: '',
		geography: '',
		currency: '',
		weight: '5',
		weightType: '%',
	 },
];

export const portfoliosListData = [
  {
    id: '01',
    name: 'Policy Portfolio',
    assetCount: 4,
  },
  {
    id: '02',
    name: 'Model SSA',
    assetCount: 20,
  },
  {
    id: '03',
    name: 'Model SSA 2',
    assetCount: 37,
  },
  {
    id: '04',
    name: 'Model SSA 3',
    assetCount: 40,
  },
]