import Player from './player'

export default class PlayerSpine {
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
    this.spine = scene.add.spine(x, y, spine, animation, play)
    this.spine.customParams = {
      animation,
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

  getAttachments() {
    return this.spine.skeleton.skin.attachments
  }

  getSlots() {
    return this.spine.skeleton.slots
  }

  setAttachment(slotName: string, attachmentName: string) {
    this.spine.skeleton.setAttachment(slotName, attachmentName)
  }

  setSkin(newSkin: string) {
    this.spine.setSkin(null)
    this.spine.setSkinByName(newSkin)
  }

  setAnimation(animation: string, loop: boolean = false) {
    if (this.spine.customParams.animation !== animation) {
      this.spine.customParams.animation = animation
      this.spine.play(animation, loop)
    }
  }

  update(player: Player) {
    if (!player || !player.body) return

    // spine position
    this.spine.x = player.body.center.x
    this.spine.y = player.body.bottom + 8

    // spine animation
    if (player.body.blocked.down) {
      this.spine.customParams.isKilling = false
      const animation = Math.abs(player.body.velocity.x) >= 10 ? 'run' : 'idle'
      this.setAnimation(animation, true)
    }
    if (!player.body.blocked.down) {
      const animation = this.spine.customParams.isKilling ? 'kill' : 'jump'
      this.setAnimation(animation)
    }

    // spine flip
    if (player.flipX !== this.spine.flipX) this.spine.flipX = player.flipX
  }
}
