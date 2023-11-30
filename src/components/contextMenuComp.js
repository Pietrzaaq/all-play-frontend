import { ref } from 'vue';

export default function contextMenuComp(contextMenuRef) {
    const contextMenu = ref(contextMenuRef);
    const contextMenuStyle = ref({
        top: 0,
        left: 0,
    });
    
    const CONTEXT_MENU_OPTIONS = {
        ADD_EVENT: 'add-event'
    };

    const contextMenuOptions = [
        {
            name: 'Add event',
            action: CONTEXT_MENU_OPTIONS.ADD_EVENT,
            func: addEvent
        }
    ];

    function handleContextMenuClick(event) {
        contextMenuStyle.value.left = event.containerPoint.x;
        contextMenuStyle.value.top = event.containerPoint.y;
        
        contextMenu.value.showMenu(event);
    }

    function contextMenuOptionClicked(event) {
    }
    
    function addEvent() {
        
    }
    
    return { 
        contextMenuStyle, 
        contextMenuOptions, 
        CONTEXT_MENU_OPTIONS,
        handleContextMenuClick,
        contextMenuOptionClicked};
}