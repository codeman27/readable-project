import React, { Component } from 'react'
import addPostImg from '../Images/AddSymbol.svg'
import { Link } from 'react-router-dom'

class Categories extends Component {
  state = {
    navSelected: 'All'
  }

  setActiveNav(value) {
    this.setState({navSelected: value})
    this.props.onChangeHeader(value);
  }

  isNavActive(value) {
    return 'btn btn-primary ' + (value === this.state.navSelected ? 'active' : 'default')
  }

  componentDidMount(){
    this.setState({navSelected: this.props.header})
  }

  render() {
    return (
      <div>
        <div className="col-xs-3 pull-right">
          <div className="row">
            <div className="col-xs-12">
              <h3>Categories</h3>
              <ul className="nav nav-pills nav-stacked">
                <li><Link to="/" className={this.isNavActive('Readables!')} onClick={() => { this.setActiveNav('Readables!') }}>All</Link></li>
                {this.props.categories.map((category) => {
                  let uppercaseName = category.name.charAt(0).toUpperCase() + category.name.slice(1)
                  return(
                    <li key={category.name}><Link to={`/${uppercaseName}`} className={this.isNavActive(uppercaseName)} onClick={() => { this.setActiveNav(uppercaseName) }}>{uppercaseName}</Link></li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        <Link to="/add/new/post"><img alt="A plus sign to add a post" className="addpost-img" src={addPostImg}/></Link>
      </div>
    )
  }
}

export default Categories
