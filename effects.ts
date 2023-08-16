enum PresetColor {
    fire,
    ice,
    toxic,
    electric,
    poison,
    smoke,
}

enum PresetShape {
    spark,
    explosion,
    cloud,
}

/**
 * Provides a few extra effects based on particles exploding out of a center point
 */
namespace effects {
    export class NumberRange {
        constructor(
            public min: number,
            public max: number
        ) {
            if (min > max) {
                this.min = max
                this.max = min
            }
        }
    }

    /**
     * Create a range of time to randomly pick from
     */
    //% blockId="timeRangePicker"
    //% blockHidden=true
    //% block="between $min and $max ms"
    //% min.defl=200 max.defl=400
    //% min.shadow="timePicker" max.shadow="timePicker"
    export function createTimeRange(min: number, max: number): NumberRange {
        return new NumberRange(min, max)
    }

    /**
     * Create a range of pixels to randomly pick from
     */
    //% blockId="pixelRangePicker"
    //% blockHidden=true
    //% block="between $min and $max" px
    //% min.min=0 min.max=100 min.defl=0
    //% max.min=0 max.max=100 max.defl=20
    export function createPixelRange(min: number, max: number): NumberRange {
        return new NumberRange(min, max)
    }

    export class EffectData {
        constructor(
            public colorLUT: number[],
            public sizeLUT: number[],
            public spawn: NumberRange,
            public spread: NumberRange,
            public duration: NumberRange,
        ) { }
    }

    /**
     * Create fully custom effect data
     */
    //% blockSetVariable=myEffect
    //% block="custom effect data|colors $colorLUT sizes $sizeLUT spawn $spawn spread $spread duration $duration"
    //% colorLUT.shadow="lists_create_with" colorLUT.defl="colorindexpicker"
    //% spawn.shadow="pixelRangePicker"
    //% spread.shadow="pixelRangePicker"
    //% duration.shadow="timeRangePicker"
    export function createCustomEffectData(
        colorLUT: number[],
        sizeLUT: number[],
        spawn: NumberRange,
        spread: NumberRange,
        duration: NumberRange,
    ) {
        return new EffectData(
            colorLUT,
            sizeLUT,
            spawn,
            spread,
            duration
        )
    }

    const PRESET_COLOR_LUT = [
        [1, 5, 4, 2, 10, 10],
        [1, 1, 1, 9, 9, 6, 8],
        [5, 7, 7, 6, 6, 8],
        [1, 5, 4, 5, 1, 5, 1, 5, 1, 5, 4],
        [10, 10, 12],
        [1, 1, 13, 11]
    ]

    /**
     * Create effect using preset settings
     */
    //% inlineInputMode=inline
    //% blockId="createPresetEffectData"
    //% block="effect $color $shape|| $size px wide"
    //% size.min=20 size.max=100 size.defl=50
    export function createPresetEffectData(
        color: PresetColor,
        shape: PresetShape,
        size: number = 50,
    ) {
        const colorLUT = PRESET_COLOR_LUT[color]
        const radius = Math.floor(size / 2)
        const pmax = radius * 0.75
        switch (shape) {
            case PresetShape.spark:
                return new EffectData(
                    colorLUT,
                    [6, 6, 4, 2, 1],
                    new NumberRange(0, 0),
                    new NumberRange(12, Math.floor(radius * 1.5)),
                    new NumberRange(300, 400)
                )
            case PresetShape.explosion:
                return new EffectData(
                    colorLUT,
                    [10, Math.max(16, Math.floor(pmax)), Math.max(14, Math.floor(pmax * 0.5)), 12, 6, 4, 2, 1],
                    new NumberRange(0, Math.floor(radius * 0.50)),
                    new NumberRange(Math.floor(radius * 0.50), Math.floor(radius * 0.75)),
                    new NumberRange(400, 600)
                )
            case PresetShape.cloud:
                return new EffectData(
                    colorLUT,
                    [4, Math.max(16, Math.floor(pmax)), Math.max(14, Math.floor(pmax * 0.75)), Math.max(12, Math.floor(pmax * 0.5)), 14, 16, 12, 8, 4],
                    new NumberRange(0, Math.floor(radius * 0.50)),
                    new NumberRange(Math.floor(radius * 0.33), Math.floor(radius * 0.33)),
                    new NumberRange(800, 1200)
                )
        }
    }

    /**
     * Start an explosive effect at a position on the stage
     */
    //% inlineInputMode=inline
    //% blockId="createExplosiveEffectAtPosition"
    //% block="start $effect at x $x y $y for $duration ms|| density $density"
    //% effect.shadow=variables_get effect.defl=myEffect
    //% x.shadow="positionPicker" x.defl=75
    //% y.shadow="positionPicker" y.defl=55
    //% duration.shadow="timePicker" duration.defl=100
    //% density.min=10 density.max=50 density.defl=20
    export function startExplosiveEffectAtPosition(
        effect: EffectData,
        x: number,
        y: number,
        duration: number,
        density: number = 20,
    ) {
        createCircularEffect(
            { x: x, y: y },
            duration,
            effect.colorLUT,
            effect.sizeLUT,
            duration < 1000 
            ? density / duration * 1000
            : density,
            effect.duration.min,
            effect.duration.max,
            effect.spawn.min,
            effect.spawn.max,
            effect.spread.min,
            effect.spread.max
        )
    }

} 