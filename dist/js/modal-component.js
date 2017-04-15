'use strict';

window.modalComponent = Vue.extend({
    template: '\n        <div :id="modal.id" class="modal my-custom-modal">\n            <div class="modal-content">\n                <slot name="content"></slot>\n            </div>\n            <div class="modal-footer">\n                <slot name="footer"></slot>\n            </div>\n        </div>            \n    ',
    props: ['modal'],
    data: function data() {
        return {
            modal: {
                id: ''
            }
        };
    }
});