export default class SmoothOverscroll{

    // insiration: https://codepen.io/idiotWu/pen/EgNdXK

    constants;
    states;

    container;
    content;

    shouldStop = false;
    wheelListener = evt => {
        if(evt.ctrlKey)
            return;

        const { y } = this.getDelta(evt);

        // check if scrolling onto very edge
        if (!this.isOntoEdge(y)) {
            return;
        }

        this.resetFlag();
        evt.preventDefault();

        if (!this.states.backFlag && y) {
            this.states.offset += y * (this.constants.maxOffset - Math.abs(this.states.offset))
                / this.constants.maxOffset;
        }
    };

    constructor() {
        this.constants = {
            damping: 0.93,
            maxOffset: 100,
            DELTA_SCALE: {
                STANDARD: 1,
                OTHERS: -3,
            },
            DELTA_MODE: [1.0, 28.0, 500.0],
        }

        this.states = {
            offset: 0,
            rendered: 0,
            lastDis: 0,
            backFlag: false,
            timer: 0,
        }
    }

    stop(){
        this.shouldStop = true;

        [
            'wheel',
            'mousewheel'
        ].forEach(name => {
            this.container.removeEventListener(name, this.wheelListener);
        });
    }

    initContainer(containerElement, contentElement){

        this.container = containerElement;
        this.content = contentElement;

        this.render();

        [
            'wheel',
            'mousewheel'
        ].forEach(name => {
            this.container.addEventListener(name, this.wheelListener);
        });
    }

    resetFlag(){
        clearTimeout(this.states.timer);
        this.states.timer = setTimeout(() => {
            this.states.backFlag = false;
        }, 30);
    }

    render() {
        if (!this.states.offset && !this.states.rendered) {
            this.states.lastDis = 0;

            if(!this.shouldStop)
                return requestAnimationFrame(() => this.render());
        }

        const dis = this.states.offset - this.states.rendered;

        if (this.states.lastDis * dis < 0) {
            this.states.backFlag = true;
        }

        this.states.lastDis = dis;

        // throw away float part
        const next = this.states.offset - (dis * this.constants.damping | 0);

        this.content.style.transform = `translate3d(0, ${-next}px, 0)`;

        this.states.rendered = next;
        this.states.offset = this.states.offset * this.constants.damping | 0;

        if(!this.shouldStop)
            requestAnimationFrame(() => this.render());
    }

    getDeltaMode(mode) { return this.constants.DELTA_MODE[mode] || this.constants.DELTA_MODE[0]; }

    getDelta(evt) {
        if ('deltaX' in evt) {
            const mode = this.getDeltaMode(evt.deltaMode);

            return {
                x: evt.deltaX / this.constants.DELTA_SCALE.STANDARD * mode,
                y: evt.deltaY / this.constants.DELTA_SCALE.STANDARD * mode,
            };
        }

        if ('wheelDeltaX' in evt) {
            return {
                x: evt.wheelDeltaX / this.constants.DELTA_SCALE.OTHERS,
                y: evt.wheelDeltaY / this.constants.DELTA_SCALE.OTHERS,
            };
        }

        // ie with touchpad
        return {
            x: 0,
            y: evt.wheelDelta / this.constants.DELTA_SCALE.OTHERS,
        };
    };

    isOntoEdge(delta) {
        const {
            scrollTop,
            scrollHeight,
            clientHeight,
        } = this.container;

        const max = scrollHeight - clientHeight;

        return (scrollTop === 0 && delta <= 0) ||
            (scrollTop === max && delta >= 0);
    }
}
