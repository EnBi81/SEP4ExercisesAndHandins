

export default class ScrollHeightHelper{
    scrollContainer;
    list;

    constructor() {
    }


    init(scrollContainer, listElement){
        this.scrollContainer = scrollContainer;
        this.list = listElement;

        this.scrollContainer.addEventListener('scroll', () => this.onScrollListener());
    }

    onScrollListener(){
        let scrollTop = this.scrollContainer.scrollTop;
        let clientHeight = this.scrollContainer.clientHeight;
        let listItemHeight = 100; // px

        let visibleListItemCount = clientHeight / listItemHeight;
        let midItemIndex = scrollTop / 100 + visibleListItemCount / 2;

        let i = 1;
        this.list.childNodes.forEach(n => {
            let distanceBetweenNodeAndMid = Math.abs(midItemIndex - i++);
            distanceBetweenNodeAndMid = Math.min(distanceBetweenNodeAndMid, (visibleListItemCount / 2));

            n.style.setProperty('--scroll-X-pos', distanceBetweenNodeAndMid * 7 + 'px')
        });
    }
}