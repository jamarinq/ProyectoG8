<template>
  <v-container fluid>
    <v-data-iterator
      :items="empleados"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.nombre"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.nombre }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="(key, index) in keys2" :key="index">
                  <v-list-item-content
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ key }}:
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
                <v-btn color="#42A5F5" class="mr-4" v-on:click="editar(item._id)">
                  Editar
                </v-btn>
                <v-btn
                  color="error"
                  class="mr-4"
                  v-on:click="eliminar(item._id)"
                >
                  Eliminar
                </v-btn>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>



        </v-row>
        <v-row>
          <v-btn color="error" class="mr-4" @click="cerrar_sesion">
            Cerrar Sesion
          </v-btn>
          <v-btn color="primary" class="mr-4" @click="registarEmpleado">
            Agregar Empleado
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
 
<script>
import store from "../store/index.js";
export default {
  data() {
    return {
      itemsPerPageArray: [3, 6, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 3,
      sortBy: "nombre",
      keys: [
        "area",
        "direccion",
        "email",
        "fecha_de_nacimiento",
        "nombre",
        "numero_documento",
        "numero_telefonico",
      ],
      keys2: [
        "Area",
        "Direccion",
        "Email",
        "Fecha_de_nacimiento",
        "Numero_Documento",
        "Numero_Telefonico",
      ],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.empleados.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "nombre");
    },
  },
  methods: {
    registarEmpleado() {
      //this.$router.push("/Editar");
      this.$router.push({name: "Editar", params : {id1: ""}});
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    cerrar_sesion() {
      this.$router.push("/");
    },
    editar(obj) {
     
      let id=JSON.stringify(obj);
      console.log(id);
      this.$router.push({name: "Editar", params : {id1: id}});
      //this.$router.push({name: "Editar", params : {id1: "kolo"}});
    },

    eliminar(id) {
      let obj = { id };
      store
        .dispatch("eliminarEmpleado", obj)
        .then(() => {
          store.dispatch("cargarEmpleados");
        })
        .catch((error) => {
          console.log(error);
        });
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
</style>