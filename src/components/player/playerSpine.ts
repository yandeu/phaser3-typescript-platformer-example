import Player from './player'

// @ts-ignore
export default class spine {
  spine: any

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    spine: string = 'boy',
    animation: string = 'idle',
    play: boolean = true
  ) {
    // @ts-ignore
    this.spine = scene.add.spine(650, 300, spine, animation, play)
    this.spine.customParams = {
      animation: 'idle',
      goesRight: true,
      isKilling: false
    }
    this.spine.play(this.spine.customParams.animation, true)
    this.spine.setMix('run', 'idle', 0.3)
    this.spine.setMix('idle', 'run', 0.3)
    this.spine.setMix('jump', 'run', 0.2)
    this.spine.setMix('run', 'jump', 0.3)
    this.spine.setMix('idle', 'jump', 0.3)
    this.spine.setMix('jump', 'idle', 0.2)
    this.spine.setMix('jump', 'kill', 0.2)
    this.spine.setMix('kill', 'idle', 0.2)
    this.setSkin('blue')
  }

  setSkin(newSkin: string) {
    this.spine.setSkin(null)
    this.spine.setSkinByName(newSkin)
  }

  move(player: Player) {
    // the code below could be prettier :/

    if (!player || !player.body) return
    this.spine.x = player.body.center.x
    this.spine.y = player.body.bottom + 8

    const anim = this.spine.customParams.animation

    if (player.body.blocked.down) {
      this.spine.customParams.isKilling = false

      if (Math.abs(player.body.velocity.x) >= 10) {
        if (anim !== 'run') {
          this.spine.customParams.animation = 'run'
          this.spine.play('run', true)
        }
      } else {
        if (anim !== 'idle') {
          this.spine.customParams.animation = 'idle'
          this.spine.play('idle', true)
        }
      }
    } else {
      if (!this.spine.customParams.isKilling && anim !== 'jump') {
        this.spine.customParams.animation = 'jump'
        this.spine.play('jump')
      }
      if (this.spine.customParams.isKilling && anim !== 'kill') {
        this.spine.customParams.animation = 'kill'
        this.spine.play('kill')
      }
    }

    // spine flip
    if (player.flipX && this.spine.customParams.goesRight) {
      this.spine.customParams.goesRight = false
      this.spine.flipX = true
    } else if (!player.flipX && !this.spine.customParams.goesRight) {
      this.spine.customParams.goesRight = true
      this.spine.flipX = false
    }
  }
}
