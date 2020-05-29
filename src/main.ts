
import './style.css'

//@ts-ignore
import P5 from 'p5'
import Matrix from "./App/Matrix"

//@ts-ignore
import blue from "./images/nucleotide_bleu.png"
//@ts-ignore
import red from "./images/nucleotide_rouge.png"
//@ts-ignore
import yellow from "./images/nucleotide_jaune.png"
//@ts-ignore
import green from "./images/nucleotide_verte.png"

function sketch( p:P5 ){

  let matrix:Matrix = null
  let images:{[name:string]:P5.Image} = null

  p.preload = () => {
    images = {
      blue: p.loadImage(blue),
      red: p.loadImage(red),
      yellow: p.loadImage(yellow),
      green: p.loadImage(green),
    }
  }

  p.setup = () => {
    for(const name in images)
      images[name].resize(75,75)
    p.createCanvas( 480, 480 )
    matrix = new Matrix(
      /* p5 instance */
      p,
      images,
      /* nbr columns */
      6,
      /* nbr rows */
      5,
      /* hexagon radius */
      50,
      /* flat topped */
      true
    )
  }

  p.draw = () => {
    p.background(30);
    matrix.draw(
      /* debug ? */
      false
    )
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new P5(sketch,document.getElementById('p5'))
})




