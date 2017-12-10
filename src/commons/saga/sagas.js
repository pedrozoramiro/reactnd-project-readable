import {all} from 'redux-saga/effects';

import postSaga from '../../post/postSaga';
import commentSaga from '../../post/comment/commentSaga';
import categorySaga from '../../post/category/categorySaga';

function* watchMany() {
  yield all([
    postSaga(),
    commentSaga(),
    categorySaga()
  ]);
}

export default watchMany;