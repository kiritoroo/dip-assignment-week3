export default class BarToggle {
  public fx: number;
  public fy: number;
  public lx: number;
  public ly: number;
  public size: number;
  public name: string;
  public isOn: boolean;
  private fillColor: string;
  constructor(fx: number, fy: number,lx: number, ly: number, name='', isOn: boolean, size=5) {
    this.fx = fx;
    this.fy = fy;
    this.lx = lx;
    this.ly = ly;
    this.size = size;
    this.name = name;
    this.isOn = isOn;
    this.fillColor = '#93CEFF'
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.isOn) {
      ctx.globalAlpha = 1;
    }
    else {
      ctx.globalAlpha = 0.5;
    }
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#93CEFF';
    ctx.beginPath();
    ctx.moveTo(this.fx+5, this.fy);
    ctx.lineTo(this.lx-5, this.ly);
    ctx.stroke();
    ctx.closePath();
    ctx.globalAlpha = 1;
  }

  public drawState(ctx: CanvasRenderingContext2D): void {

  }

  public drawInfo(ctx: CanvasRenderingContext2D): void {
    ctx.font = '10px Arial';
    ctx.fillStyle = '#fff';
    const text1 = this.name;
    const textWidth1 = ctx.measureText(text1).width;
    ctx.fillText(text1, this.fx-10, this.fy + textWidth1/2);
  }
}