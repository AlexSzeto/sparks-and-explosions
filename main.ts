controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    effects.startExplosiveEffectAtPosition(effects.createPresetEffectData(PresetColor.fire, PresetShape.spark), 75, 55, 100)
})
let mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
