import { getData } from '../../commons/api'

export default {
  getAllCategories: () => function () {
    return getData("/categories");
  }
};