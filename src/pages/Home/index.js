import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MdShoppingCart } from "react-icons/md";
import { ProductList } from "./styles";
import api from "../../services/api";
import { formatPrice } from "../../utils/format";
import * as CartActions from "../../store/modules/cart/actions";
class Home extends Component {
  state = {
    products: [],
  };
  async componentDidMount() {
    const response = await api.get("products");
    const data = response.data.map((product) => ({
      //metodo utilizado para formatar preco, poderia ter aplicado apenas: "{formatPrice(product.price)}", sim mas fazer isso dentro do return teria o problema de exectuar este metodo varias vezes.. fazendo no render formatamos o preco apenas uma unica vez, qdo ele é montado! melhor performance do <codigo className=""></codigo>
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    this.setState({ products: data });
  }
  handleAddProduct = (id) => {
    const { /*dispatch*/ addToCartRequest } = this.props;
    //dispatch(CartActions.addToCart(product));
    addToCartRequest(id);
  };
  render() {
    const { products } = this.state;
    const { amount } = this.props;
    return (
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button
              type="button"
              onClick={() => this.handleAddProduct(product.id)}
            >
              <div>
                <MdShoppingCart size={18} color="#FFF" />{" "}
                {amount[product.id] || 0}
              </div>
              <span>Adicionar ao carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}
const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
