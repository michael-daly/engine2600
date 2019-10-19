import MakerApp  from '~/core/MakerApp.js';
import Playfield from '~/core/Playfield.js';

window.app = new MakerApp ('canvas-parent', 2.0, 'SECAM');

app.addPlayfield (1);
