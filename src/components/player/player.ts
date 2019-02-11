import Controls from '../controls/controls'
import PlayerSpine from './playerSpine'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private _dead: boolean = false
  private _halt: boolean = false
  private mapSize: MapSize
  playerSpine: PlayerSpine

  constructor(scene: Phaser.Scene, player: TilesConfig, mapSize: MapSize, level: number) {
    super(scene, player.x, player.y, player.texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.scene = scene
    this.mapSize = mapSize

    // scene.anims.create({
    //   key: 'walk',
    //   frames: scene.anims.generateFrameNames('player'),
    //   frameRate: 8,
    //   repeat: -1
    // })
    // this.play('walk')

    this.setVisible(false)

    this.setOrigin(0, 1)
    this.setDragX(1500)
    this.body.setSize(70, 132)
    this.body.setOffset(25, 24)

    let theSkin = level % 2 == 0 ? 'blue' : 'green'
    this.playerSpine = new PlayerSpine(scene, this.body.center.x, this.body.bottom)
    this.playerSpine.setSkin(theSkin)
  }

  kill() {
    this._dead = true

    // animate the camera if the player dies
    this.scene.cameras.main.shake(500, 0.025)
    this.scene.time.addEvent({
      delay: 500,
      callback: () => this.scene.scene.restart()
    })
  }

  killEnemy() {
    this.playerSpine.spine.customParams.isKilling = true
    this.setVelocityY(-600)
  }

  halt() {
    this.body.enable = false
    this._halt = true
  }

  update(cursors: any, controls: Controls) {
    if (this._halt || this._dead) return

    // check if out of camera and kill
    if (this.body.right < this.mapSize.x || this.body.left > this.mapSize.width || this.body.top > this.mapSize.height)
      this.kill()

    // controls left & right
    if (cursors.left.isDown || controls.leftIsDown) {
      this.setVelocityX(-500)
      this.setFlipX(true)
    } else if (cursors.right.isDown || controls.rightIsDown) {
      this.setVelocityX(550)
      this.setFlipX(false)
    }
    // controls up
    if ((cursors.up.isDown || cursors.space.isDown || controls.upIsDown) && this.body.blocked.down) {
      this.setVelocityY(-1250)
    }

    // update spine animation
    this.playerSpine.update(this)
  }
}
