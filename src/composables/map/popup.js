import { ref } from "vue";
import { useAreasStore } from "../../stores/areas";
export function usePopup() {
    const isPopupVisible = ref(false);
    const teleportTo = ref(null);
    const popupArea = ref(null);
    const keepPopupOpen = ref(false);
    const isPopupHovered = ref(false);

    const areasStore = useAreasStore();
    function showPopup(event) {
        const popup = event.target?._popup;
        console.log(event);
        
        if (isPopupVisible.value || !popup) 
            return;
        
        this.togglePopup();

        setTimeout(() => {
            const areaId = popup.options.areaId;
            popupArea.value = areasStore.areas.find(a => a.Id === areaId);

            const polygonPopup = document.querySelector(`[data-area-id="${popupArea.value.Id}"]`);

            if (!polygonPopup || !popupArea.value) 
                return;

            teleportTo.value = polygonPopup;
            isPopupVisible.value = true;
            popup._container.classList.remove('hidden');
        }, 2000);
    }

    function hidePopup(event) {
        // const popup = event.target?._popup;
        
        if (!isPopupVisible.value) 
            return;
        
        setTimeout(() => {
            if (keepPopupOpen.value)
                return;
            
            console.log('onPolygonMouseOut');
            this.togglePopup();
            isPopupVisible.value = false;
            teleportTo.value = null;
            popupArea.value = null;
        }, 2000);
    }
    
    function onPopupEnter() {
        console.log('onPopupEnter');
        
        if (!isPopupVisible.value)
            return;
        
        keepPopupOpen.value = true;
    }
    
    function onPopupLeave() {
        console.log('onPopupLeave');
        keepPopupOpen.value = false;
        
        hidePopup();
    }
    
    return {
        isPopupVisible,
        teleportTo,
        popupArea,
        keepPopupOpen,
        isPopupHovered,
        showPopup,
        hidePopup,
        onPopupEnter,
        onPopupLeave
    };
}
