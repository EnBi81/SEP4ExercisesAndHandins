const updateInTime = 30;

export default class ScrollHeightHelper{
    scrollContainer;
    list;
    scrollDelay;
    useSetTimeouts;
    useSetTimeoutNumber;


    init(scrollContainer, listElement){
        this.scrollContainer = scrollContainer;
        this.list = listElement;
        this.scrollDelay = null;
        this.useSetTimeouts = false;
        this.useSetTimeoutNumber = null;

        this.scrollContainer.addEventListener('scroll', () => this.onScrollListener());
    }

    onScrollListener(){
        if(this.scrollDelay != null){
            clearTimeout(this.scrollDelay);
            this.scrollDelay = null;
        }
        else if(this.useSetTimeoutNumber == null){
            setTimeout(() => {
                this.useSetTimeouts = true;
                this.useSetTimeoutNumber = null;
            }, 10);
        }

        if(this.useSetTimeouts){
            this.scrollDelay = setTimeout(() => this.orderItemsAfterScroll(), 20);
        }
        else{
            this.orderItemsAfterScroll();
        }
    }

    orderItemsAfterScroll(){
        let scrollTop = this.scrollContainer.scrollTop;
        let clientHeight = this.scrollContainer.clientHeight;
        let listItemHeight = 102; // 100px height + 1px + 1px border

        let visibleItemListCount = clientHeight / (listItemHeight * 2);
        let midItemIndex = (scrollTop / listItemHeight) + visibleItemListCount;

        let i = 1;
        this.list.childNodes.forEach(n => {
            let distanceBetweenNodeAndMid = Math.abs(midItemIndex - i++);
            distanceBetweenNodeAndMid = Math.min(distanceBetweenNodeAndMid, visibleItemListCount);

            n.style.setProperty('--scroll-X-pos', distanceBetweenNodeAndMid * 7 + 'px')
        });

        this.useSetTimeouts = false;
    }
}