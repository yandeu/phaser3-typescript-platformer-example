import ControlsSprite from './controlsSprite'

export default class Controls {
  leftIsDown: boolean
  rightIsDown: boolean
  upIsDown: boolean
  buttons: ControlsSprite[] = []

  private _width = 192
  private _height = 192
  private _scene: Phaser.Scene
  private _config: { type: string; x: number; y: number; rotation: number }[]

  constructor(scene: Phaser.Scene) {
    this._scene = scene

    const y = scene.cameras.main.height - 106

    this._config = [
      {
        type: 'left',
        x: 106,
        y,
        rotation: 1.5 * Math.PI
      },
      {
        type: 'right',
        x: 328,
        y,
        rotation: 0.5 * Math.PI
      },
      {
        type: 'up',
        x: scene.cameras.main.width - 106,
        y,
        rotation: 0
      }
    ]

    this._config.map(el => new ControlsSprite(scene, el.x, el.y, el)).forEach(button => this.buttons.push(button))
  }

  update() {
    this.leftIsDown = false
    this.rightIsDown = false
    this.upIsDown = false

    let pointers = [this._scene.input.pointer1, this._scene.input.pointer2]

    // check which pointer pressed which button
    pointers.forEach(pointer => {
      if (pointer.isDown) {
        let hit = this._config.filter(btn => {
          let x = btn.x - this._width / 2 < pointer.x && btn.x + this._width / 2 > pointer.x
          let y = btn.y - this._width / 2 < pointer.y && btn.y + this._height / 2 > pointer.y
          return x && y
        })
        if (hit.length === 1) {
          switch (hit[0].type) {
            case 'left':
              this.leftIsDown = true
              break
            case 'right':
              this.rightIsDown = true
              break
            case 'up':
              this.upIsDown = true
              break
          }
        }
      }
    })
  }
}
