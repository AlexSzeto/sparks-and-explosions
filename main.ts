let myEffect = effects.createCustomEffectData(
[
12,
11,
11,
13,
1
],
[
1,
1,
1,
2,
2,
4
],
effects.createPixelRange(0, 23),
effects.createPixelRange(scene.screenWidth(), scene.screenWidth()),
effects.createTimeRange(500, 1000)
)
let myAnchor = effects.startExplosiveEffectAtPosition(myEffect, scene.screenWidth() / 2, scene.screenHeight() / 2, 1000000)
