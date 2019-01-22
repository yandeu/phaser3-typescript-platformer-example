import CoinSingle from './coinSingle'

export default class CoinGroup extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene, tiles: TilesConfig[]) {
    super(scene)

    tiles.forEach(tile => {
      this.add(new CoinSingle(scene, tile))
    })
  }
}
