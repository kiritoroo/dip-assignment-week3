export default class BarSlide {
  public fx: number;
  public fy: number;
  public lx: number;
  public ly: number;
  public size: number;
  public name: string;
  private fillColor: string;
  constructor(fx: number, fy: number,lx: number, ly: number, name='', size=5) {
    this.fx = fx;
    this.fy = fy;
    this.lx = lx;
    this.ly = ly;
    this.size = size;
    this.name = name;
    this.fillColor = '#93CEFF'
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(this.fx, this.fy, this.size, 0, 2*Math.PI, false);
    ctx.lineWidth = this.size/2;
    ctx.strokeStyle = '#93CEFF'
    ctx.stroke();
    ctx.closePath();

    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(this.fx, this.fy, this.size-2, 0, 2 * Math.PI);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1;

    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(this.lx, this.ly, this.size, 0, 2*Math.PI, false);
    ctx.lineWidth = this.size/2;
    ctx.strokeStyle = '#93CEFF'
    ctx.stroke();
    ctx.closePath();

    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(this.lx, this.ly, this.size-2, 0, 2 * Math.PI);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1;

    ctx.globalAlpha = 0.8;
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#93CEFF';
    ctx.beginPath();
    ctx.moveTo(this.fx+5, this.fy);
    ctx.lineTo(this.lx-5, this.ly);
    ctx.stroke();
    ctx.closePath();
    ctx.globalAlpha = 1;
  }

  public drawCoord(ctx: CanvasRenderingContext2D): void {
    ctx.font = '10px Arial';
    ctx.fillStyle = '#fff';
    const text1 = `${this.fy}`
    const textWidth1 = ctx.measureText(text1).width;
    ctx.fillText(text1, (this.lx-((this.lx-this.fx)/2)) - (textWidth1/2), this.fy + 15);
  }

  public move({fx=this.fx, fy=this.fy, lx=this.lx, ly=this.ly}): void {
    this.fx = fx;
    this.fy = fy;
    this.lx = lx;
    this.ly = ly;
  }
}