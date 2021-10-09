<template>
  <v-form id="camposEditar" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="nombre"
      label="Nombre"
      dark
      required
      :rules="sizeRules"
    ></v-text-field>
    <v-text-field
      v-model="numero_documento"
      label="Numero Documento"
      required
      dark
    ></v-text-field>
    <v-text-field
      v-model="numero_telefonico"
      label="Numero_Telefonico"
      required
      dark
    ></v-text-field>
    <v-text-field
      v-model="email"
      label="Email"
      required
      dark
      :rules="sizeRules"
    ></v-text-field>
    <v-text-field
      v-model="area"
      label="Area"
      required
      dark
      :rules="sizeRules"
    ></v-text-field>
    <v-text-field
      v-model="fecha_de_nacimiento"
      label="Fecha_de_Nacimiento"
      required
      dark
      :rules="sizeRules"
    ></v-text-field>
    <v-text-field
      v-model="direccion"
      label="Direccion"
      required
      dark
      :rules="sizeRules"
    ></v-text-field>
    <v-btn class="mr-4" @click="registarEmpleado"> Guardar </v-btn>
    <v-btn class="mr-4" @click="regresar"> Regresar </v-btn>
    <v-btn class="mr-4" @click="obtenerEmpleado"> Cargar </v-btn>
    <v-alert type="success" v-show="visibilidad">Guardado Exitoso</v-alert>
  </v-form>
</template>

<script>
import store from "../store/index.js";
export default {
  props: {
    id: String,
  },
  data: () => ({
    valid: true,
    nombre: "",
    numero_documento: null,
    numero_telefonico: null,
    email: "",
    area: "",
    fecha_de_nacimiento: "",
    direccion: "",
    visibilidad: false,
    id_editar: "",
    id_aux:"",
    sizeRules: [
      (v) => !!v || "El campo es requerido",
      (v) => (v && v.length <= 30) || "Name must be less than 10 characters",
    ],

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    regresar() {
      this.$router.push("/C_Planta");
    },
    obtenerEmpleado() {
      //console.log(this.id);
      //console.log(this.empleados);
      this.empleados.forEach((element) => {
        //console.log(element["_id"]);
        if (JSON.stringify(element["_id"]) == this.id) {
          this.id_editar = this.id;
          this.nombre = element["nombre"];
          this.numero_documento = element["numero_documento"];
          this.numero_telefonico = element["numero_telefonico"];
          this.email = element["email"];
          this.area = element["area"];
          this.fecha_de_nacimiento = element["fecha_de_nacimiento"];
          this.direccion = element["direccion"];
        }
      });
    },
    registarEmpleado() {
      console.log(this.id);
      if (this.$refs.form.validate()) {
        this.visibilidad = true;
        //Crear objeto javascript
        let objEmpleado = {
          nombre: this.nombre,
          numero_documento: this.numero_documento,
          numero_telefonico: this.numero_telefonico,
          email: this.email,
          area: this.area,
          fecha_de_nacimiento: this.fecha_de_nacimiento,
          direccion: this.direccion,
        };
        this.id_aux= this.id.split('"').join('');
        let objEmpleado2 = {
          id: this.id_aux,
          nombre: this.nombre,
          numero_documento: this.numero_documento,
          numero_telefonico: this.numero_telefonico,
          email: this.email,
          area: this.area,
          fecha_de_nacimiento: this.fecha_de_nacimiento,
          direccion: this.direccion,
        };
        
        //Llama las acciones del store
        if (this.id == "") {
          store.dispatch("agregarEmpleado", objEmpleado);
          console.log("insertar");
        } else {
          console.log(objEmpleado2);
          store.dispatch("editarEmpleado", objEmpleado2);
          console.log("editar");
        }
        this.$refs.form.reset();
      } else {
        this.visibilidad = false;
        console.log("Faltan datos por insertar");
      }
    },
  },
  created: () => {
    store.dispatch("cargarEmpleados");
  },
  computed: {
    empleados: () => {
      return store.state.empleados;
    },
  },
};
</script>

<style>
#camposEditar {
  margin: 2rem;
}
</style>
