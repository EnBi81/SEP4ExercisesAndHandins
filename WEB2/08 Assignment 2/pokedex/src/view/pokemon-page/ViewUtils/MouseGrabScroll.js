export default class MouseGrabScroll{

    // inspiration: https://htmldom.dev/drag-to-scroll/

    elementPos;
    targetCssClass;

    mouseUpFunc;
    mouseMoveFunc;

    constructor(targetCssClass) {
        this.targetCssClass = targetCssClass;
        this.elementPos = { };
        this.mouseUpFunc = () => this.mouseUpHandler();
        this.mouseMoveFunc = e => this.mouseMoveHandler(e);
    }

    setTargetStyle(style, value){
        this.elementPos.target.style.setProperty(style, value);
    }

    setBodyStyle(style, value) {
        document.body.style.setProperty(style, value);
    }

    mouseDownHandler(e){

        if(!e.target.classList.contains(this.targetCssClass))
            return;

        if(e.button !== 0)
            return;

        e.target.classList.add('mouse-dragging');

        this.elementPos.top = e.target.scrollTop;
        this.elementPos.y = e.clientY;
        this.elementPos.target = e.target;

        this.setTargetStyle('cursor', 'grabbing');
        this.setBodyStyle('user-select', 'none');

        document.addEventListener('mousemove', this.mouseMoveFunc);
        document.addEventListener('mouseup', this.mouseUpFunc);
        document.body.addEventListener('mouseleave', this.mouseUpFunc);
    }

    mouseMoveHandler(e){
        const dy = e.clientY - this.elementPos.y;
        this.elementPos.target.scrollTop = this.elementPos.top - dy;
    }

    mouseUpHandler(){
        document.removeEventListener('mousemove', this.mouseMoveFunc);
        document.removeEventListener('mouseup', this.mouseUpFunc);
        document.body.removeEventListener('mouseleave', this.mouseUpFunc);

        this.setTargetStyle('cursor', 'grab');
        this.setBodyStyle('user-select', '');

        this.elementPos.target.classList.remove('mouse-dragging');
    }
}