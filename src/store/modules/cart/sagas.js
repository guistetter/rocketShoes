// (function*) é um generator é um async await mais potente
//yield é com o await, call é como se fosse api.get(), put disparaca acao
// all sao listeners ficam ouvindo qdo action é disparada para disparar uma acao takelestes metodo para ouvir action..
import { call, put, all, takeLatest } from "redux-saga/effects";
import api from "../../../services/api";
import { addToCartSuccess } from "./actions";
function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);
  yield put(addToCartSuccess(response.data));
}
//takelatest primeiro parametro acao do redux e depois qual func dispaprar
export default all([takeLatest("@cart/ADD_REQUEST", addToCart)]);
