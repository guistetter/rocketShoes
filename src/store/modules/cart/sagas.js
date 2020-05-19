// (function*) é um generator é um async await mais potente
//yield é com o await, call é como se fosse api.get(), put disparaca acao
// all sao listeners ficam ouvindo qdo action é disparada para disparar uma acao takelestes metodo para ouvir action..
//select acessa informacao dentro do estado

import { call, put, all, takeLatest, select } from "redux-saga/effects";
import api from "../../../services/api";
import { formatPrice } from "../../../utils/format";
import { addToCartSuccess, updateAmount } from "./actions";

function* addToCart({ id }) {
  const productExists = yield select((state) =>
    state.cart.find((p) => p.id === id)
  );
  if (productExists) {
    const amount = productExists.amount + 1;
    yield put(updateAmount(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCartSuccess(data));
  }
}
//takelatest primeiro parametro acao do redux e depois qual func dispaprar
export default all([takeLatest("@cart/ADD_REQUEST", addToCart)]);
