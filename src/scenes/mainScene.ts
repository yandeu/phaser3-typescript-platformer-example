import { Map } from '../components/map'
import TilesGroup from '../components/tiles/tilesGroup'
import Player from '../components/player/player'
import CoinGroup from '../components/coins/coinGroup'
import BeeSprite from '../components/enemies/bee'
import EnemiesGroup from '../components/enemies/enemiesGroup'
import GoalSprite from '../components/goalSprite'
import Controls from '../components/controls/controls'
import LevelText from '../components/levelText'
import Background from '../components/background'
import MiniMap from '../components/miniMap'
import PhaserVersionText from '../components/phaserVersionText'

export default class MainScene extends Phaser.Scene {
  player: Player
  tilesGroup: TilesGroup
  cursors: Phaser.Input.Keyboard.CursorKeys
  background: Background
  enemiesGroup: EnemiesGroup
  controls: Controls
  goal: GoalSprite
  level: number
  miniMap: MiniMap
  constructor() {
    super({
      key: 'MainScene'
    })
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
    this.player = new Player(this, map.info.filter((el: TilesConfig) => el.type === 'player')[0], map.size, this.level)
    this.enemiesGroup = new EnemiesGroup(this, map.info)
    const coinGroup = new CoinGroup(this, map.info.filter((el: TilesConfig) => el.type === 'coin'))
    this.controls = new Controls(this)
    const levelText = new LevelText(this, this.level)
    const phaserVersion = new PhaserVersionText(this, 0, 0, `Phaser v${Phaser.VERSION}`)

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

    this.miniMap = new MiniMap(
      this,
      10,
      10,
      Math.min(map.size.width / 8, (map.size.height / 8) * 2.5),
      map.size.height / 8,
      map
    )
    this.miniMap.setIgnore([
      this.background,
      levelText,
      this.controls.buttons.up,
      this.controls.buttons.left,
      this.controls.buttons.right,
      phaserVersion
    ])
    this.miniMap.update(this.player)

    // remove the loading screen
    let loadingScreen = document.getElementById('loading-screen')
    if (loadingScreen) {
      loadingScreen.classList.add('transparent')
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          // @ts-ignore
          loadingScreen.remove()
        }
      })
    }

    // the resize function
    const resize = () => {
      this.controls.adjustPositions()
      phaserVersion.x = this.cameras.main.width - 15
      phaserVersion.y = 15
      this.background.adjustPosition()
      levelText.adjustPosition()
    }

    this.scale.on('resize', (gameSize: any) => {
      this.cameras.main.width = gameSize.width
      this.cameras.main.height = gameSize.height
      //this.cameras.resize(gameSize.width, gameSize.height)
      resize()
    })
    resize()
  }

  update() {
    this.background.parallax()
    this.controls.update()
    this.enemiesGroup.update()
    this.player.update(this.cursors, this.controls)
    this.miniMap.update(this.player)
  }
}
