export default class ControlsSprite extends Phaser.GameObjects.Sprite {
  private _pressed: boolean = false
  private _type: string

  constructor(scene: Phaser.Scene, x: number, y: number, config: any) {
    super(scene, y, x, 'controls')
    scene.add.existing(this)

    this._type = config.type

    this.setX(x)
      .setY(y)
      .setAlpha(0.25)
      .setRotation(config.rotation)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => (this._pressed = true))
      .on('pointerup', () => (this._pressed = false))
      .on('pointerout', () => (this._pressed = false))
  }

  get pressed() {
    return this._pressed
  }

  get type() {
    return this._type
  }
}
