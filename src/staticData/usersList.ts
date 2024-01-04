export const userStatus = [
    'unverified', 'active', 'inactive', 'suspend'
]
export const subscriptionTypes = [
    'Private', 'Enterprise', 'Subscriptions', 'Public'
]
export const userRoles = [
    {
        id: 1,
        role: 'super_admin',
    },
    {
        id: 2,
        role: 'client_admin',
    },
    {
        id: 3,
        role: 'client_user',
    }
]

export const companyData = [
    {
        id: 1,
        name: 'Sapiat',
        country: '228',
        email: 'contact@sapiat.com',
        phone: '1234567809',
        logo: '',
    },
    {
        id: 2,
        name: 'FinTech Pro',
        country: '229',
        email: 'contact@fintechpro.com',
        phone: '1234567809',
        logo: '',
    },
    {
        id: 3,
        name: 'Bright Tech',
        country: '229',
        email: 'contact@brighttech.com',
        phone: '1234567809',
        logo: '',
    }
]

export const usersList = [
    {
        id: 1,
        username: 'superadmin',
        password: 'adminSap2021',
        firstName: 'Super',
        lastName: 'Admin',
        email: 'administrator@sapiat.com',
        status: userStatus[1],
        role: userRoles[0].role,
        company: companyData[0],
        code: '',
    },
    {
        id: 2,
        username: 'developer',
        password: 'test2021',
        firstName: 'Dev',
        lastName: 'Tester',
        email: 'developer@sapiat.com',
        status: userStatus[1],
        role: userRoles[2].role,
        company: companyData[0],
        code: 'sbmxwnbqgsewhsnmwkcqkdllidetfzhu',
    },
    {
        id: 3,
        username: 'fintechadmin',
        password: 'adminFin2021',
        firstName: 'Fintech',
        lastName: 'Admin',
        email: 'administrator@fintechpro.com',
        status: userStatus[1],
        role: userRoles[1].role,
        company: companyData[1],
        code: 'bhaewtpibkoqgafzzrlxyfkvtshpkaob',
    },
    {
        id: 4,
        username: 'johnsmith',
        password: 'johnFin2021',
        firstName: 'John',
        lastName: 'Smith',
        email: 'johnsmith@fintechpro.com',
        status: userStatus[1],
        role: userRoles[2].role,
        company: companyData[1],
        code: 'gfywekvgynbfgrsikbcdmlqjgddsgfeb',
    },
    {
        id: 5,
        username: 'willsmith',
        password: 'willFin2021',
        firstName: 'Will',
        lastName: 'Smith',
        email: 'willsmith@fintechpro.com',
        status: userStatus[1],
        role: userRoles[2].role,
        company: companyData[1],
        code: 'gfywekvgynbfgrsikbcdmlqjgddsgfeb',
    },
    {
        id: 6,
        username: 'christopher',
        password: 'chrisFin2021',
        firstName: 'Christopher',
        lastName: 'M',
        email: 'christopher@fintechpro.com',
        status: userStatus[1],
        role: userRoles[2].role,
        company: companyData[1],
        code: 'gfywekvgynbfgrsikbcdmlqjgddsgfeb',
    },
    {
        id: 7,
        username: 'Maria',
        password: 'mariaFin2021',
        firstName: 'Maria',
        lastName: 'Steevans',
        email: 'maria@fintechpro.com',
        status: userStatus[1],
        role: userRoles[2].role,
        company: companyData[1],
        code: 'gfywekvgynbfgrsikbcdmlqjgddsgfeb',
    },
]

export const terms = `SAPIAT Terms & Agreement: Sample Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap 
into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the 
release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software 
like Aldus PageMaker including versions of Lorem Ipsum.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,
making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites 
of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on
the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
comes from a line in section 1.10.32.
`;