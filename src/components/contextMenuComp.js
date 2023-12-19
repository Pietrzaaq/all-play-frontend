import { ref } from 'vue';

export default function contextMenuComp(contextMenuRef, dialogVisible) {
    const contextMenu = ref(contextMenuRef);
    const contextMenuStyle = ref({
        top: 0,
        left: 0,
    });

    let eventLatLong = ref(null);
    
    const CONTEXT_MENU_OPTIONS = {
        ADD_EVENT: 'add-event'
    };

    const contextMenuOptions = [
        { label: 'Add', icon: 'fa-solid fa-plus', command: addEvent }
    ];

    function handleContextMenuClick(event) {
        console.log('Inside  context menu');
        contextMenuStyle.value.left = event.containerPoint.x;
        contextMenuStyle.value.top = event.containerPoint.y;
        
        console.log(event);
        eventLatLong.value = event.latlng;
        console.log(event.latlng);
        if (event && event.originalEvent)
            contextMenu.value.show(event.originalEvent);
    }
    
    function addEvent() {
        console.log('Inside add event');

        console.log(dialogVisible.value);
        if (dialogVisible.value)
            dialogVisible.value = false;
        
        dialogVisible.value = true;
        console.log(dialogVisible.value);
    }
    
    return { 
        contextMenuStyle, 
        contextMenuOptions, 
        CONTEXT_MENU_OPTIONS,
        handleContextMenuClick,
        eventLatLong };
}