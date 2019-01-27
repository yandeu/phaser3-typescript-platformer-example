import { Map } from '../components/map'
import TilesGroup from '../components/tiles/tilesGroup'
import Player from '../components/player'
import CoinGroup from '../components/coins/coinGroup'
import BeeSprite from '../components/enemies/bee'
import EnemiesGroup from '../components/enemies/enemiesGroup'
import GoalSprite from '../components/goalSprite'
import Controls from '../components/controls/controls'
import LevelText from '../components/levelText'
import Background from '../components/background'

export default class MainScene extends Phaser.Scene {
  player: Player
  tilesGroup: TilesGroup
  cursors: Phaser.Input.Keyboard.CursorKeys
  background: Background
  enemiesGroup: EnemiesGroup
  controls: Controls
  goal: GoalSprite
  level: number
  miniMap: Phaser.Cameras.Scene2D.BaseCamera
  constructor() {
    super({ key: 'MainScene' })
  }

  init(props: { level?: number }) {
    const { level = 0 } = props
    this.level = Map.calcCurrentLevel(level)
  }

  create() {
    const map = new Map(this.level)

    this.cameras.main.setBackgroundColor('#ade6ff')
    this.cameras.main.fadeIn()

    this.cameras.main.setBounds(map.size.x, map.size.y, map.size.width, map.size.height)
    this.physics.world.setBounds(map.size.x, map.size.y, map.size.width, map.size.height)

    this.input.addPointer(1)
    this.cursors = this.input.keyboard.createCursorKeys()

    this.background = new Background(this)
    this.tilesGroup = new TilesGroup(this, map.info.filter((el: TilesConfig) => el.type === 'tile'))
    this.goal = new GoalSprite(this, map.info.filter((el: TilesConfig) => el.type === 'goal')[0])
    this.player = new Player(this, map.info.filter((el: TilesConfig) => el.type === 'player')[0], map.size)
    this.enemiesGroup = new EnemiesGroup(this, map.info)
    const coinGroup = new CoinGroup(this, map.info.filter((el: TilesConfig) => el.type === 'coin'))
    this.controls = new Controls(this)
    const levelText = new LevelText(this, this.level)

    this.cameras.main.startFollow(this.player)

    this.physics.add.collider(this.tilesGroup, this.player)
    this.physics.add.collider(this.tilesGroup, this.enemiesGroup)
    // @ts-ignore
    this.physics.add.overlap(this.player, this.enemiesGroup, (player: Player, enemy: BeeSprite) => {
      if (enemy.dead) return
      if (enemy.body.touching.up && player.body.touching.down) {
        player.killEnemy()
        enemy.kill()
      } else {
        player.kill()
      }
    })
    //@ts-ignore
    this.physics.add.overlap(this.player, coinGroup, (player, coin) => coin.collect())
    //@ts-ignore
    this.physics.add.overlap(this.player, this.goal, (player: Player, goal: GoalSprite) => {
      player.halt()
      goal.nextLevel(this, this.level)
    })

    //  minimap
    this.miniMap = this.cameras
      .add(10, 10, Math.min(map.size.width / 8, (map.size.height / 8) * 2.5), map.size.height / 8)
      .setZoom(1 / 8)
      .setName('mini')
      .setBounds(map.size.x, map.size.y, map.size.width, map.size.height)
      .setBackgroundColor(0x81bdd2ff)
      .ignore(this.background)
      .ignore(levelText)
      .ignore(this.controls.buttons[0])
      .ignore(this.controls.buttons[1])
      .ignore(this.controls.buttons[2])
      .setAlpha(0.75)
    this.miniMap.scrollX = this.player.x
    this.miniMap.scrollY = this.player.y
  }

  update() {
    // parallax background
    this.background.parallax(this.player)

    // the the pointers
    this.controls.update()

    this.enemiesGroup.update()

    // update miniMap
    this.miniMap.scrollX = this.player.x
    this.miniMap.scrollY = this.player.y

    // if player dies
    this.player.update(this.cursors, this.controls)
  }
}
