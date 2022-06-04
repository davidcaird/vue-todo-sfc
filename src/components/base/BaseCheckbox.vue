<template>
  <div class="flex item-center">
    <input
      type="checkbox"
      class="flex-none h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
      :checked="modelValue"
      @change="onChange"
    />
    <label><slot>Checkbox</slot></label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    onChange() {
      this.$emit("update:modelValue", !this.modelValue);
    },
  },
};
</script>
