# 106.js

106.js is an emulation of the classic [Roland Juno-106 analog synthesizer](https://en.wikipedia.org/wiki/Roland_Juno-106).

[You can play 106.js here](https://liotier.github.io/Juno-106_maintenance-and-performance-improvements/)

# How to play

106.js is best played with a MIDI keyboard. See [the next section](README.md#midi) for MIDI setup instructions. Notes can also be played with a computer keyboard, or by clicking the keys with a mouse. Like the original hardware synthesizer, 106.js can play up to 6 notes at a time.

Key mappings are based on **physical key position** rather than letter, so the keyboard works correctly regardless of your layout (QWERTY, AZERTY, QWERTZ, Dvorak, etc.).

Please note that due to a phenomenon known as [keyboard ghosting](https://en.wikipedia.org/wiki/Key_rollover), certain simultaneous combinations of more than 2 keys will not register when held on the computer keyboard. This is a limitation of computer keyboard hardware, and not with 106.js.

The `<` and `>` buttons at the ends of the on-screen keyboard shift it one octave down or up, to a maximum of three octaves either way. Like a hardware octave switch, the shift applies to the notes you play next — notes already sounding keep their pitch.

106.js loads with a lush chorused pad, so there is something pleasant to play right away. Click `Reset` at the top of the screen at any time to return every control to a blank init patch — a single raw sawtooth with the filter open, a clean slate for building your own sound.

When you've found a sound that you like, click the patch name at the top of the screen to edit it. Then click `Share patch` and copy the URL: anyone who loads that URL will load your patch.

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

* Range: Selects the oscillator octave (4', 8', 16'). Click a label to jump directly to that position.
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

# Branch Organisation

| Branch | Purpose |
|---|---|
| `master` | All improvements without Ouarpeggiator integration — for users who want the fixes and features without the Ouarpeggiator |
| `master-but-with-ouarpeggiator-integration` | **Production branch** — deployed to GitHub Pages. All improvements plus Ouarpeggiator `postMessage` integration |
| `upstream-pr` | The improvements rebased onto upstream branding, prepared for submission as a pull request to the [original upstream](https://github.com/stevengoldberg/juno106) |

GitHub Pages serves from `master-but-with-ouarpeggiator-integration`.

# Technology

106.js uses the [Web Audio API](https://webaudio.github.io/web-audio-api/) and [Web MIDI API](https://www.w3.org/TR/webmidi/), with [Backbone.Marionette](https://marionettejs.com) for the UI and effects from [tuna.js](https://github.com/Dinahmoe/tuna) by Dinahmoe.

# Changelog

* v1.0: First public release — 2015-05-18
* v1.1: Naming and sharing of user patches — 2015-05-21
* v1.2: MIDI CC mapping — 2015-05-31
* v1.3 (liotier fork):
  * Keyboard-layout-independent key mapping (AZERTY, QWERTZ, Dvorak, etc.)
  * Click-to-toggle binary switches (LFO/MAN, ENV/GATE, NORM/INV, PULSE/SAW)
  * Click-to-position ternary RANGE switch labels
  * Portamento/glide fader (PORTA) in ENV section
  * Unison mode button — all 6 voices on one note
  * MIDI pitch bend support (±2 semitones)
  * RC-like exponential envelope curves for more authentic Juno-106 character
  * Per-voice random detuning (±8 cents) for analogue warmth
  * Chorus: zero cross-channel feedback (authentic to Juno-106 BBD), corrected sweep rates
  * Fixed broken page load (stale require-handlebars-plugin submodule, incorrect i18nprecompile stub)
  * All notes silenced when window is hidden (tab switch, minimise)
  * **Performance:** white noise buffer shared across voices; fader drag throttled to 60 fps; slot dimensions cached at mousedown; audio nodes fully disconnected on voice release
  * **Memory:** global event listeners namespaced and removed on view destroy
  * Share URL copy uses native [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) instead of Flash
  * Dependency fixes: CDN-pinned jQuery 2.x, Backbone 1.3, Underscore 1.9 for Marionette 2.4.1 compatibility
  * Octave shift buttons (`<` / `>`) at the ends of the on-screen keyboard (±3 octaves)
  * Lush chorused pad as the default patch on page load; `Reset` returns to a blank init patch
  * Refreshed header toolbar: icon buttons, editable patch-name field, `Share patch`
  * Social media link previews (Open Graph / Twitter Card metadata with screenshot)
  * Module labels realigned with their faders (the misaligned ENV row made the "R" slider drive portamento)
  * `Reset` and patch loads now apply every parameter — previously only the first was applied, so e.g. portamento could remain silently stuck on
  * Removed an always-on overdrive that subtly distorted all output, most audibly on sharp transients
  * Fixed a per-note oscillator leak: every note left a silent detune oscillator running forever, progressively consuming CPU
  * Fixed chorus modulation depth going stale when delay or rate changed (tuna.js)
  * Fixed a crash when selecting a MIDI device without a previously-remembered one

# License

The original 106.js code by Steve Goldberg carries no explicit license — [an upstream issue](https://github.com/stevengoldberg/juno106/issues/8) asks for one to be added. Until then it remains "all rights reserved" by default, with forking and viewing on GitHub permitted by the [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#5-license-grant-to-other-users).

This fork's own modifications are released under the [MIT License](https://opensource.org/license/mit). Bundled third-party components carry their own licenses: [tuna.js](https://github.com/Dinahmoe/tuna) (MIT) and the [Font Awesome 4](https://fontawesome.com/v4/) webfonts ([SIL OFL 1.1](https://openfontlicense.org/)).

Juno-106 is a trademark of Roland Corporation; 106.js is an unaffiliated hobbyist emulation.
