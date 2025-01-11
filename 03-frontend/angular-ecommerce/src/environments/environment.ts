import {clientId, domain} from '../../auth_angular.json';

export const environment = {
    production: false,
    auth :{
        domain: domain,
        clientId: clientId,
        redirectUri: window.location.origin
    }
}

