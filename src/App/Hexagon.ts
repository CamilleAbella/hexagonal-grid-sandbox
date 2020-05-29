import Matrix from "./Matrix"
//@ts-ignore
import p5 from "p5";

export default class Hexagon {

  public image:p5.Image

  constructor(
    public matrix:Matrix,
    public gridPosition:p5.Vector
  ) {
    this.image = Object.values(matrix.images)[
      Math.floor(Math.random() * Object.keys(matrix.images).length)
    ]
  }

  get p(): p5 {
    return this.matrix.p
  }

  get flatTopped(): boolean {
    return this.matrix.flatTopped
  }

  get radius(): number {
    return this.matrix.hexagonRadius
  }

  get width(): number {
    return !this.flatTopped ? this.p.sqrt(3) * this.radius : 2 * this.radius
  }

  get height(): number {
    return !this.flatTopped ? 2 * this.radius : this.p.sqrt(3) * this.radius
  }

  get dist(): p5.Vector {
    const
      width = this.width,
      height = this.height
    return this.p.createVector(
      this.flatTopped ? width * (3 / 4) : width,
      this.flatTopped ? height : height * (3 / 4)
    )
  }

  get x(): number {
    const width = this.width
    return this.flatTopped ?
      (width / 2 + this.gridPosition.x * this.dist.x) :
      (this.gridPosition.x * width - width / 2) +
      (this.gridPosition.y % 2 === 0 ? width / 2 : 0) + width
  }

  get y(): number {
    const height = this.height
    return this.flatTopped ?
      (this.gridPosition.y * height - height / 2) +
      (this.gridPosition.x % 2 === 0 ? height / 2 : 0) + height :
      (height / 2 + this.gridPosition.y * this.dist.y)
  }

  get screenPosition(): p5.Vector {
    return this.p.createVector(this.x, this.y)
  }

  getCornerPosition( i: number ) {
    const angle = this.p.radians(60 * i - (this.flatTopped ? 0 : 30))
    return this.p.createVector(
      this.x + this.radius * this.p.cos(angle),
      this.y + this.radius * this.p.sin(angle)
    )
  }

  draw( debug:boolean = false ) {
    const
      pos = this.screenPosition,
      width = this.width,
      height = this.height

    /* Mouse collision */
    const collision = this.p.dist(
      pos.x,pos.y,
      this.p.mouseX,this.p.mouseY
    ) < this.radius * 0.9

    if (!debug) {
      /* Draw image */
      this.p.push()
      this.p.translate(
        pos.x - (width * 1.2) * .5,
        pos.y - (height * 1.2) * .5
      )
      if(!this.flatTopped)
        this.p.rotate(this.p.radians(90))
      if(collision) this.p.tint(255)
      else this.p.tint(200)
      this.p.image(this.image,
        0, 0,
        width * 1.2,
        height * 1.2
      )
      this.p.pop()
    }

    else {
      /* Draw vectoriel hexagon */
      if(collision) this.p.fill(200)
      else this.p.fill(150)
      this.p.beginShape()
      for (let i = 0; i < 6; i++){
        const corner = this.getCornerPosition(i)
        this.p.vertex(corner.x,corner.y)
      }
      this.p.endShape(this.p.CLOSE)
    }

  }
}