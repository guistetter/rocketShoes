import React, { Component } from "react";
import { MdShoppingCart } from "react-icons/md";
import { ProductList } from "./styles";
import api from "../../services/api";
import { formatPrice } from "../../utils/format";
export default class Home extends Component {
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
  render() {
    const { products } = this.state;
    return (
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strog>{product.title}</strog>
            <span>{product.priceFormatted}</span>
            <button type="button">
              <div>
                <MdShoppingCart size={18} color="#FFF" /> 3
              </div>
              <span>Adicionar ao carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}
