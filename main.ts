controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let myEffect = 0
    effects.startExplosiveEffectAtPosition(effects.createPresetEffectData(PresetColor.fire, PresetShape.spark), 75, 55, 500)
})
