<template>
  <form id="camposEditar">
    <v-text-field
      v-model="name"
      label="Nombre"
      dark
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="document"
      label="Numero Documento"
      required
      dark
      @input="$v.document.$touch()"
      @blur="$v.document.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="number"
      label="Numero_Telefonico"
      required
      dark
      @input="$v.number.$touch()"
      @blur="$v.number.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      label="Email"
      required
      dark
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="area"
      label="Area"
      required
      dark
      @input="$v.area.$touch()"
      @blur="$v.area.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="date"
      label="Fecha_de_Nacimiento"
      required
      dark
      @input="$v.date.$touch()"
      @blur="$v.date.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="direction"
      label="Direccion"
      required
      dark
      @input="$v.direction.$touch()"
      @blur="$v.direction.$touch()"
    ></v-text-field>
    <v-btn class="mr-4" @click="guardar"> Guardar </v-btn>
    <v-btn @click="regresar"> Regresar </v-btn>
    <v-alert type="success" v-show=visibilidad>Guardado Exitoso</v-alert>
  </form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "Maria",
    document: "11111",
    number: "3241314",
    email: "abc@dfe.com",
    area: "contabilidad",
    date: "12-12-1989",
    direction: "carrera 123",
    visibilidad: false,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    guardar() {
      this.visibilidad = true;
    },
    regresar() {
      this.$router.push("/C_Planta");
    },
  },
};
</script>

<style>
#camposEditar {
  margin: 2rem;
}
</style>
