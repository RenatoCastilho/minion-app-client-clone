import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import Minion from "../components/Minion"

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      pedidos: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  
    try {
      const pedidos = await this.pedidos();
      this.setState({ pedidos });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  pedidos() {
    return API.get("pedidos", "/pedidos");
  }
  

  renderPedidosList(pedidos) {
    return [{}].concat(pedidos).map(
      (pedido, i) =>
        i !== 0
          ? <LinkContainer
              key={pedido.minionId}
              to={`/pedidos/${pedido.minionId}`}
            >
              <ListGroupItem header={pedido.content.trim().split("\n")[0]}>
                {"Criado: " + new Date(pedido.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <div>
            <Minion/>
            <LinkContainer
              key="new"
              to="/pedidos/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Fazer novo pedido
                </h4>
              </ListGroupItem>
            </LinkContainer>
          </div>
            
    );
  }
  

  renderLander() {
    return (
      <div className="lander">
          <h1>Minion Store</h1>
          <p>Minions ipsum wiiiii irure aliqua. Pepete esse dolore para tú baboiii.</p>
          <p>Faça login para fazer pedidos.</p>
      </div>
    );
  }

  renderPedidos() {
    return (
      <div className="pedidos">
        <PageHeader>Seus Pedidos</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderPedidosList(this.state.pedidos)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderPedidos() : this.renderLander()}
      </div>
    );
  }
}
