import httpApi from '../utils/httpApi';
import config from '../utils/config';
import logger from '../utils/logger';
import history from '../utils/screenVisibilityListener';

export default {
  namespace: 'enterprise',
  state: {
    list: [],
    noMoreData: false,
  },
  subscriptions: {
    setup({ dispatch }) {
      history.listen(screen => {
        if (screen === 'app.EnterprisePage') {
          dispatch({
            type: 'init',
          });
        }
      });
    },
  },
  effects: {
    *init({}, { select, put }) {
      const list = yield select(state => state.enterprise.list);

      if (list && list.length > 0) {
        return;
      }

      yield put({ type: 'refresh' });
    },
    *refresh({}, { call, put }) {
      const res = yield call(httpApi, config.api.companies, {
        params: {
          page: 1,
        },
      });

      yield put({
        type: 'refreshData',
        payload: {
          data: res.data,
        },
      });
    },
    *fetchList({ page, pageSize }, { call, put }) {
      const res = yield call(httpApi, config.api.companies, {
        params: {
          pageSize,
          page,
        },
      });

      if (res.data.length === 0) {
        // 已经没有数据了
        yield put({
          type: 'updateState',
          payload: {
            noMoreData: true,
          },
        });
      } else {
        yield put({
          type: 'mergeData',
          payload: {
            data: res.data,
          },
        });
      }
    },
  },
  reducers: {
    refreshData(state, { payload: { data: list } }) {
      return { ...state, noMoreData: false, list };
    },
    mergeData(state, { payload: { data: list } }) {
      return { ...state, list: state.list.concat(list) };
    },
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
