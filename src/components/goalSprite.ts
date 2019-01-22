export default class GoalSprite extends Phaser.Physics.Arcade.Sprite {
  private _loadNextLevel: boolean = false
  constructor(scene: Phaser.Scene, tilesConfig: TilesConfig) {
    super(scene, tilesConfig.x, tilesConfig.y + 14, 'goal')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setImmovable(true)
    // @ts-ignore
    this.body.setAllowGravity(false)
    this.setOrigin(0, 0.5)
  }

  get loadNextLevel() {
    return this._loadNextLevel
  }

  nextLevel(scene: Phaser.Scene, level: number) {
    if (this._loadNextLevel) return
    this._loadNextLevel = true

    scene.cameras.main.fadeOut()
    scene.time.addEvent({
      delay: 2000,
      callback: () => {
        scene.scene.restart({ level: level += 1 })
      }
    })
  }
}
