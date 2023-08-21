<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div v-if="!!header" class="modal-header">
            <h3>{{ header }}</h3>
          </div>
          <div class="modal-description">
            <slot name="description"> </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <v-button
                class="modal-default-button"
                title="Close"
                @click="$emit('closed')"
              />
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import VButton from "@/components/Button.vue";
export default {
  props: {
    header: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  components: {
    VButton,
  },
};
</script>

<style lang="postcss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  overflow: auto;
  max-width: calc(100vh - 190px);
  max-height: calc(100vh - 190px);
  width: 550px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #202020;
  border: 2px solid #27ae60;
  border-radius: 8px;
  box-shadow: 1px 1px 1px darkgreen, -1px 1px 1px darkgreen,
    1px -1px 1px darkgreen, -1px -1px 1px darkgreen, 0 0 10px lightgreen,
    0 0 10px lightgreen;
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-description {
  text-align: left;
  margin: 20px 0;
  color: white;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
