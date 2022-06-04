<template>
  <div
    class="bg-white shadow-sm rounded-md text-gray-700 text-xs flex-col"
    :class="{ 'opacity-25 line-through': task.done }"
  >
    <div class="p-4 border-b border-gray-100" >{{ task.description }}</div>
    <div class="p-4 bg-white flex-grow">
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
    <TaskListItemMenu />
  </div>
</template>

<script>
import BaseCheckbox from "@/components/base/BaseCheckbox.vue";
import { computed} from "vue";
import TaskListItemMenu from "@/components/task/TodoListItemMenu";

export default {
  components: {
    TaskListItemMenu,
    BaseCheckbox,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    projectId: Number,
    done: Boolean,
    priority: Boolean,
  },
  provide() {
    return {
      task: computed (() => this.task),
      projectId: computed(()=> this.projectId)
    }
  },
  emits: ["update:done", "update:priority"],
};
</script>
