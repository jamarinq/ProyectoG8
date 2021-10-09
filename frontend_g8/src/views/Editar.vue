<template>
  <div>
    <editar-tabla :id="id1" />
  </div>
</template>

<script>
import EditarTabla from "../components/EditarTabla.vue";

export default {
  props: {
    id1: {
      type: String,
      default : "prueba",
    }
  },
    data: () => ({
    }),
  components: {
    EditarTabla,
  },
};

//<editar-tabla :id="prueba" />
</script>
