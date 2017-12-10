import { getData, postData, deleteData, putData } from '../../commons/api'

export default {
  getAllCategories: () => function () {
    return getData("/categories");
  }
};