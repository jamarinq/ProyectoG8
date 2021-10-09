<template>
  <div id="c_login">
    <v-card color="#385F73" dark>
      <v-card-title class="text-h5"> Bienvenido </v-card-title>

      <v-card-subtitle>Inicio de Sesion</v-card-subtitle>

      <v-card-actions>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="user_name"
            :rules="userRules"
            label="Usuario"
            required
          ></v-text-field>

          <v-text-field
            v-model="user_pass"
            :rules="passRules"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Contraseña"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="comprobarLogin"
          >
            Iniciar Sesion
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
          <v-alert type="error" :value="visibilidad"
            >Contraseña incorrecta</v-alert
          >
        </v-form>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Supermodel",
        artist: "Foster the People",
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Halcyon Days",
        artist: "Ellie Goulding",
      },
    ],
  }),
};
</script>

<script>
import store from "../store/index.js";
export default {
  data: () => ({
    show1: false,
    valid: true,
    user_name: "",
    userRules: [(v) => !!v || "Name is required"],
    user_pass: "",
    passRules: [(v) => !!v || "Password is required"],
    valor: false,
    visibilidad: false,
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      console.log("Verificando credenciales...");
      this.$router.push("/C_Planta");
    },
    reset() {
      this.visibilidad = false;
      this.$refs.form.reset();
    },
    resetValidation() {
      this.visibilidad = false;
      this.$refs.form.resetValidation();
    },
    comprobarLogin() {
      if (this.$refs.form.validate()) {
        //Crear objeto javascript
        let objAdmnistrador = {
          user_name: this.user_name,
          user_pass: this.user_pass,
        };

        //Llama las acciones del store
        store.dispatch("loginAdministrador", objAdmnistrador);

        if (this.clave == true) {
          this.visibilidad = false;
          this.$router.push("/C_Planta");
        } else {
          this.visibilidad = true;
        }
        //this.$refs.form.reset();
      } else {
        console.log("Faltan datos por insertar");
      }
      console.log(this.visibilidad);
    },
  },
  computed: {
    clave: () => {
      return store.state.login;
    },
  },
};
</script>


<style>
#c_login {
  margin: auto;
  height: 60%;
  width: 27%;
  margin-top: 5vh;
}

template {
  background-color: #385f73;
}
</style>