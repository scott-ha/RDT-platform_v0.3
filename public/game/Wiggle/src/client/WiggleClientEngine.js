import { ClientEngine } from 'lance-gg';
import WiggleRenderer from '../client/WiggleRenderer';

import { socket } from '../client/clientEntryPoint';

export default class WiggleClientEngine extends ClientEngine {

    constructor(gameEngine, options) {
        super(gameEngine, options, WiggleRenderer);

        // show try-again button
        gameEngine.on('objectDestroyed', (obj) => {
            if (obj.playerId === gameEngine.playerId) {
                //document.body.classList.add('lostGame');
                //document.querySelector('#tryAgain').disabled = false;
                //---- kong ----
                //window.location.reload();
                //----
            }
        });

        // restart game
        document.querySelector('#tryAgain').addEventListener('click', () => {
            window.location.reload();
        });

        this.mouseX = null;
        this.mouseY = null;

        document.addEventListener('mousemove', this.updateMouseXY.bind(this), false);
        document.addEventListener('mouseenter', this.updateMouseXY.bind(this), false);
        document.addEventListener('touchmove', this.updateMouseXY.bind(this), false);
        document.addEventListener('touchenter', this.updateMouseXY.bind(this), false);
        this.gameEngine.on('client__preStep', this.sendMouseAngle.bind(this));
    }

    updateMouseXY(e) {
        e.preventDefault();
        if (e.touches) e = e.touches.item(0);
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
    }

    sendMouseAngle() {
        let player = this.gameEngine.world.queryObject({ playerId: this.gameEngine.playerId });

        //---- kong ----
        //if (this.mouseY === null || player === null) return;
        //let mouseX = (this.mouseX - document.body.clientWidth/2) / this.zoom;
        //let mouseY = (this.mouseY - document.body.clientHeight/2) / this.zoom;
        //let dx = mouseY - player.position.y;
        //let dy = mouseX - player.position.x;
        //if (Math.sqrt(dx * dx + dy * dy) < 0.5) {
        //    this.sendInput(this.gameEngine.directionStop, { movement: true });
        //    return;
        //}
        //let angle = Math.atan2(dx, dy);
        //this.sendInput(angle, { movement: true });
        //----

        //---- kong ----
        if (player === null) {
            return;
        }
        //window.W_fr += 1;
        let y = window.W_speed;
        let x = window.W_dir;
        if (y < 70) {
            this.sendInput(this.gameEngine.directionStop, { movement: true });
            return;
        }
        y = y / 70;
        let a = Math.atan2(y, x);
        if (isNaN(a)) {
            this.sendInput(this.gameEngine.directionStop, { movement: true });
            return; // why a is NaN ???
        }
        let d = a * 2;
        let angle = 1.57 - d; // 1.57 is the radian value of 90 degrees

        window.W_fr = angle;
        
        this.sendInput(angle, { movement: true });
        //----
    }
}
