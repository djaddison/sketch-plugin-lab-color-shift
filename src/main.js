/*
 *  Copyright 2018 David Addison
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import chroma from 'chroma-js';

export function darken(context) {
  labColorShift(context, 'darken', 0.333);
}
export function brighten(context) {
  labColorShift(context, 'brighten', 0.333);
}

function labColorShift(context, direction, amount){
  const selection = context.selection;

  selection.forEach(layer => {
    var selectedColor = layer.style().fills().firstObject().color();
    var r = selectedColor.red();
    var g = selectedColor.green();
    var b = selectedColor.blue();

    let color = chroma(r, g, b, 'gl').lab();
    let shift = direction === 'darken'
      ? chroma(r, g, b, 'gl').darken(amount).lab()
      : chroma(r, g, b, 'gl').brighten(amount).lab();

    let result = chroma(shift[0], color[1], color[2], 'lab').gl();

    // context.document.showMessage(`1:${color} 2:${shift} r:${result}`);
    // log(`r:${r} g:${g} b:${b} c:${color} d:${shift} r:${result}`);

    selectedColor.setRed(result[0]);
    selectedColor.setGreen(result[1]);
    selectedColor.setBlue(result[2]);
  });
}