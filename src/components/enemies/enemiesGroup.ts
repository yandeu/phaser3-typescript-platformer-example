import BeeSprite from './bee'
import SlimeSprite from './slime'
import EnemyClass from './enemyClass'

export default class EnemiesGroup extends Phaser.GameObjects.Group {
  tiles: TilesConfig[]
  TILE_SIZE = 96
  constructor(scene: Phaser.Scene, tilesConfig: TilesConfig[]) {
    super(scene)

    this.tiles = tilesConfig.filter(tile => tile.type === 'tile')
    let enemyTypes = tilesConfig.filter(tile => tile.type === 'enemy')

    let enemies: Array<BeeSprite | SlimeSprite> = []
    enemyTypes.forEach(enemy => {
      switch (enemy.texture) {
        case 'bee':
          enemies.push(new BeeSprite(scene, enemy.x, enemy.y))
          break
        case 'slime':
          enemies.push(new SlimeSprite(scene, enemy.x, enemy.y))
          break
      }
    })
    this.addMultiple(enemies)
  }

  update() {
    // check if the enemy should change its direction
    // @ts-ignore
    this.children.iterate((enemy: BeeSprite | SlimeSprite) => {
      if (enemy.dead) return

      let enemyIsMovingRight = enemy.body.velocity.x >= 0

      let hasGroundDetection = this.tiles.filter(tile => {
        let enemyPositionX = enemyIsMovingRight ? enemy.body.right : enemy.body.left
        let x = enemyPositionX + 32 > tile.x && enemyPositionX - 32 < tile.x + this.TILE_SIZE
        let y =
          enemy.body.bottom + this.TILE_SIZE / 2 > tile.y &&
          enemy.body.bottom + this.TILE_SIZE / 2 < tile.y + this.TILE_SIZE
        return x && y
      })

      if (hasGroundDetection.length === 0) {
        //@ts-ignore
        enemy.body.setVelocityX(enemy.body.velocity.x * -1)
        enemy.setFlipX(!enemyIsMovingRight)
      }
    }, null)
  }
}
