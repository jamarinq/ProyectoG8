import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    empleados: [],
    administradores: [],
    login: false,
  },
  mutations: {
    setEmpleados(state, payload) {
      state.empleados = payload;
    },
    loginCorrecto(state, payload) {
      state.login = true;
    },
    loginIncorrecto(state, payload) {
      state.login = false;
    }
  },
  actions: {
    async cargarEmpleados({ commit }) {
      const peticion = await fetch('http://localhost:3000/login');
      const data = await peticion.json();
      commit('setEmpleados', data);
      console.log(data);
    },


    async agregarEmpleado({ commit }, objEmpleado) {
      const peticion = await fetch('http://localhost:3000/editar', {
        method: 'PUT',//'PUT', 'DELETE'
        headers: {
          'Content-Type': 'application/json'
        },
        //Convierte un objeto javascript a JSON y lo asigna al cuerpo de la petición
        body: JSON.stringify(objEmpleado)
      });
      const data = await peticion.json();
      console.log(peticion);
      console.log(data);
    },

    async eliminarEmpleado({commit}, obj){
      const peticion = await fetch('http://localhost:3000/editar', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      });
    },

    async editarEmpleado({ commit }, objEmpleado) {
      const peticion = await fetch('http://localhost:3000/editar', {
        method: 'POST',//'PUT', 'DELETE'
        headers: {
          'Content-Type': 'application/json'
        },
        //Convierte un objeto javascript a JSON y lo asigna al cuerpo de la petición
        body: JSON.stringify(objEmpleado)
      });
      const data = await peticion.json();
      console.log(peticion);
      console.log(data);
    },



    async loginAdministrador({ commit }, objAdministrador) {
      const peticion = await fetch('http://localhost:3000/login', {
        method: 'POST',//'PUT', 'DELETE'
        headers: {
          'Content-Type': 'application/json'
        },
        //Convierte un objeto javascript a JSON y lo asigna al cuerpo de la petición
        body: JSON.stringify(objAdministrador)

      });
      //console.log(body);
      const data = await peticion.json();
      //console.log(peticion);
      //console.log(data);
      if (data["mensaje"] == "Login Correcto") {
        commit('loginCorrecto');
      }
      else {
        commit('loginIncorrecto');
      }

    }
  },
  modules: {
  },
  getters: {
    retornarLogin: state =>{
      return state.login
    }
  },
})
