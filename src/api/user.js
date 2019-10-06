import {
    get
} from './request';
import Url from './urls';

const getRandomUserInformation = () =>
    get({ url: Url.getRandomUserInformation })
        .then(({ results }) => results);

export default {
    getRandomUserInformation
};
