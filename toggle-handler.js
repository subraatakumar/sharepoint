document.addEventListener('DOMContentLoaded', () => {
    // Expand/Collapse All Toggle
    const globalToggle = document.getElementById('expand-collapse-all');
    const dynamicItems = document.querySelectorAll('.dynamic-item');
    
    globalToggle.addEventListener('click', () => {
        const isExpanding = globalToggle.querySelector('#global-symbol').textContent.trim() === '+';
        dynamicItems.forEach(item => {
            const button = item.querySelector('.toggle-btn');
            const content = item.querySelector('.dynamic-item-fields');
            toggleSection(button, content, isExpanding);
        });
        updateGlobalSymbol(globalToggle, isExpanding);
    });

    // Individual Toggle Buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent bubbling to parent or global toggle
            const content = btn.nextElementSibling;
            const isExpanding = btn.querySelector('span').textContent.trim() === '+';
            toggleSection(btn, content, isExpanding);

            // Update the parent state if necessary
            const parentItem = btn.closest('.dynamic-item');
            if (parentItem) {
                updateParentState(parentItem);
            }
        });
    });
});

// Function to toggle section visibility
function toggleSection(button, content, isExpanding) {
    const symbol = button.querySelector('span');
    content.style.display = isExpanding ? 'block' : 'none';
    symbol.textContent = isExpanding ? '-' : '+';
}

// Function to update the global toggle state
function updateGlobalSymbol(globalToggle, isExpanding) {
    const symbol = globalToggle.querySelector('#global-symbol');
    symbol.textContent = isExpanding ? '-' : '+';
    globalToggle.querySelector('strong').textContent = isExpanding ? 'Collapse All' : 'Expand All';
}

// Function to update parent state based on child states
function updateParentState(parentItem) {
    const childButtons = parentItem.querySelectorAll('.dynamic-item-fields .toggle-btn');
    const allExpanded = Array.from(childButtons).every(btn => btn.querySelector('span').textContent.trim() === '-');
    const parentButton = parentItem.querySelector('.toggle-btn');
    const parentContent = parentButton.nextElementSibling;
    toggleSection(parentButton, parentContent, allExpanded);
}
