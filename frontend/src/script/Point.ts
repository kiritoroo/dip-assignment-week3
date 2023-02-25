export default class Point {
  public x: number;
  public y: number;
  public size: number;
  public name: string;
  private fillColor: string;
  constructor(x: number, y: number,name='', size=6) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.name = name;
    this.fillColor = '#93CEFF'
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI, false);
    ctx.lineWidth = this.size/2;
    ctx.strokeStyle = '#93CEFF'
    ctx.stroke();
    ctx.closePath();

    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size-2, 0, 2 * Math.PI);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1;
  }

  public drawInfo(ctx: CanvasRenderingContext2D): void {
    ctx.font = '8px Arial';
    ctx.fillStyle = '#fff';
    const text2 = this.name;
    const textWidth2 = ctx.measureText(text2).width;
    ctx.fillText(text2, this.x -(textWidth2/2), this.y+20);
  }

  public drawCoord(ctx: CanvasRenderingContext2D, showY=true, offset=-10): void {
    ctx.font = '10px Arial';
    ctx.fillStyle = '#fff';
    let text1
    if (showY) {
      text1 = `(${this.x}, ${this.y})`
    } else {
      text1= `${this.x}`
    }
    const textWidth1 = ctx.measureText(text1).width;
    ctx.fillText(text1, this.x -(textWidth1/2), this.y+offset);
  }

  public move(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}