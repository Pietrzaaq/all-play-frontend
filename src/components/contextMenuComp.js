import { ref } from 'vue';
import sportEventService from "../services/sportEventService.js";

export default function contextMenuComp(contextMenuRef) {
    const contextMenu = ref(contextMenuRef);
    const contextMenuStyle = ref({
        top: 0,
        left: 0,
    });
    
    let dialogVisible = ref(false);
    
    let eventLatLong = ref(null);
    
    const CONTEXT_MENU_OPTIONS = {
        ADD_EVENT: 'add-event'
    };

    const contextMenuOptions = [
        { label: 'Add', icon: 'fa-solid fa-plus', command: addEvent }
    ];

    function handleContextMenuClick(event) {
        contextMenuStyle.value.left = event.containerPoint.x;
        contextMenuStyle.value.top = event.containerPoint.y;
        
        console.log(event);
        eventLatLong.value = event.latlng;
        if (event && event.originalEvent)
            contextMenu.value.show(event.originalEvent);
    }
    
    function addEvent() {
        console.log('Inside add event');

        dialogVisible.value = true;
        // sportEventService.create();
    }
    
    return { 
        contextMenuStyle, 
        contextMenuOptions, 
        CONTEXT_MENU_OPTIONS,
        handleContextMenuClick,
        dialogVisible };
}