import ControlsSprite from './controlsSprite'

export default class Controls {
  leftIsDown: boolean
  rightIsDown: boolean
  upIsDown: boolean
  buttons: { [key: string]: ControlsSprite } = {}

  private _width = 192
  private _height = 192
  private _scene: Phaser.Scene
  private _config: { type: string; rotation: number }[]

  constructor(scene: Phaser.Scene) {
    this._scene = scene

    this._config = [
      {
        type: 'left',
        rotation: 1.5 * Math.PI
      },
      {
        type: 'right',
        rotation: 0.5 * Math.PI
      },
      {
        type: 'up',
        rotation: 0
      }
    ]
    this._config.forEach(el => {
      this.buttons[el.type] = new ControlsSprite(scene, 0, 0, el)
    })
  }

  adjustPositions() {
    let width = this._scene.cameras.main.width
    let height = this._scene.cameras.main.height
    this.buttons.left.x = 130
    this.buttons.left.y = height - 130
    this.buttons.right.x = 130 * 3
    this.buttons.right.y = height - 130
    this.buttons.up.x = width - 130
    this.buttons.up.y = height - 130
  }

  update() {
    this.leftIsDown = false
    this.rightIsDown = false
    this.upIsDown = false

    let pointers = [this._scene.input.pointer1, this._scene.input.pointer2]
    let buttons = [this.buttons.left, this.buttons.right, this.buttons.up]

    // check which pointer pressed which button
    pointers.forEach(pointer => {
      if (pointer.isDown) {
        console.log(pointer.x, pointer.y)
        let hit = buttons.filter(btn => {
          let x = btn.x - this._width / 2 < pointer.x && btn.x + this._width / 2 > pointer.x
          let y = btn.y - this._height / 2 < pointer.y && btn.y + this._height / 2 > pointer.y
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
