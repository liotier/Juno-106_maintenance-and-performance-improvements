# 106.js

106.js is an emulation of the classic [Roland Juno-106 analog synthesizer](http://en.wikipedia.org/wiki/Roland_Juno-106).

[You can play 106.js here](https://stevengoldberg.github.io/juno106/).

# System Requirements

Minimum window size of 1024x768. A modern browser with Web Audio API support is required (Chrome, Firefox, Safari, Edge).

# How to play

106.js is best played with a MIDI keyboard. See [the next section](README.md#midi) for MIDI setup instructions. Notes can also be played with a computer keyboard, or by clicking the keys with a mouse. Like the original hardware synthesizer, 106.js can play up to 6 notes at a time.

Key mappings are based on **physical key position** rather than letter, so the keyboard works correctly regardless of your layout (QWERTY, AZERTY, QWERTZ, Dvorak, etc.).

Please note that due to a phenomenon known as [keyboard ghosting](http://www.microsoft.com/appliedsciences/antighostingexplained.mspx), certain simultaneous combinations of more than 2 keys will not register when held on the computer keyboard. This is a limitation of computer keyboard hardware, and not with 106.js.

Click `Reset` at the top of the screen at any time to return 106.js to its initial state.

When you've found a sound that you like, click on the `PATCH NAME` text at the top of the screen to edit the name of your patch. Then click `SHARE` and click the icon to copy a special URL to your clipboard. Anyone who loads that URL will load your patch.

# MIDI

For MIDI connectivity, you must use a browser that supports the [Web MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API). Chrome (since v43) and Firefox (since v108) are confirmed to work. Safari does not support Web MIDI.

Every control on 106.js is mappable to respond to MIDI CC messages, and your MIDI mappings will be remembered when you leave the page. This means that once you've mapped the on-screen controls to your hardware controller, you can play 106.js without touching the mouse and keyboard. If you have multiple MIDI inputs, 106.js will remember all of your mappings separately. 106.js supports both 7-bit and 14-bit MIDI messages. Simply right-click a control to begin mapping.

**Pitch bend** is automatically supported: if your controller sends MIDI pitch bend messages, they are applied in real time to all active voices (±2 semitones).

Note that if you're mapping a button or switch on your controller that only sends one message at a time, you'll have to press it a few times in order for the mapping to be assigned.

# Synthesis Overview

The following is a brief description of each control on 106.js.

If you've never played with synthesizers before, a good entry point is to experiment with the filter cutoff (the `FREQ` fader in the `VCF` section) and the amplifier envelope (`A`, `D`, `S`, `R` in the `ENV` section). The former alters the brightness of the sound; the latter shapes the volume over time as you press and release keys.

For more detailed instructions, consult the [Juno-106 owner's manual](http://www.synthfool.com/docs/Roland/Juno_Series/Roland_Juno_106/Roland_Juno106_Owners_Manual.pdf).

**LFO - Low Frequency Oscillator**
A triangle-wave oscillator heard indirectly through its effects on other parameters.

* Rate: Controls the speed of the LFO.
* Delay: Controls how quickly the LFO fades in after a note is triggered.

**DCO - Digitally Controlled Oscillator**
Sound sources heard directly.

* Range: Selects the keyboard octave (4', 8', 16'). Click a label to jump directly to that position.
* LFO: Depth of LFO modulation on oscillator pitch (vibrato).
* PWM: In MAN mode, sets pulse wave width. In LFO mode, sets LFO modulation depth on pulse width.
* LFO/MAN: Selects pulse-width modulation source. Click to toggle.
* PULSE/SAW: Toggles pulse and sawtooth waveforms.
* SUB: Volume of square-wave sub-oscillator (one octave below).
* NOISE: Volume of noise generator.

**VCF - Voltage Controlled Filter**
Cascaded 24 dB/octave resonant lowpass filter.

* FREQ: Filter cutoff frequency.
* RES: Resonance — gain peak at the cutoff frequency.
* NORM/INV: Envelope direction. Click to toggle.
* ENV: Depth of envelope modulation on filter cutoff.
* LFO: Depth of LFO modulation on filter cutoff.
* KBD: How much the filter cutoff tracks keyboard pitch.

**HPF - High Pass Filter**
Non-resonant highpass filter.

* FREQ: Higher values filter out more low-frequency content.

**VCA - Voltage Controlled Amplifier**

* ENV/GATE: ENV shapes volume with the envelope; GATE plays notes at full level instantly. Click to toggle.
* LEVEL: Overall output volume.

**ENV - Envelope**
Envelope with authentic RC (exponential) curves shared by the amplifier and filter.

* A: Attack — how quickly volume/filter rises to maximum.
* D: Decay — how quickly it falls to the sustain level.
* S: Sustain — level held while a note is pressed.
* R: Release — how long the sound fades after a note is released.
* PORTA: Portamento (glide) time. At zero, notes play immediately. Higher values cause pitch to slide from the previous note to the new one (up to ~3 seconds).
* UNISON: When lit, all 6 voices play the same note simultaneously with slight per-voice detuning, producing a thick, fat sound. New notes cut previous ones.

**CHORUS**
BBD-style chorus effect.

* OFF: No effect.
* I: Moderate chorus.
* II: Deeper, richer chorus.

# Technology

106.js uses the [Web Audio API](http://webaudio.github.io/web-audio-api/) and [Web MIDI API](http://www.w3.org/TR/webmidi/), with [Backbone.Marionette](https://marionettejs.com) for the UI and effects from [tuna.js](https://github.com/Dinahmoe/tuna) by Dinahmoe.

# TO-DO

* Touch events
* Alternate PWM Implementation
* Filter self-resonance

# Changelog

* v1.0: First public release — 5/18/2015
* v1.1: Naming and sharing of user patches — 5/21/2015
* v1.2: MIDI CC mapping — 5/31/2015
* v1.3:
  * Fixed broken page load caused by stale require-handlebars-plugin submodule and incorrect i18nprecompile stub
  * All notes silenced when window is hidden (tab switch, minimise)
  * Linting cleanup in envelope code
  * **Performance:** white noise buffer shared across all voices instead of reallocating per note; fader drag handler throttled to 60 fps; slot dimensions cached at mousedown instead of forcing layout recalculation per pixel; all audio nodes fully disconnected on voice release
  * **Memory:** global `mousemove`/`mouseup`/`keydown`/`keyup` event listeners now namespaced and removed on view destroy
  * **Vendor library updates:** jQuery 2.1.3→3.7.1, Underscore 1.8.2→1.13.8, Backbone.Wreqr 1.3.2→1.4.0, RequireJS 2.1.17→2.3.8, Handlebars 3.0.1→4.7.8
  * **Dead code removed:** ZeroClipboard (Flash), backbone.paginator, backbone.poller, backbone.routefilter, backbone.babysitter (bundled in Marionette), duplicate Handlebars 1.0.rc.1
  * Share URL copy now uses native [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) instead of Flash
  * CDN references upgraded to HTTPS
  * Modernizr deferred to avoid render-blocking
  * MIDI browser support updated: Firefox v108+ confirmed working; Safari noted as unsupported
  * Keyboard input now uses physical key position (`KeyboardEvent.code`) instead of character code, so AZERTY/QWERTZ/Dvorak layouts work correctly
  * Click-to-toggle binary switches (LFO/MAN, ENV/GATE, NORM/INV, PULSE/SAW)
  * Click-to-position ternary RANGE switch labels
  * Portamento/glide fader (PORTA) in ENV section
  * Unison mode button — all 6 voices on one note with per-voice detuning
  * MIDI pitch bend support (±2 semitones)
  * RC-like exponential envelope curves for more authentic Juno-106 character
  * Per-voice random detuning (±8 cents) for analogue warmth
  * Chorus: zero cross-channel feedback (authentic to Juno-106 BBD), corrected sweep rates

