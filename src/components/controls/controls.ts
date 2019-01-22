import ControlsSprite from './controlsSprite'

export default class Controls {
  left: ControlsSprite
  right: ControlsSprite
  up: ControlsSprite

  constructor(scene: Phaser.Scene) {
    const y = scene.cameras.main.height - 106
    let config = [
      {
        type: 'left',
        x: 106,
        y,
        rotation: 1.5 * Math.PI
      },
      {
        type: 'right',
        x: 308,
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

    config
      .map(el => new ControlsSprite(scene, el.x, el.y, el))
      .forEach(button => {
        // @ts-ignore
        this[button.type] = button
      })

    return {
      left: this.left,
      right: this.right,
      up: this.up
    }
  }
}
