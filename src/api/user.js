import {
    get
} from './request';
import Url from './urls';

const getRandomUserInformation = () =>
    get({ url: Url.getRandomUserInformation })
        .then(({ results }) => {
            const result = results[0];
            const { user } = result;
            return {
                fullName: `${user.name.first} ${user.name.last}`,
                password: user.password,
                phone: user.phone,
                dob: user.dob,
                avatar: user.picture,
                address: user.location.street
            };
        });

export default {
    getRandomUserInformation
};
