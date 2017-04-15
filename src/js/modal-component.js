window.modalComponent = Vue.extend({
    template:
    `
        <div :id="modal.id" class="modal my-custom-modal">
            <div class="modal-content">
                <slot name="content"></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>            
    `,
    props:['modal'],
    data() {
        return {
            modal: {
                id: ''
            }
        }
    }
});
