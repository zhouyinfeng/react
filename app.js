import React from 'react';
import { render } from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
const history = useRouterHistory(createHashHistory)({queryKey: false})

const rootRoute = {
    component: '',
    childRoutes: [{
        path: '/',
        component: require('./modules/main/index'),
        indexRoute: [{
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('./modules/home/index'))
                })
            }
        }],
        childRoutes: [
            { path: '/home',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./modules/home/index'))
                    })
                }
            },
            { path: '/table',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./modules/table/index'))
                    })
                }
            },
            { path: '/tableComponent',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./modules/tableComponent/index'))
                    })
                }
            }
        ]
    }]
};
render(<Router history={history} routes={rootRoute}/>, document.getElementById('content'));