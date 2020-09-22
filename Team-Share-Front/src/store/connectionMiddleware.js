import axios from 'axios';

import { DO_SUBSCRIBE, DO_CONNECT, DO_DISCONNECT, changeToken, giveProfileInfos } from 'src/store/reducer';

const connectionMiddleware = store => next => (action) => {
    const state = store.getState();
    const baseUrl = "http://95.142.160.243/team-share-back/public";
    const headers = {
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json',
        'Postman-Token': 'f0d22539-4c31-4dc9-a6ca-b513778e229e,59c924e4-c4a5-4def-927c-e4281aa091a1',
        'cache-control': 'no-cache',
    };

    switch (action.type) {
        case DO_SUBSCRIBE:
            const dataSubs = {
                mail: state.email,
                password: state.password,
                phone: state.phoneNumber,
            }
            headers,
                console.log(dataSubs);
            axios.post(`${baseUrl}/user/register`, dataSubs, headers)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            break;
        case DO_CONNECT:
            const dataConnect = {
                username: state.email,
                password: state.password,
            }
            headers,
                console.log(dataConnect);
            axios.post(`${baseUrl}/login`, dataConnect, headers)
                .then((response) => {
                    console.log(response);
                    let token = response.data.token;
                    console.log(token);
                    store.dispatch(changeToken(token));

                    const params = {
                        token,
                    }
                    console.log(params);

                    axios.post(`${baseUrl}/user/myprofile`, params)
                        .then((response) => {
                            const persoInfos = response.data[0];
                            console.log(persoInfos);
                            store.dispatch(giveProfileInfos(persoInfos));
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
            break;
        case DO_DISCONNECT:
            const dataDc = {
                token: state.token,
            }
            headers,
                axios.post(`${baseUrl}/logout`, dataDc, headers)
                    .then((response) => {
                        console.log(response);
                        store.dispatch(changeToken(''));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            break;
        default:
            next(action);
    }
};

export default connectionMiddleware;