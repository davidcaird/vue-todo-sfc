<template>
  <div
    class="bg-white shadow-sm rounded-md text-gray-700 text-xs p-4"
    :class="{ 'opacity-25 line-through': task.done }"
  >
    <div>{{ task.description }}</div>
    <div class="py-4 bg-white">
      <BaseCheckbox
        @update:model-value="$emit('update:done', $event)"
        :model-value="done"
        class="mb-2"
        >Done</BaseCheckbox
      >
      <BaseCheckbox
        label="Other"
        @update:model-value="$emit('update:priority', $event)"
        :model-value="priority"
        >Prioritized</BaseCheckbox
      >
    </div>
  </div>
</template>

<script>
import BaseCheckbox from "@/components/base/BaseCheckbox.vue";

export default {
  components: {
    BaseCheckbox,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    done: Boolean,
    priority: Boolean,
  },
  emits: ["update:done", "update:priority"],
};
</script>
