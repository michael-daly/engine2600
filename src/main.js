// (Temp test file)

import Engine2600 from '~/core/Engine2600.js';
import TIAVideo   from '~/core/TIAVideo.js';

import createCanvas from '~/utility/createCanvas.js';


const canvas = createCanvas ('canvas-parent', 3.0);

const tiaVideo = new TIAVideo ();
const app = new Engine2600 (canvas, tiaVideo);

window.tiaVideo = tiaVideo;
window.app = app;
