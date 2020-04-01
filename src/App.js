import React from "react";
import Api from "./Api/Api";
import "./App.css";
import Form from "./form";
import uniqid from "uniqid";

class App extends React.Component {
  state = { data: [], term: "" };

  onChangeItem = e => {
    this.setState({ term: e.target.value });
  };

  ontaskSubmit = async e => {
    e.preventDefault();
    if (this.state.term.length > 5) {
      try {
        // this.setState({ isDisabled: true, isLoading: true });
        const newItem = {
          id: uniqid(),
          name: this.state.term,
          avatar:
            "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU1MjQ5OTc4ODk1/chuck-norris-15720761-1-402.jpg"
        };
        const { data } = await Api.post("/products/", newItem);
        return this.setState({
          data: [...this.state.data, data],
          term: ""
          // isDisabled: false,
          // isLoading: false
        });
      } catch (err) {}
    } else {
      this.setState({ error: "you need at least 6 characters" });
    }
  };

  async componentDidMount() {
    const src = await Api.get("/products");
    const data = src.data;
    this.setState({ data: data });
    console.log(this.state.data);
  }
  updateproduct = async id => {
    const ud = [...this.state.data].filter(item => {
      return (item.name = this.state.term);
    });

    this.setState({ data: ud });
    this.setState({ term: "" });
  };
  delete = async id => {
    try {
      await Api.delete(`/products/${id}`);
      return this.setState({
        data: [...this.state.data].filter(el => el.id != id)
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { data, term } = this.state;
    return (
      <div className="fghj">
        {data.map(item => {
          console.log(item);
          return (
            <>
              <div>{item.name}</div>
              <div>
                <img src={item.avatar} alt={item.name} />
              </div>
              <button onClick={() => this.delete(item.id)}>DELETE</button>
              <button onClick={() => this.updateproduct(item.id)}>
                update
              </button>
            </>
          );
        })}
        preventDefault
        <Form
          onChange={this.onChangeItem}
          onSubmit={this.ontaskSubmit}
          value={this.state.term}
        />
      </div>
    );
  }
}

export default App;
