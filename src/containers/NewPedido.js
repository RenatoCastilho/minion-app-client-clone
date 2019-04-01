import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import "./NewPedido.css";

export default class NewPedido extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      content: ""
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
  
    try {
      await this.sendEmail({
        email: "DummyEmail",
        name: "DummyName",
        content: this.state.content
      });
      await this.createPedido({
        content: this.state.content
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  
  createPedido(pedido) {
    return API.post("pedidos", "/pedidos", {
      body: pedido
    });
  }
  
  sendEmail(email){
    return API.post("pedidos", "/email/send", {
      body: JSON.stringify(email)
    });
  }

  render() {
    return (
      <div className="NewPedido">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Fazer pedido"
            loadingText="Realizando pedido…"
          />
        </form>
      </div>
    );
  }
}
