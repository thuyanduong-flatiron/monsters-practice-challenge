class Monster{
  constructor(name, age, description){
    this.name = name
    this.age = age
    this.description = description
  }

  render(){
      let div = document.createElement('div')
      let h2 = document.createElement('h2')
      let h4 = document.createElement('h4')
      let p = document.createElement('p')
      h2.innerHTML = `${this.name}`
      h4.innerHTML = `Age: ${this.age}`
      p.innerHTML = `Bio: ${this.description}`
      div.appendChild(h2)
      div.appendChild(h4)
      div.appendChild(p)
      document.querySelector('#monster-container').appendChild(div)
  }
}
