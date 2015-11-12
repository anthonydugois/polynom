export const keyCodes = {
  "backspace": 8,
  "tab": 9,
  "enter": 13,
  "shift": 16,
  "ctrl": 17,
  "alt": 18,
  "pause": 19,
  "caps_lock": 20,
  "escape": 27,
  "page_up": 33,
  "page_down": 34,
  "end": 35,
  "home": 36,
  "left": 37,
  "up": 38,
  "right": 39,
  "down": 40,
  "insert": 45,
  "delete": 46,
  "0": 48,
  "1": 49,
  "2": 50,
  "3": 51,
  "4": 52,
  "5": 53,
  "6": 54,
  "7": 55,
  "8": 56,
  "9": 57,
  "a": 65,
  "b": 66,
  "c": 67,
  "d": 68,
  "e": 69,
  "f": 70,
  "g": 71,
  "h": 72,
  "i": 73,
  "j": 74,
  "k": 75,
  "l": 76,
  "m": 77,
  "n": 78,
  "o": 79,
  "p": 80,
  "q": 81,
  "r": 82,
  "s": 83,
  "t": 84,
  "u": 85,
  "v": 86,
  "w": 87,
  "x": 88,
  "y": 89,
  "z": 90,
  "left_window": 91,
  "right_window": 92,
  "select_key": 93,
  "numpad_0": 96,
  "numpad_1": 97,
  "numpad_2": 98,
  "numpad_3": 99,
  "numpad_4": 100,
  "numpad_5": 101,
  "numpad_6": 102,
  "numpad_7": 103,
  "numpad_8": 104,
  "numpad_9": 105,
  "multiply": 106,
  "add": 107,
  "subtract": 109,
  "decimal_point": 110,
  "divide": 111,
  "f1": 112,
  "f2": 113,
  "f3": 114,
  "f4": 115,
  "f5": 116,
  "f6": 117,
  "f7": 118,
  "f8": 119,
  "f9": 120,
  "f10": 121,
  "f11": 122,
  "f12": 123,
  "num_lock": 144,
  "scroll_lock": 145,
  "semicolon": 186,
  "equal": 187,
  "comma": 188,
  "dash": 189,
  "period": 190,
  "forward_slash": 191,
  "grave_accent": 192,
  "open_bracket": 219,
  "back_slash": 220,
  "close_braket": 221,
  "single_quote": 222,
}

export default function keys(e, keys) {
  const code = e.which || e.keyCode
  let result = false

  keys = keys.split("+")

  if (keys.length > 0) {
    result = true

    keys.forEach((k) => {
      switch (k) {
        case "ctrl":
          result = result && isCtrlOrMetaKey(e)
          break

        case "alt":
          result = result && e.altKey
          break

        case "shift":
          result = result && e.shiftKey
          break

        default:
          result = result && code === keyCodes[k]
          break
      }
    })
  }

  if (result) {
    e.preventDefault()
  }

  return result
}

export function platform(p) {
  return navigator.appVersion.toLowerCase().indexOf(p) > - 1
}

// avoid right click emulation on Mac systems
function isCtrlOrMetaKey(e) {
  const ctrl = platform("win") && e.ctrlKey,
    meta = platform("mac") && e.metaKey

  return (ctrl || meta)
}
